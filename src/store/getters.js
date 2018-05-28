// import router from 'src/router'

export const types = {
  promotionId: 'promotionId',
  status: 'status',
  firstRouteLocation: 'firstRouteLocation',
  routeByName: 'routeByName',
  nextRoute: 'nextRoute',
  dateStart: 'dateStart',
  fields: 'fields',
  field: 'field',
  restrictiveFieldId: 'restrictiveFieldId',
  data: 'data',
  prize: 'prize',
  deal: 'deal',
  canSubmitData: 'canSubmitData'
}

const promotionId = state => state.promotionId

const status = state => state.promotion.status

const firstRouteLocation = (state, getters, rootState) => {
  const result = state.routes.find(route => route.meta && route.meta.first)

  if (!result) throw new Error('No first route found')

  return result
}

const nextRoute = (state, getters, rootState) => {
  const result = state.routes.find(
    route => route.name === rootState.route.meta.next
  )

  if (!result) throw new Error('No next route found')

  return result
}

const routeByName = state => routeName => state.routes.find(route => route.name === routeName)

const dateStart = state => new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

// const fieldAlias = state => Object.values(state.fields).map(field => field.alias)

const fields = state => Object.values(state.fields).reduce((carry, field) => ({ ...carry, ...{ [field.alias]: field } }), {})

const field = state => fieldId => {
  const field = state.fields[fieldId]
  return { ...field, options: field.options.map(opt => ({ label: opt, value: opt })) }
}

const restrictiveFieldId = state => {
  const restrictiveField = Object.values(state.fields).filter(field => field.restrictive)[0]
  return restrictiveField && restrictiveField.id
}

const data = state => fieldId => {
  console.log(fieldId, state.data)
  return state.data[fieldId]
}

const prize = state => state.prizes[state.deal.prizeId]

const deal = state => state.deal

const canSubmitData = state => Object.values(state.form).every(valid => valid)

export default {
  promotionId,
  status,
  firstRouteLocation,
  routeByName,
  nextRoute,
  dateStart,
  fields,
  field,
  restrictiveFieldId,
  data,
  prize,
  deal,
  canSubmitData
}
