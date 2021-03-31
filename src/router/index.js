import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ResetPassword from '../views/ResetPassword.vue'
import RecoverPassword from '../views/RecoverPassword.vue'
import ChangePassword from '../views/ChangePassword.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: RecoverPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router
