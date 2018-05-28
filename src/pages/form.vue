<template>
  <LayoutWithFooter>

    <q-page slot="page" class="flex flex-center column q-pa-md">
      <slot name="top"></slot>

      <div class="form-wrapper">
        <slot name="form"></slot>
        <Field
          :field="field"
          v-bind="fieldProps(field)"
          v-for="field in fields"
          :key="field.id"
          />
      </div>

      <slot name="bottom"></slot>

      <div @click="sendPlay">
        <slot name="bottom"></slot>
      </div>
    </q-page>

    <div slot="footer" @click="sendPlay">
      <slot name="footer"></slot>
    </div>
  </LayoutWithFooter>
</template>

<script>
import LayoutWithFooter from '@/layouts/with_footer.vue'
import Field from '@/components/field.vue'

import EventBus, { SEND_DATA_CANCELED } from '@/event-bus'

import { createNamespacedHelpers } from 'vuex'
import { name as gameName } from '@/store'
import { types as getters } from '@/store/getters'
import { types as actions } from '@/store/actions'

const { mapActions, mapGetters } = createNamespacedHelpers(gameName)

export default {
  // name: 'PlaymoFormPage',
  components: {
    LayoutWithFooter,
    Field
  },
  props: {
    fields: {
      type: Array
    },
    footer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      fieldData: getters.data,
      canSubmitData: getters.canSubmitData
    })
  },
  methods: {
    ...mapActions({
      next: actions.navigateToNext,
      send: actions.send
    }),
    fieldProps (field) {
      const { type, ...props } = field // eslint-disable-line no-unused-vars

      return props
    },
    sendPlay () {
      console.log(this.canSubmitData)
      if (!this.canSubmitData) {
        EventBus.$emit(SEND_DATA_CANCELED)
        return
      }

      const data = this
        .fields
        .filter(
          field => ['userPlayCode', 'ttcc'].indexOf(field.id) === -1
        )
        .reduce(
          (carry, field) => ({
            ...carry,
            ...{ [field.id]: this.fieldData(field.id) }
          }),
          {}
        )

      this
        .send({ data })
        .then(this.next)
    }
  }
}
</script>

<style lang="stylus">
.form-wrapper
  width 100%
</style>
