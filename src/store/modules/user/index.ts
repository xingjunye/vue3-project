
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module
} from 'vuex'

import { state, UserState } from "./state"
import { mutations } from './mutations'
// import { RootState } from"@/store"

export const store: any = {
  namespaced: true,
  state,
  mutations
}