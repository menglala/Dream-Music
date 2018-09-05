import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      component: () => import('../components/user.vue')
    },
    {
      path: '/recommend',
      component: () => import('../components/recommend.vue'),
      children:[
        {path:':id',component:()=>import('../components/disc.vue')}
      ]
    },
    {
      path: '/singer',
      component: () => import('../components/singer.vue'),
      children: [
        {
          path: ':id',
          component: () => import('../components/singerDetail.vue')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('../components/rank.vue')
    },
    {
      path: '/search',
      component: () => import('../components/search.vue')
    }
  ]
})
