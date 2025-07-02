<template>
    <div class="bg-[var(--background-color)] min-h-screen p-6 flex flex-col gap-10 items-center">
      <div
        class="avaliacao-container"
        v-for="(criterio, index) in criterios"
        :key="index"
      >
        <h2 class="pergunta">{{ criterio.titulo }}</h2>
        <h2 class="pergunta">{{ criterio.pergunta }}</h2>
  
        <div class="avaliacao-numeros">
          <div
            v-for="n in 5"
            :key="n"
            class="avaliacao-item"
            @click="criterio.nota = n"
          >
            <span class="numero">{{ n }}</span>
            <div class="circulo" :class="{ ativo: criterio.nota === n }"></div>
          </div>
        </div>
  
        <div class="justificativa">
          <label :for="'justificativa-' + index">Justificativa:</label>
          <textarea
            :id="'justificativa-' + index"
            v-model="criterio.justificativa"
            placeholder="Escreva sua justificativa aqui..."
          ></textarea>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "CriterioAvaliacao",
    data() {
      return {
        criterios: [
          { titulo: "1º Critério: Relevância", pergunta: "Respondeu o que perguntou?", nota: null, justificativa: "" },
          { titulo: "2º Critério: Acurácia", pergunta: "Os dados apresentados estão consistentes com suas expectativas ou conhecimento prévio sobre o assunto?", nota: null, justificativa: "" },
          { titulo: "3º Critério: Veracidade", pergunta: "De acordo com a base de dados, ele trouxe fatos ou deu uma opinião?", nota: null, justificativa: "" },
          { titulo: "4º Critério: Coerência", pergunta: "A resposta é bem estruturada e coerente com si mesma?", nota: null, justificativa: "" },
          { titulo: "5º Critério: Respeito", pergunta: "A resposta foi ofensiva ou agressiva?", nota: null, justificativa: "" },
          { titulo: "6º Critério: Idioma da resposta", pergunta: "A resposta foi gerada no idioma correto?", nota: null, justificativa: "" },
        ]
      };
    }
  };
  </script>
  
<style scoped>
.avaliacao-container {
  width: 500px; 
  margin: 20px auto;
  padding: 24px;
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
  transition: background-color 0.3s ease;
}

  
  .pergunta {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .avaliacao-numeros {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  
  .avaliacao-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .numero {
    font-size: 16px;
    margin-bottom: 6px;
  }
  
  .circulo {
    width: 24px;
    height: 24px;
    border: 2px solid #999;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .circulo.ativo {
    background-color: #3b82f6;
    border-color: #1d4ed8;
  }
  
  .justificativa label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .justificativa textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    font-family: sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
  }
</style>
  