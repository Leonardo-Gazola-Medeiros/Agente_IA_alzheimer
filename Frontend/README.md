# FRONTEND-API6S
Plataforma de avaliação de IA onde usuários comparam respostas de dois LLMs diferentes, seguindo critérios pré-estabelecidos. Seu feedback é coletado e usado para treinamento por RLHF, aprimorando os modelos com dados humanos.

## 🚀 Tecnologias Utilizadas

- **[Vue.js](https://vuejs.org/)** - Framework web para criação de sites.
- **[Tailwind](https://tailwindcss.com/)** - Framework CSS para estilização de páginas web.
- **[Javascript/Typescript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Linguagem de programação interpretada focada para desenvolvimento web
  
- ---

## 📁 Estrutura do Projeto

```
FRONTEND-API6S
└── Client/                              # Raiz do projeto frontend (Vue.js + TypeScript)
    ├── public/                          # Arquivos estáticos servidos diretamente
    │   └── favicon.ico                  # Ícone exibido na aba do navegador
    │
    ├── src/                             # Código fonte principal da aplicação
    │   ├── assets/                      # Recursos estáticos (imagens, fonts, CSS)
    │   │   ├── input/                   # Ícones/arquivos relacionados a inputs
    │   │   │   └── SendButton.svg       # Ícone para botão de envio
    │   │   ├── logo/                    # Arquivos relacionados ao logo
    │   │   │   └── logo.svg             # Logo da aplicação em SVG
    │   │   ├── base.css                 # Estilos CSS base da aplicação
    │   │   └── main.css                 # Estilos CSS principais
    │   │
    │   ├── components/                  # Componentes Vue reutilizáveis
    │   │   ├── ChatInput.vue            # Componente de input para chat
    │   │   ├── DesempenhoChart.vue      # Componente de gráfico de desempenho
    │   │   ├── FeedbackFinal.vue        # Componente de feedback final
    │   │   ├── FeedbackInputArea.vue    # Área de input para feedback
    │   │   ├── Rating.vue               # Componente de avaliação
    │   │   └── RatingInputArea.vue      # Área de input para avaliações
    │   │
    │   ├── pages/                       # Componentes de página (roteados)
    │   │   ├── Criterios.vue            # Página de critérios/requisitos
    │   │   ├── HomePage.vue             # Página inicial da aplicação
    │   │   └── texte.txt                # Arquivo temporário para testes
    │   │
    │   ├── router/                      # Configuração de rotas (Vue Router)
    │   │   └── index.ts                 # Definição das rotas da aplicação
    │   │
    │   ├── stores/                      # Gerenciamento de estado (Pinia)
    │   │   ├── answerStore.ts           # Store para gerenciar respostas
    │   │   └── useLlmstore.ts           # Store para integração com LLM
    │   │
    │   ├── styles/                      # Estilos adicionais
    │   │   └── main.css                 # Arquivo CSS complementar
    │   │
    │   ├── views/                       # Componentes de visualização
    │   │   ├── AnswerPage.vue           # Página principal de respostas
    │   │   ├── FirstAnswer.vue          # Visualização para primeira resposta
    │   │   └── SecondAnswer.vue         # Visualização para segunda resposta
    │   │
    │   ├── App.vue                      # Componente raiz da aplicação Vue
    │   └── main.ts                      # Ponto de entrada da aplicação
    │
    ├── .prettierrc.json                 # Configuração do Prettier (formatação)
    ├── env.d.ts                         # Tipos para variáveis de ambiente
    ├── eslint.config.ts                 # Configuração do ESLint (linting)
    ├── index.html                       # Template HTML base
    ├── package.json                     # Dependências e scripts do projeto
    ├── tailwind.config.ts               # Configuração do Tailwind CSS
    │
    ├── tsconfig.json                    # Config base do TypeScript
    ├── tsconfig.app.json                # Config TS para a aplicação
    ├── tsconfig.node.json               # Config TS para ambiente Node
    ├── tsconfig.vitest.json             # Config TS para testes com Vitest
    │
    ├── vite.config.ts                   # Configuração do Vite (build tool)
    └── vitest.config.ts                 # Configuração do Vitest (testes)
```

---

## ✅ Dependências do Projeto FRONTEND-API6S
### 📦 Dependências Principais (Runtime)
- **Vue 3** (vue@^3.5.13) - Framework JavaScript progressivo
- **Pinia** (pinia@^3.0.1) - Gerenciamento de estado (alternativa ao Vuex)
- **Vue Router** (vue-router@^4.5.0) - Roteamento para SPA
- **Axios** (axios@^1.8.4) - Cliente HTTP para APIs
- **Tailwind CSS** (tailwindcss@^4.0.14) - Framework CSS utilitário
- **Hero Icons** (@heroicons/vue@^2.2.0) - Biblioteca de ícones SVG
- **Chart.js** (chart.js@^4.4.9) + Vue Chart.js (vue-chartjs@^5.3.2) - Visualização de gráficos
- **Typewriter** Effect (typewriter-effect@^2.21.0) - Efeito de digitação animada
- **Vue Toastify** (vue3-toastify@^0.2.8) - Notificações/toasts

### 🌐 Pré-requisitos do Sistema
- **Node.js 18+** (Recomendado LTS)
- **npm 9+ ou pnpm/yarn** (Gerenciador de pacotes)
- **Navegador moderno** (Chrome, Firefox, Edge recentes)

## ⚙️ Instalação e Configuração

### 🔹 Clone o repositório

```bash
git clone https://github.com/FATEC-FULLSTACK/FRONTEND-API6S.git
cd FRONTEND-API6S/Client
```

### 🔹 Instale as dependências

```bash
npm install
```


## 🚀 Como Executar

### 🔹 Execução local
```bash
npm run dev
```

A plataforma estará disponível em:
```
http://127.0.0.1:5173
```
---

## ⚠️ Importante

Para o funcionamento correto do sistema, é necessário que: </br>
✅ O servidor backend esteja em execução simultanenea ao frontend. </br>
🔗 Acesse o **[repositório](https://github.com/FATEC-FULLSTACK/BACKEND-API6S)** do BACKEND-API6S para instruções detalhadas de configuração e execução.

---
