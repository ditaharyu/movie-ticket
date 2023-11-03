import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/detail/:id/booking',
      name: 'Booking',
      component: () => import('../views/BookView.vue')
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('../views/HistoryView.vue')
    },
  ]
})

export default router
