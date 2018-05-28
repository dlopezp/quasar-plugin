<template>
  <LayoutWithFooter>

    <q-page slot="page" class="flex flex-center column content-center q-pa-md">

      <slot name="top"></slot>

      <p v-for="text in texts" :key="text">
        {{ text }}
      </p>

      <slot name="middle"></slot>

      <q-btn
        v-if="!this.time && !this.footer"
        label="Entrar"
        color="primary"
        class="full-width"
        @click="next"
        />

        <slot name="bottom"></slot>
    </q-page>

    <q-btn
      v-if="!this.time && this.footer"
      slot="footer"
      label="Entrar"
      color="primary"
      class="full-width"
      @click="next"
      />

  </LayoutWithFooter>
</template>

<script>
import LayoutWithFooter from '@/layouts/with_footer.vue'
import DefaultLayout from '@/layouts/default.vue'

import { createNamespacedHelpers } from 'vuex'
import { name as gameName } from '@/store'
import { types as getters } from '@/store/getters'

const { mapGetters } = createNamespacedHelpers(gameName)

export default {
  name: 'PlaymoNextPage',
  components: {
    LayoutWithFooter,
    DefaultLayout
  },
  props: {
    time: {
      type: Number,
      validator: value => parseFloat(value) > 0,
      required: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    texts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      routeByName: getters.routeByName
    })
  },
  methods: {
    next () {
      const nextRouteName = this.$router.currentRoute.meta.next
      this.$router.push(this.routeByName(nextRouteName))
    }
  },
  mounted () {
    if (!this.time) return

    setTimeout(this.next, this.time * 1000)
  }
}
</script>
