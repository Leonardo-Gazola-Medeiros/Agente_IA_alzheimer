<template>
  <div class="relative inline-block text-left">
    <!-- Botão do dropdown -->
    <button
      @click="toggleDropdown"
      type="button"
      class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      id="options-menu"
      aria-haspopup="true"
      aria-expanded="true"
    >
      Gerar Relatório
      <!-- Ícone de seta -->
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

    <!-- Itens do dropdown -->
    <div
      v-show="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <a
          href="#"
          @click="generateReport('openai')"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          >Gerar relatório Openai</a
        >
        <a
          href="#"
          @click="generateReport('gemini')"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          >Gerar relatório Gemini</a
        >
        <a
          href="#"
          @click="generateReport('deepseek')"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          >Gerar relatório Deepseek</a
        >
        <a
          href="#"
          @click="generateReport('groq')"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          >Gerar relatório Groq</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      isOpen: false,
      isLoading: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    async generateReport(llm) {
      this.closeDropdown();
      this.isLoading = true;

      try {
        const response = await fetch(`http://localhost:8000/relatorio/${llm}`);

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Relatório ${llm} gerado:`, data);
        alert(`Relatório ${llm} gerado com sucesso!`);
      } catch (error) {
        console.error(`Erro ao gerar relatório ${llm}:`, error);
        alert(`Erro ao gerar relatório ${llm}: ${error.message}`);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    // Fechar o dropdown quando clicar fora
    document.addEventListener('click', (event) => {
      if (!this.$el.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }
};
</script>
