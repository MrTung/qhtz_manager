import Cookies from 'js-cookie'
import store from '../store'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const UserinfoKey = 'userinfo_Key'

export function getUserinfo() {

  let user = Cookies.get(UserinfoKey);

  if (store && user)
    store.commit("userinfo", JSON.parse(Cookies.get(UserinfoKey)));

  if (user) {
    return Cookies.get(UserinfoKey)
  } return "";

}

export function setUserinfo(token) {
  return Cookies.set(UserinfoKey, token)
}

export function removeUserinfo() {
  return Cookies.remove(UserinfoKey)
}

