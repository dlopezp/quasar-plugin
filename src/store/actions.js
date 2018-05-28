import { types as mutations } from './mutations'
import * as api from '@/services/api'
import uuid from '@/services/uuid'
// import { Loading } from 'quasar'

export const types = {
  fetchPromotion: 'fetchPromotion',
  visit: 'visit',
  send: 'send',
  deal: 'deal'
}

const fetchPromotion = ({ getters, commit }) => {
  const promotionId = getters.promotionId

  return api.fetchPromotion(promotionId)
    .then(response => {
      const promotion = response.data
      commit(mutations.SET_PROMOTION, { promotion })
      return promotion
    })
}

const visit = ({ state, commit }) => {
  const promotionId = state.promotion.id
  const visitId = uuid()

  return api.visit(promotionId, visitId)
    .then(() => commit(mutations.SET_VISIT, { visitId }))
}

const send = ({ state }, payload) => {
  // Loading.show()
  const promotionId = state.promotion.id
  const visitId = state.visitId
  const { data } = payload
  const toSend = { fields: data }
  if (state.data.userPlayCode) {
    toSend.userPlayCode = state.data.userPlayCode.toUpperCase()
  }

  return api.send(promotionId, visitId, toSend)
}

const deal = ({ state, commit }) => {
  // Loading.show()
  const promotionId = state.promotion.id
  const visitId = state.visitId

  return api.deal(promotionId, visitId)
    .then(response => {
      const deal = response.data
      commit(mutations.SET_DEAL, { deal })
    })
}

export default {
  fetchPromotion,
  visit,
  send,
  deal
}
