import { createState } from './state'
import mutations from './mutations'

const state = createState()

export default {
  namespace: true,
  state,
  // getters,
  mutations,
}