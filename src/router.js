import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login')
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('@/views/SignIn/SignIn')
    },
    {
      path: '/login-password',
      name: 'LoginWithPassword',
      component: () => import('@/views/Login/LoginWithPassword')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/Search/Search')
    }
  ]
})
