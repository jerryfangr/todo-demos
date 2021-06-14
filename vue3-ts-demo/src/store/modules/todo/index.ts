import { createState } from './state'
import actions from './actions'
import mutations from './mutations'

const state = createState()

export default {
  namespace: true,
  state,
  // getters,
  mutations,
  actions,
}