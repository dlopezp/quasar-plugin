<template>
  <q-select
    v-model="internalValue"
    v-bind="$props"
    @input="onInput"
    />
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { QSelect } from 'quasar-framework/dist/quasar.mat.esm'
import PlaymoInputMixin from '@/mixins/input'

export default {
  mixins: [ QSelect, PlaymoInputMixin ],
  props: {
    value: {
      default: ''
    }
  },
  validations: {
    internalValue: { required }
  }
}
</script>
