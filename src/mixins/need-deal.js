import { createNamespacedHelpers } from 'vuex'
import { name as gameName } from '@/store'
import { types as getters } from '@/store/getters'

const { mapGetters } = createNamespacedHelpers(gameName)

export default {
  computed: {
    ...mapGetters({
      prize: getters.prize
    })
  }
}
