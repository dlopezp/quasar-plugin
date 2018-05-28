// import Vue from 'vue'
import { normalize, schema } from 'normalizr'

export const types = {
  SET_PROMOTION: 'SET_PROMOTION',
  SET_VISIT: 'SET_VISIT',
  SET_DEAL: 'SET_DEAL',
  ADD_DATA: 'ADD_DATA',
  REGISTER_FORM_FIELD: 'REGISTER_FORM_FIELD'
}

const SET_PROMOTION = (state, payload) => {
  const promotionId = payload.promotion.id

  const prizesSchema = new schema.Entity('prizes')
  const fieldsSchema = new schema.Entity('fields')

  const promotionSchema = new schema.Entity('promotion', {
    prizes: [ prizesSchema ],
    fields: [ fieldsSchema ]
  })

  const normalizedData = normalize(payload.promotion, promotionSchema)
  const { promotion, prizes, fields } = normalizedData.entities

  state.promotion = promotion[promotionId]
  state.prizes = prizes || {}
  state.fields = fields || {}
}

const SET_VISIT = (state, payload) => {
  const { visitId } = payload

  state.visitId = visitId
}

const SET_DEAL = (state, payload) => {
  const { deal } = payload

  state.deal = deal
}

const ADD_DATA = (state, payload) => {
  const { data } = payload

  state.data = { ...state.data, ...data }
}

const REGISTER_FORM_FIELD = (state, payload) => {
  const { data } = payload

  state.form = { ...state.form, ...data }
}

export default {
  SET_PROMOTION,
  SET_VISIT,
  SET_DEAL,
  ADD_DATA,
  REGISTER_FORM_FIELD
}
