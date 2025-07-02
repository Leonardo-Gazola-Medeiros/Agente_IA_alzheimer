import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Rating {
  rating: number
  text: string
}

interface AnswerData {
  resposta: string
  pergunta: string
  avaliacao: {
    contexto: Rating
    precisao: Rating
    clareza: Rating
    relevancia: Rating
    veracidade: Rating
    idioma: Rating
  }
}

export const useAnswerStore = defineStore('answers', () => {
  // Dados das respostas
  const firstAnswer = ref<AnswerData | null>(null)
  const secondAnswer = ref<AnswerData | null>(null)

  const llm1 = ref<string | null>(null)
  const llm2 = ref<string | null>(null)

  // Dados adicionais (feedback final)
  const feedbackFinal = ref({
    feedback_usuario: '',
    melhor_performance: '',
  })

  // Métodos para salvar respostas
  const saveFirstAnswer = (data: AnswerData) => {
    firstAnswer.value = data
  }

  const saveSecondAnswer = (data: AnswerData) => {
    secondAnswer.value = data
  }

  const saveLlm1 = (data : string) => {
    llm1.value = data
  }

  const saveLlm2 = (data : string) => {
    llm2.value = data
  }

  // Método para salvar feedback final
  const saveFeedback = (feedback: string, performance: string) => {
    feedbackFinal.value = {
      feedback_usuario: feedback,
      melhor_performance: performance,
    }
  }

  // Verifica se ambas respostas foram completadas
  const bothAnswered = () => firstAnswer.value && secondAnswer.value

  // Gera o payload completo
  const getPayload = () => {
    if (!bothAnswered()) throw new Error('Ambas as respostas devem ser completadas')

    const formatEvaluation = (evaluation: AnswerData['avaliacao']) => {
      return {
        coerencia: {
          rating: evaluation.contexto.rating,
          text: evaluation.contexto.text || '', 
        },
        respeito: {
          rating: evaluation.precisao.rating,
          text: evaluation.precisao.text || '', 
        },
        acuracia: {
          rating: evaluation.clareza.rating,
          text: evaluation.clareza.text || '', 
        },
        relevancia: {
          rating: evaluation.relevancia.rating,
          text: evaluation.relevancia.text || '', 
        },
        veracidade: {
          rating: evaluation.veracidade.rating,
          text: evaluation.veracidade.text || '', 
        },
        idioma: {
          rating: evaluation.idioma.rating,
          text: evaluation.idioma.text || '', 
        },
      }
    }

    return {
      llm1: llm1.value,
      llm2: llm2.value,
      endereco_ip_user: '127.0.0.1',
      pergunta: firstAnswer.value?.pergunta || '',
      resposta_llm1: firstAnswer.value?.resposta || '',
      resposta_llm2: secondAnswer.value?.resposta || '',
      avaliacao_llm1: formatEvaluation(
        firstAnswer.value?.avaliacao || ({} as AnswerData['avaliacao']),
      ),
      avaliacao_llm2: formatEvaluation(
        secondAnswer.value?.avaliacao || ({} as AnswerData['avaliacao']),
      ),
      ...feedbackFinal.value,
    }
  }

  function $reset() {
    firstAnswer.value = null
    secondAnswer.value = null
    feedbackFinal.value = {
      feedback_usuario: '',
      melhor_performance: '',
    }
  }

  return {
    llm1,
    llm2,
    saveLlm1,
    saveLlm2,
    firstAnswer,
    secondAnswer,
    feedbackFinal,
    saveFirstAnswer,
    saveSecondAnswer,
    saveFeedback,
    bothAnswered,
    getPayload,
    $reset,
  }
})
