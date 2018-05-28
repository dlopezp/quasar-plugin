<template>
  <q-checkbox
    v-model="internalValue"
    v-bind="$props"
    @input="onInput"
    />
</template>

<script>
import PlaymoInputMixin from '@/mixins/input'
import { QCheckbox } from 'quasar-framework/dist/quasar.mat.esm'

export default {
  name: 'PlaymoTtCcInput',
  mixins: [ PlaymoInputMixin, QCheckbox ],
  data () {
    return {
      internalValue: false,
      defaultLabel: this.$t('field.ttcc.label')
    }
  },
  props: {
    label: {
      type: String,
      default: this.defaultLabel
    }
  },
  validations: {
    internalValue: {
      required: value => value
    }
  }
}
</script>
