<template>
  <div class="grid justify-center min-h-screen bg-[var(--background-color)] px-4">
    <main class="flex flex-col justify-between mt-16 w-full max-w-[800px]">
      <section
        class="flex flex-col items-center transition-opacity duration-1000"
        :class="{ 'opacity-0': !mostrarTexto }"
      >
        <div class="flex justify-between items-center w-full mb-4">
          <img src="../assets/logo/logo.svg" alt="IA Logo" class="w-[30px] h-[30px]" />
          <!-- Dropdown de Relatórios -->
          <div class="relative inline-block text-left">
            <button
              @click="toggleDropdown"
              type="button"
              class="inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[var(--background-color)] text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Gerar Relatório
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div
              v-show="isOpen"
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <a
                  href="#"
                  @click="generateReport('openai')"
                  class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                  role="menuitem"
                  >Gerar relatório Openai</a
                >
                <a
                  href="#"
                  @click="generateReport('gemini')"
                  class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                  role="menuitem"
                  >Gerar relatório Gemini</a
                >
                <a
                  href="#"
                  @click="generateReport('deepseek')"
                  class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                  role="menuitem"
                  >Gerar relatório Deepseek</a
                >
                <a
                  href="#"
                  @click="generateReport('groq')"
                  class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                  role="menuitem"
                  >Gerar relatório Groq</a
                >
              </div>
            </div>
          </div>
        </div>

        <div class="py-5 text-center">
          <h2 class="text-2xl md:text-3xl font-medium text-white-600 break-words">Hello, User</h2>
          <h1
            class="text-3xl md:text-4xl mt-2 font-semibold gradient-bright-effect bg-gradient-to-r from-green-400 via-teal-500 to-sky-400 bg-clip-text text-transparent"
          >
            Como posso ajudar você hoje?
          </h1>
        </div>
        <p
          v-if="mostrarTypingText"
          class="text-xs text-[var(--text-second-color)] max-w-[455px] text-center leading-[27px] typing-text"
        ></p>
      </section>

      <div v-if="loadingGlobal" class="flex justify-center items-center my-8">
        <div class="loading-animation">
          <div class="dot-flashing"></div>
        </div>
      </div>

      <section class="w-[50vw] self-center mb-32 mt-6">
        <ChatInput
          @novaMensagem="exibirRespostas"
          @erroEnvio="loadingGlobal = false"
          @iniciarLoading="loadingGlobal = true"
          @pararLoading="loadingGlobal = false"
          :disabled="loadingGlobal || respostaEnviada"
          :loading="loadingGlobal"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ChatInput from '../components/ChatInput.vue'
// @ts-expect-error it is working this effect
import Typewriter from 'typewriter-effect/dist/core'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainComponent',
  components: {
    ChatInput,
  },
  setup() {
    const mostrarTexto = ref(true)
    const respostas = ref({ openai: '', gemini: '' })
    const mostrarTypingText = ref(true)
    const loadingGlobal = ref(false)
    const router = useRouter()
    const respostaEnviada = ref(false)
    const isOpen = ref(false)
    const isLoadingReport = ref(false)

    const handleLoading = (isLoading: boolean) => {
      loadingGlobal.value = isLoading
    }

    const exibirRespostas = (dados: {
      texto: string
      resposta: { openai: string; gemini: string, groq: string, deepseek: string }
    }) => {
      respostas.value = dados.resposta
      respostaEnviada.value = true
      mostrarTexto.value = false
      mostrarTypingText.value = false

      // Navega após um pequeno delay para mostrar o resultado
      setTimeout(() => {
        router.push({
          path: '/answerPage',
          query: {
            question: dados.texto,
            openai: dados.resposta.openai,
            gemini: dados.resposta.gemini,
            deepseek: dados.resposta.deepseek,
            groq: dados.resposta.groq,
          },
        })
      }, 500)
    }

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const closeDropdown = () => {
      isOpen.value = false
    }

        const generateReport = async (llm: string) => {
      closeDropdown()
      isLoadingReport.value = true

      try {
        const response = await fetch(`http://localhost:8000/relatorio/${llm}`)

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`)
        }

        // Obter o blob do arquivo
        const blob = await response.blob()

        // Criar link para download
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url

        // Sugerir um nome de arquivo com base no LLM
        a.download = `relatorio_${llm}_${new Date().toISOString().split('T')[0]}.docx`

        // Disparar o download
        document.body.appendChild(a)
        a.click()

        // Limpar
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        console.log(`Relatório ${llm} baixado com sucesso`)
      } catch (error) {
        console.error(`Erro ao gerar relatório ${llm}:`, error)
        alert(`Erro ao gerar relatório ${llm}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
      } finally {
        isLoadingReport.value = false
      }
    }

    onMounted(() => {
      // Fechar o dropdown quando clicar fora
      document.addEventListener('click', (event) => {
        const dropdownElement = document.querySelector('.relative.inline-block.text-left')
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          closeDropdown()
        }
      })

      const typingText = document.querySelector<HTMLElement>('.typing-text')
      if (typingText) {
        new Typewriter(typingText, {
          strings: [
            'Este é um sistema de IA desenvolvido para avaliar critérios e treinar respostas de forma eficaz.',
          ],
          autoStart: true,
          loop: true,
          delay: 15,
          cursor: '|',
          pauseFor: 450000,
        })
      }
    })

    return {
      respostas,
      exibirRespostas,
      mostrarTexto,
      mostrarTypingText,
      loadingGlobal,
      handleLoading,
      respostaEnviada,
      isOpen,
      isLoadingReport,
      toggleDropdown,
      closeDropdown,
      generateReport,
    }
  },
})
</script>
