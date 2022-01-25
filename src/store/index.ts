import { createStore } from 'vuex'
import { store as user } from './modules/user'
import { UserState } from './modules/user/state'

// export interface RootState {
//   permission: PermissionState
//   user: UserState
// }

export default createStore({
  state: {
    num: 0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
