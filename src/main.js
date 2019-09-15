import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import axios from 'axios'
import VueAxios from 'vue-axios'
import { removeUserinfo } from "@/utils/auth"; // get token from cookie

// 返回数据拦截处理
axios.interceptors.response.use(response => {

  if (response.data) {
    if (response.data.errcode == '3') {
      console.log('未登录,重新登录');
      v.$alert('会话过期请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          store.commit("userinfo", null);
          removeUserinfo();
        }
      });
      return;
    }
    else if (response.data.errcode == '0') {
      return {
        code: 0,
        msg: response.data.errmsg
      };
    } else {
      return {
        code: 1,
        data: response.data.data[0]
      };
    }
  } else {
  }
}, error => Promise.reject(error.response))


// axios.defaults.withCredentials = true;

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;application/json;';
Vue.use(VueAxios, axios)

import clipboard from 'clipboard';
Vue.prototype.clipboard = clipboard;


import { urls } from "@/utils/url.js";
Vue.prototype.urls = urls;


// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

const v = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// router.beforeEach(async (to, from, next) => {
//   if (to.path.includes("account") || to.path.includes("auth")) {
//     if (store.state.userinfo.userId == "admin") next();
//     else next({ path: '/404' });
//   } else {
//     next();
//   }
// })