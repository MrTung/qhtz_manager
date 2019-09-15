import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// import userInfo from './modules/userInfo'


import { getUserinfo, setUserinfo, removeUserinfo } from '@/utils/auth'

Vue.use(Vuex)
const state = {
  userinfo: "", //用户信息
}
const store = new Vuex.Store({

  modules: {
    app,
    settings,
    user,
  },
  getters,
  state,
  mutations: {
    userinfo(state, userinfo) {
      state.userinfo = userinfo;
      setUserinfo(userinfo);
    }
  },
})

export default store
