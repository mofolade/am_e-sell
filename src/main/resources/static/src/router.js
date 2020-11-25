import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
import VueRouter from 'https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.esm.browser.js'
Vue.use(VueRouter)

import home from './views/home.js'
import about from './views/about.js'
import list from './views/list.js'
import search from './views/search.js'
import auction from './views/auction.js'
import auctionForm from './views/auctionForm.js'
import loginForm from './views/loginForm.js'
import signUp from './views/signUp.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name:"home",
      path: '/', 
      component: home
    },
    {
      name: "about",
      path: '/about', 
      component: about
    },
    {
      name: "list",
      path: '/list/:id', 
      component: list
    },
    {
      name: "search",
      path: '/search/:text', 
      component: search
    },
    {
      name: "auction",
      path: '/auction/:id', 
      component: auction
    },
    {
      name: "auctionForm",
      path: '/newauction', 
      component: auctionForm
    },
    {
      name: "signUp",
      path: '/signUp', 
      component: signUp
    },
    {
      name: "loginForm",
      path: '/loginForm', 
      component: loginForm
    }
  ]
});