<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RatingInputArea from '@/components/RatingInputArea.vue'
import { useAnswerStore } from '@/stores/answerStore'

const route = useRoute()
const fullAnswer = ref('')
const userQuestion = ref('')
const answerStore = useAnswerStore()
const isSaving = ref(false)
const showSuccess = ref(false)

const ratings = ref({
  contexto: {
    rating: 0,
    text: '',
  },
  precisao: {
    rating: 0,
    text: '',
  },
  clareza: {
    rating: 0,
    text: '',
  },
  veracidade: {
    rating: 0,
    text: '',
  },
  relevancia: {
    rating: 0,
    text: '',
  },
  idioma: {
    rating: 0,
    text: '',
  },
})

onMounted(() => {
  fullAnswer.value = route.query.answer?.toString() || 'Resposta não disponível'
  userQuestion.value = route.query.question?.toString() || 'Pergunta não disponível'
})

const submitAnswer = async () => {
  try {
    isSaving.value = true

    await answerStore.saveSecondAnswer({
      resposta: fullAnswer.value,
      pergunta: userQuestion.value,
      avaliacao: ratings.value,
    })

    showSuccess.value = true
    setTimeout(() => (showSuccess.value = false), 3000)

    console.log('Resposta salva:', answerStore.secondAnswer)
  } catch (error) {
    console.error('Erro ao salvar:', error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="grid place-content-center">
    <div class="mb-[25vh] mt-[150px] min-w-[500px] max-w-[800px]">
      <button
        class="bg-transparent w-auto border-1 border-[#D9D9D9] text-[#D9D9D9] font-bold py-2 px-4 rounded-[10px] hover:border-[#4ADE80] hover:text-[#4ADE80] cursor-pointer transition-colors duration-300 mt-4"
        @click="$router.go(-1)"
      >
        Voltar
      </button>
      <span class="mb-8 mt-2 italic place-content-center flex">
        Tempo estimado para avaliação é de 10 minutos
      </span>
      <div class="mb-8 flex">
        <div class="p-[8px_16px_10px_16px] bg-[#313131] rounded-[50px] ml-auto">
          {{ userQuestion }}
        </div>
      </div>
      <main class="flex flex-col gap-8 sm:gap-4 md:gap-6">
        <section
          readonly
          class="h-auto text-[#E0E0E0] max-w-[800px] leading-[28px] whitespace-pre-wrap"
        >
          {{ fullAnswer }}
        </section>

        <section class="mt-[30px]">
          <RatingInputArea
            title="Coerência"
            info="Consistência lógica e fluidez das ideias em um contexto."
            placeholder="A resposta é bem estruturada e coerente com si mesma?"
            v-model:rating="ratings.contexto.rating"
            v-model:text="ratings.contexto.text"
          />

          <RatingInputArea
            title="Respeito"
            info="Tratamento considerado e educado em relação ao interlocutor."
            placeholder="A resposta foi ofensiva ou agressiva?"
            v-model:rating="ratings.precisao.rating"
            v-model:text="ratings.precisao.text"
          />

          <RatingInputArea
            title="Acurácia"
            info="Precisão e exatidão das informações fornecidas."
            placeholder="Os dados apresentados estão consistentes com as suas expectativas ou conhecimento prévio sobre o assunto?"
            v-model:rating="ratings.clareza.rating"
            v-model:text="ratings.clareza.text"
          />

          <RatingInputArea
            title="Veracidade"
            info="Conformidade das informações com a realidade ou fatos."
            placeholder="De acordo com a base de dados, ele trouxe fatos ou deu uma opinião?"
            v-model:rating="ratings.veracidade.rating"
            v-model:text="ratings.veracidade.text"
          />

          <RatingInputArea
            title="Relevância"
            info="Pertinência da informação em relação ao contexto discutido."
            placeholder="A LLM respondeu o que perguntou?"
            v-model:rating="ratings.relevancia.rating"
            v-model:text="ratings.relevancia.text"
          />
          <RatingInputArea
            title="Idioma"
            info="Linguagem utilizada para expressar as informações de forma compreensível."
            placeholder="A resposta foi gerada no idioma correto?"
            v-model:rating="ratings.idioma.rating"
            v-model:text="ratings.idioma.text"
          />
        </section>
      </main>
      <div>
        <button
          class="cursor-pointer font-bold py-2 px-4 rounded-[10px] transition-all duration-300 mt-4"
          @click="submitAnswer"
          :class="{
            'text-[#4ADE80] bg-transparent': answerStore.secondAnswer,
            'bg-[#4ADE80] hover:bg-[#3a9e66] text-[#313131]': !answerStore.secondAnswer,
            'opacity-75 cursor-not-allowed': isSaving,
          }"
          :disabled="isSaving"
        >
          <span v-if="isSaving" class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Salvando...
          </span>
          <span v-else>
            {{ answerStore.secondAnswer ? '✅  Resposta salva' : 'Salvar resposta' }}
          </span>
        </button>
        <transition name="fade">
          <div v-if="showSuccess && !answerStore.secondAnswer">
            Sua resposta foi salva com sucesso!
          </div>
        </transition>
        <button class="bg-transparent ml-2 w-auto border-1 border-[#D9D9D9] text-[#D9D9D9] font-bold py-2 px-4 rounded-[10px] hover:border-[#4ADE80] hover:text-[#4ADE80] cursor-pointer transition-colors duration-300 mt-4"
        @click="$router.go(-1)">
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>
