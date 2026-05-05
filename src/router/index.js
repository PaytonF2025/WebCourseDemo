import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Concept from '@/views/ConceptView.vue'
import MatrixOperation from '@/views/MatrixOperation.vue'
import Application from '@/views/ApplicationView.vue'
import Quiz from '@/views/QuizView.vue'
import EigenvectorView from '@/views/EigenvectorView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/concepts',
    name: 'Concepts',
    component: Concept
  },
  {
    path: '/eigenvectors',
    name: 'Eigenvectors',
    component: EigenvectorView
  },
  {
    path: '/matrix-operations',
    name: 'MatrixOperations',
    component: MatrixOperation
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Application
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
