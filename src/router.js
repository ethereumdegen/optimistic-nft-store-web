import Vue from 'vue'
import Router from 'vue-router'


import Home from './views/Home.vue'
 
import Stake from './views/Stake.vue'
  
import Unstake from './views/Unstake.vue'
  
import Contribute from './views/Contribute.vue'

import Members from './views/Members.vue'
 
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({  
  mode: 'history',
  base: process.env.PUBLIC_URL,
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
    } ,

    

    {
      path: '/stake',
      name: 'stake',
      component: Stake
    } ,
    {
      path: '/unstake',
      name: 'unstake',
      component: Unstake
    } ,

    {
      path: '/members',
      name: 'members',
      component: Members
    } ,
    {
      path: '/contribute',
      name: 'contribute',
      component: Contribute
    } ,

   
    {
      path: '/*',
      component: NotFound
    },
  ]
})
