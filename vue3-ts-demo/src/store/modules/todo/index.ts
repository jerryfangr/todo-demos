import { createState } from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = createState()

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}