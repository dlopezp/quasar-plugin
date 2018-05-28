<template>
  <q-input
    v-model="internalValue"
    v-bind="$props"
    @input="onInput"
    />
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { QInput } from 'quasar-framework/dist/quasar.mat.esm'
import PlaymoInputMixin from '@/mixins/input'

export default {
  mixins: [ QInput, PlaymoInputMixin ],
  props: {
    value: {
      default: ''
    }
  },
  validations: {
    internalValue: { required, email }
  }
}
</script>
