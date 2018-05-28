<template>
  <q-input
    v-model="internalValue"
    v-bind="$props"
    @input="onInputComponent"
    />
</template>

<script>
import { required } from 'vuelidate/lib/validators'
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
    internalValue: { required }
  },
  methods: {
    onInputComponent () {
      this.internalValue = this.internalValue.toUpperCase()
      this.onInput()
    }
  }
}
</script>
