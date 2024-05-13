import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Register from '@/views/register/index.vue'
import ForgetPwd from '@/views/forgetPwd/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/forget',
      component:ForgetPwd
    },
    {
      path:'/',
      component:Home
    }
  ]
})

export default router
