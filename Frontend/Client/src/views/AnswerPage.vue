<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnswerStore } from '@/stores/answerStore'
import RatingInputArea from '@/components/RatingInputArea.vue'
import FeedbackInputArea from '@/components/FeedbackInputArea.vue'
import axios from 'axios'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'
import DesempenhoChart from '@/components/DesempenhoChart.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const answerStore = useAnswerStore()

const route = useRoute()
const userQuestion = ref(route.query.question || 'User question not available')

const llm1 = ref(answerStore.llm1)
const llm2 = ref(answerStore.llm2)

const respostaLlm1 = ref(route.query[answerStore.llm1])
const respostaLlm2 = ref(route.query[answerStore.llm2])

const feedbackUsuario = ref('')
const melhorPerformance = ref('')
const isLoading = ref(false)
const mostrarGrafico = ref(false)

const finalFeedback = ref({
  rating: 0,
  text: '',
})

const performanceRating = ref(0)
const feedbackRating = ref(0)

const novaConversa = () => {
  answerStore.$patch({
    firstAnswer: null,
    secondAnswer: null,
    feedbackFinal: {
      feedback_usuario: '',
      melhor_performance: '',
    },
  })

  router.push('/')
}

function toggleGrafico() {
  mostrarGrafico.value = !mostrarGrafico.value
}

