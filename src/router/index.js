import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import regist from '@/components/regist'
import personal from '@/components/personal'
import house_list from '@/components/house_list'
import detil from '@/components/detil'
import rank from '@/components/rank'
import list_out from '@/components/listout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'houseList',
      component: house_list,
      meta: {
        keepAlive: true
      }
    }, {
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
      path: '/house_list',
      name: 'house_list',
      component: house_list
    },
    {
      path: '/detil',
      name: 'detil',
      component: detil
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/list_out',
      name: 'list_out',
      component: list_out
    }
  ]

})
