import axios from 'axios'
// import Vue from 'vue'

const path = (promotionId, visitId) => {
  return `/promotions/${promotionId}/plays/${visitId}`
}

export const fetchPromotion = (promotionId) => {
  return axios.get(`/promotions/${promotionId}`)
}

export const visit = (promotionId, visitId) => {
  return axios.post(`/promotions/${promotionId}/plays`, { id: visitId })
}

export const send = (promotionId, visitId, data) => {
  return axios.patch(`${path(promotionId, visitId)}`, data)
}

export const deal = (promotionId, visitId) => {
  return axios.get(`${path(promotionId, visitId)}`)
}