const bothAnswered = computed(() => answerStore.bothAnswered())
const submitFinalFeedback = async () => {
  try {
    isLoading.value = true
    const payload = answerStore.getPayload()

    const fullPayload = {
      ...payload,
      feedback_usuario: feedbackUsuario.value,
      melhor_performance: melhorPerformance.value,
    }

    console.log('Enviando payload completo:', fullPayload)

    const response = await axios.post('http://localhost:8000/avaliacao', fullPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    toast.success('Avaliação enviada com sucesso!', {
      theme: 'dark',
      style: {
        color: '#4ADE80',
        borderRadius: '8px',
      },
      icon: '🟢',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    })

    setTimeout(() => {
      router.push('/')
    }, 5000)
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error)
    toast.error('Erro ao enviar avaliação. Tente novamente.', {
      theme: 'dark',
      style: {
        color: '#FFBEBE',
        borderRadius: '8px',
      },
      autoClose: 5000,
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="grid place-content-center mt-[50px]">
    <div class="mb-[20vh]">
      <Box class="mb-8 flex">
        <box class="p-[8px_16px_10px_16px] bg-[#313131] rounded-[50px] ml-auto">
          {{ userQuestion }}
        </box>
      </Box>
      <main class="flex flex-colgap-8 sm:gap-4 md:gap-6">
        <box class="flex gap-8 sm:flex-col md:flex-row">
          <section class="flex flex-col items-center gap-2.5">
            <Box
              readonly
              @click="
                router.push({
                  path: '/firstAnswer',
                  query: {
                    answer: respostaLlm1,
                    question: userQuestion,
                  },
                })
              "
              class="h-[350px] sm:w-[90%] md:w-[430px] bg-[#313131] border-1 border-transparent transition-all duration-500 cursor-pointer rounded-10 rounded-lg p-4 resize-none text-[#E0E0E0]"
              :class="{
                'hover:border-[#4ADE80]': answerStore.firstAnswer,
                'hover:border-[#A29D43]': !answerStore.firstAnswer,
              }"
            >
              <div
                class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400/50 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0.5)_transparent] text-ellipsis line-clamp-[13] whitespace-pre-wrap bg-transparent"
              >
                {{ respostaLlm1 }}
              </div>
            </Box>

            <div class="flex self-start gap-4">
              <box
                class="px-2 self-start py-1 rounded-[5px]"
                :class="{
                  'bg-[#0D6C1A]': answerStore.firstAnswer,
                  'bg-[#a29d43]': !answerStore.firstAnswer,
                }"
              >
                <p class="text-[13px] text-white">
                  {{ answerStore.firstAnswer ? 'Respondido' : 'Resposta pendente' }}
                </p>
              </box>
              <box
                class="px-2 self-start py-1 border-1 rounded-[5px]"
                :class="{
                  'border-[#0D6C1A]': answerStore.firstAnswer,
                  'border-[#a29d43]': !answerStore.firstAnswer,
                }"
              >
                <p class="text-[13px] text-white">LLM 1</p>
              </box>
            </div>
          </section>

          <section class="flex flex-col items-center gap-2.5">
            <Box
              readonly
              @click="
                router.push({
                  path: '/secondAnswer',
                  query: {
                    answer: respostaLlm2,
                    question: userQuestion,
                  },
                })
              "
              class="h-[350px] sm:w-[90%] md:w-[430px] bg-[#313131] border-1 border-transparent transition-all duration-500 cursor-pointer rounded-10 rounded-lg p-4 resize-none text-[#E0E0E0]"
              :class="{
                'hover:border-[#4ADE80]': answerStore.secondAnswer,
                'hover:border-[#A29D43]': !answerStore.secondAnswer,
              }"
            >
              <div class="h-full overflow-y-auto text-ellipsis line-clamp-[13] whitespace-pre-wrap">
                {{ respostaLlm2 }}
              </div>
            </Box>

            <div class="flex self-start gap-4">
              <box
                class="px-2 self-start py-1 rounded-[5px]"
                :class="{
                  'bg-[#0D6C1A]': answerStore.secondAnswer,
                  'bg-[#a29d43]': !answerStore.secondAnswer,
                }"
              >
                <p class="text-[13px] text-white">
                  {{ answerStore.secondAnswer ? 'Respondido' : 'Resposta Pendente' }}
                </p>
              </box>
              <box
                class="px-2 self-start py-1 border-1 rounded-[5px]"
                :class="{
                  'border-[#0D6C1A]': answerStore.secondAnswer,
                  'border-[#a29d43]': !answerStore.secondAnswer,
                }"
              >
                <p class="text-[13px] text-white">LLM 2</p>
              </box>
            </div>
          </section>
        </box>
      </main>

      <!-- se ambas forem respondidas ira aparecer essa mensagem -->
      <div v-if="bothAnswered" class="mt-[50px]">
        <FeedbackInputArea
          title="Nos Conte o que achou"
          placeholder="Por favor, escreva seu feedback..."
          v-model:text="feedbackUsuario"
          v-model:rating="feedbackRating"
        />

        <div class="mt-4 mb-12 cursor-pointer">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-[5px] h-[34px] bg-[#4ADE80]"></span>
            <h2 class="text-[#D9D9D9] font-bold">Qual obteve melhor desempenho ?</h2>
          </div>
          <div class="relative w-full">
            <select
              id="melhorPerformance"
              v-model="melhorPerformance"
              class="bg-[#313131] rounded-[10px] text-[#E0E0E0] w-full outline-none border-transparent p-4 pr-10 border-1 focus:border-[#4ADE80] cursor-pointer appearance-none hover:border-[#4ADE80]"
            >
              <option disabled value="">Selecione uma opção</option>
              <option :value="llm1">LLM 1</option>
              <option :value="llm2">LLM 2</option>
            </select>

            <div
              class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#E0E0E0] text-xs"
            >
              ▼
            </div>
          </div>

          <div class="flex items-center gap-4 mt-4">
            <button
              @click="mostrarGrafico = !mostrarGrafico"
              class="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-md hover:shadow-green-400/10 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
            >
              <ChartBarIcon
                class="w-5 h-5 text-green-400 group-hover:rotate-1 transition-transform"
              />
              <span class="text-sm font-medium cursor-pointer">Visualizar desempenho das LLMs</span>
            </button>
          </div>
          <DesempenhoChart v-if="mostrarGrafico" />
        </div>

        <button
          @click="submitFinalFeedback"
          :disabled="isLoading"
          class="bg-[#4ADE80] text-[#313131] font-bold py-2 px-4 rounded-[10px] hover:bg-[#3a9e66] cursor-pointer transition-colors duration-300 mt-4 flex items-center justify-center gap-2"
          :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
        >
          <span v-if="!isLoading">Finalizar</span>
          <span v-else class="flex items-center gap-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
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
          </span>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-2 sm:gap-1 md:gap-2">
      <ChatInput />
      <span class="self-center text-[12px] text-[#9A9A9A]"
        >Esta IA pode apresentar respostas imprecisas. Considere verificar informações
        importantes</span
      >
    </div>

    <button
      @click="novaConversa"
      class="mx-auto bg-[#D9D9D9] text-[12px] mt-5 text-[#313131] font-medium py-2 px-6 rounded-[20px] cursor-pointer hover:bg-[#9A9A9A] transition-colors duration-300"
    >
      Nova Conversa
    </button>
  </div>
</template>
