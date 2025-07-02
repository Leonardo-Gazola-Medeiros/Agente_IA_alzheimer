import { defineStore } from 'pinia'


export const useLlmStore = defineStore('chat', {
  state: () => ({
    respostas: {} as Record<string, string>,
  }),
  actions: {
    setRespostas(respostas: Record<string, string>) {
      this.respostas = respostas
    },
  },
})