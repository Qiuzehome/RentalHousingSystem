import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import regist from '@/components/regist'
import personal from '@/components/personal'
import home from '@/components/home'
import house_list from '@/components/house_list'
import detil from '@/components/detil'
import rank from '@/components/rank'
import manager from '@/components/manager'
import list_out from '@/components/listout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/house_list',
      name:'house_list',
      component:house_list
    },
    {
      path:'/detil',
      name:'detil',
      component:detil
    },
    {
      path:'/rank',
      name:'rank',
      component:rank
    },
    {
      path:'/manager',
      name:'manager',
      component:manager
    },{
      path:'/list_out',
      name:'list_out',
      component:list_out
    }
  ]
 
})
