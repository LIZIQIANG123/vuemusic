import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import login from '@/components/Login/login'
import mobielogin from '@/components/Login/mobielogin'
import detail from '@/components/pages/detail'
import allgedan from '@/components/pages/allgedan'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobielogin',
      component: mobielogin,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/mobielogin',
      name: 'mobielogin',
      component: mobielogin,
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
   
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
   
    },
    {
      path: '/allgedan',
      name: 'allgedan',
      component: allgedan,
   
    },
  ]
})
