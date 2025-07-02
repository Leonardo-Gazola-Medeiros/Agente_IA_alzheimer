<script setup lang="ts">
import { ref } from 'vue'
import { useAnswerStore } from '@/stores/answerStore'
import { useRouter } from 'vue-router'

const answerStore = useAnswerStore()
const router = useRouter()

const feedback = ref('')
const melhorPerformance = ref('')

const submitFeedback = () => {
  answerStore.saveFeedback(feedback.value, melhorPerformance.value)
  
  // Obter payload completo
  const payload = answerStore.getPayload()
  console.log('Payload completo:', payload)
  
  // Aqui você pode enviar para o backend
  // await api.submitEvaluation(payload)
  
  // Redirecionar para página de confirmação
  router.push('/obrigado')
}
</script>

<template>
  <div class="grid place-content-center min-h-screen p-4">
    <div class="max-w-2xl w-full">
      <h1 class="text-2xl font-bold mb-8">Feedback Final</h1>
      
      <div v-if="!answerStore.bothAnswered()" class="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
        Por favor, complete ambas as avaliações antes de enviar o feedback final.
      </div>
      
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Seu Feedback Geral</h2>
        <textarea
          v-model="feedback"
          class="w-full p-4 bg-[#313131] rounded-[10px] text-[#E0E0E0]"
          rows="4"
          placeholder="Digite seu feedback geral sobre as respostas..."
        ></textarea>
      </div>
      
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-2">Qual resposta teve melhor performance?</h2>
        <select 
          v-model="melhorPerformance"
          class="bg-[#313131] text-[#E0E0E0] p-2 rounded w-full"
        >
          <option value="">Selecione...</option>
          <option value="model-1">Modelo 1</option>
          <option value="model-2">Modelo 2</option>
        </select>
      </div>
      
      <button
        @click="submitFeedback"
        :disabled="!answerStore.bothAnswered()"
        :class="{
          'bg-[#4ADE80] hover:bg-[#3a9e66] cursor-pointer': answerStore.bothAnswered(),
          'bg-gray-500 cursor-not-allowed': !answerStore.bothAnswered()
        }"
        class="text-[#313131] font-bold py-2 px-4 rounded-[10px] transition-colors duration-300"
      >
        Enviar Avaliação Completa
      </button>
    </div>
  </div>
</template>