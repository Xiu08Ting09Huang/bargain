import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/tabbar/home'
import Login from '@/components/login/login'
import GoodsDetail from '@/components/goods/goodsDetail'
import BargainList from '@/components/tabbar/bargainList'
import ErweimaList from '@/components/erweima/erweimaList'
import ErweimaDetail from '@/components/erweima/erweimaDetail'
import Bargain from '@/components/bargain/bargain'
import BargainFriends from '@/components/bargain/bargainFriends'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/goodsDetail/:id',
      component: GoodsDetail
    },
    {
      path:'/bargainList/:status',
      component: BargainList
    },
    {
      path:'/erweimaList',
      component: ErweimaList
    },
    {
      path:'/erweimaList/erweimaDetail/:bargainId',
      component: ErweimaDetail
    },
    {
      path:'/bargain/:id',
      component: Bargain
    },
    {
      path:'/bargainFriends/:bargainId/:id/:openId/:endTime',
      component:BargainFriends
    }
  ],
  linkActiveClass: "mui-active",
  // history	:true
})  