import axios from 'axios'

import vuexModule, { name as vuexModuleName} from './store'

export function install (Vue, promotionId, store, router) {
  axios.defaults.baseURL = 'https://game.playmopro.com/v1'
  axios.defaults.crossDomain = true

  const routes = router.options.routes.map(
    route => ({ name: route.name, path: route.path, meta: route.meta })
  )

  vuexModule.state.routes = routes
  vuexModule.state.promotionId = promotionId
  store.registerModule(vuexModuleName, vuexModule)

  router.beforeEach((to, from, next) => {
    if (to.meta && !to.meta.needDeal) return next()

    vuexModule.actions.deal
      .then(() => next())
  })
}

export * from './store'
export * from './layouts'
export * from './pages'
export * from './mixins'
export * from './types'

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
