import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export const name = 'playmo'

export { types as getters } from './getters'

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
