import { MutationTree } from "vuex";
import { UserState } from "./state";
import { UserMutationTypes } from "./mutation-types"

export const mutations: MutationTree<UserState> = {
  [UserMutationTypes.SET_USER](state: UserState, token: string): void {
    state.token = token;
    console.log("token:", token);
  }
}
