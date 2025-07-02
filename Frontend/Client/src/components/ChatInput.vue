<template>
  <div class="relative w-full" :class="{ 'opacity-70 cursor-not-allowed': disabled }">
    <input
      v-model="mensagem"
      type="text"
      placeholder="Digite sua pergunta..."
      class="w-full bg-[#2b2b2b] h-[65px] placeholder:text-sm p-6 pr-14 text-sm text-white rounded-[15px] outline-none disabled:cursor-not-allowed"
      @keyup.enter="enviarMensagem"
      :disabled="disabled || loading"
    />

    <button
      @click="enviarMensagem"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 disabled:cursor-not-allowed"
      :disabled="disabled || loading || !mensagem.trim()"
    >
      <img v-if="!loading" src="@/assets/input/SendButton.svg" alt="Enviar" class="w-6 h-6" />
      <div v-else class="loading-spinner w-6 h-6"></div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLlmStore } from '@/stores/useLlmstore';
import axios from 'axios';
import { useAnswerStore } from '@/stores/answerStore';

interface Respostas {
  [key: string]: string;
}

interface MensagemEnviada {
  texto: string;
  resposta: Respostas;
}

export default defineComponent({
  name: 'ChatInput',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: Boolean,
  },
  emits: ['iniciarLoading', 'pararLoading', 'novaMensagem', 'erroEnvio'],
  data() {
    return {
      mensagem: '',
    };
  },
  methods: {
    selecionarRotasAleatorias(array: string[]): string[] {
      const copiaArray = [...array];
      const indice1 = Math.floor(Math.random() * copiaArray.length);
      const item1 = copiaArray[indice1];
      copiaArray.splice(indice1, 1);
      const indice2 = Math.floor(Math.random() * copiaArray.length);
      const item2 = copiaArray[indice2];
      return [item1, item2];
    },

    async enviarMensagem() {
      if (!this.mensagem.trim() || this.disabled || this.loading) return;

      const uselLmAnswers = useLlmStore();
      const answerStore = useAnswerStore();

      const mensagemEnviada = this.mensagem;
      this.mensagem = '';
      this.$emit('iniciarLoading');

      const rotas = ['openai', 'gemini', 'groq', 'deepseek'];
      const selecionadas = this.selecionarRotasAleatorias(rotas);
      const respostas: Respostas = {};

      try {
        await Promise.all(
          selecionadas.map(async (modelo) => {
            try {
              const response = await axios.post(`http://localhost:8000/chat/stream/${modelo}`, {
                user_id: '123',
                message: mensagemEnviada,
              });

              const responseText = response.data;
              let jsonResponse = { response: '' };

              try {
                const cleaned = responseText.replace(/^data:\s*/, '');
                jsonResponse = JSON.parse(cleaned);
              } catch (e) {
                console.error(`Erro ao fazer parse da resposta de ${modelo}:`, e);
              }

              respostas[modelo] = jsonResponse.response || '';
              console.log(respostas);
            } catch (error) {
              console.error(`Erro ao enviar mensagem para ${modelo}:`, error);
              respostas[modelo] = 'Erro ao obter resposta';
            }
          })
        );

        uselLmAnswers.setRespostas(respostas);
        answerStore.saveLlm1(selecionadas[0]);
        answerStore.saveLlm2(selecionadas[1]);

        this.$emit('novaMensagem', {
          texto: mensagemEnviada,
          resposta: respostas,
        } as MensagemEnviada);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        this.$emit('erroEnvio');
      } finally {
        this.$emit('pararLoading');
      }
    },
  },
});
</script>

<style scoped>
.loading-spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #4ade80;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed !important;
}
</style>