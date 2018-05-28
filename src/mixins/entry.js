import { createNamespacedHelpers } from 'vuex'
import { name as gameName } from '@/store'
import { types as actions } from '@/store/actions'
import { types as getters } from '@/store/getters'

const { mapGetters, mapActions } = createNamespacedHelpers(gameName)

export default {
  computed: {
    ...mapGetters({
      status: getters.status,
      firstRouteLocation: getters.firstRouteLocation,
      routeByName: getters.routeByName
    })
  },
  methods: {
    ...mapActions({
      fetchPromotion: actions.fetchPromotion,
      visit: actions.visit
    })
  },
  mounted () {
    this.$router.push('/')

    this.fetchPromotion()
      .then(this.visit)
      .then(() => this.status)
      .catch(() => this.status || 'not-found')
      .then(status => {
        this.$q.loading.hide()

        if (status !== 'published') return this.$router.push(this.routeByName(status))

        return this.$router.push(this.firstRouteLocation)
      })
  }
}
