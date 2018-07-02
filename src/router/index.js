import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import EffectDetail from '@/components/EffectDetail'
import Img from '@/components/Img'


Vue.use(Router)

export default new Router({
  routes: [
   
    {
    	path:'/',
    	name:'Home',
    	component:Home,
      meta: {
        keepAlive: false 
      }
    },
     {
      path:'/EffectDetail',
      name:'EffectDetail',
      component:EffectDetail,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path:'/Img',
      name:'Img',
      component:Img
    },

  ]
})
