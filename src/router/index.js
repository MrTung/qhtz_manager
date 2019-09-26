import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

import advanceRouter from './advanceRouter'
import userRouter from './userRouter'
import businessRouter from './businessRouter'
import compositeRouter from './compositeRouter'

import { getUserinfo } from '@/utils/auth' // get token from cookie

export const commonRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

function getRouter() {
  // let user = getUserinfo();

  // if (user.length > 0) {
  //   let hasGetUserInfo = JSON.parse(user)
  // if (hasGetUserInfo.userName == '管理员')
  //   return commonRoutes.concat(userRouter).concat(businessRouter).concat(advanceRouter).concat(compositeRouter);
  // else if (hasGetUserInfo.userName == '财务')
  //   return commonRoutes.concat(advanceRouter);
  // else if (hasGetUserInfo.userName == '商家')
  //   return commonRoutes.concat(businessRouter);
  // else if (hasGetUserInfo.userName == '用户')
  // return commonRoutes.concat(userRouter);
  // else if (hasGetUserInfo.userName == '综合')
  return commonRoutes.concat(userRouter).concat(businessRouter).concat(compositeRouter)
  // }
  // return commonRoutes.concat(userRouter).concat(businessRouter);

}

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: getRouter()
})

//废弃方法
export function resetRouter(router) {
  router = () => new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: getRouter()
  });
}

export default createRouter()
