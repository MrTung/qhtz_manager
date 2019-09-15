import { getUserinfo, setUserinfo, removeUserinfo } from '@/utils/auth'


const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  userinfo: state => {
    state.userinfo = JSON.parse(getUserinfo());
    return getUserinfo()
  }

}
export default getters
