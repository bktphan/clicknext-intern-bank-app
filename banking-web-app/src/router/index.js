import LoginView from '@/views/LoginView.vue'
import DepositView from '@/views/DepositView.vue'
import TransactionView from '@/views/TransactionView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { 
      path: '/deposit',
      name: 'deposit',
      component: DepositView
    },
    { 
      path: '/transaction',
      name: 'transaction',
      component: TransactionView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (!isLoggedIn && to.path !== '/login') {
    next('/login')
  } else {
    next()
  } 
})

export default router
