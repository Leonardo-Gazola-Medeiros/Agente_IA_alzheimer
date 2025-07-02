import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AnswerPage from '@/views/AnswerPage.vue'
import FirstAnswer from '@/views/FirstAnswer.vue'
import SecondAnswer from '@/views/SecondAnswer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/AnswerPage',
      name: 'answerPage',
      component: AnswerPage,
    },
    {
      path: '/FirstAnswer',
      name: 'firstAnswer',
      component: FirstAnswer,
    },
    {
      path: '/SecondAnswer',
      name: 'secondAnswer',
      component: SecondAnswer,
    },
  ],
})

export default router
