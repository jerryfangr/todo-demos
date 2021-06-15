import { createState } from './state'
import mutations from './mutations'

const state = createState()

export default {
  namespaced: true,
  state,
  // getters,
  mutations,
}