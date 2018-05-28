<template>
  <q-field
    inset="label"
    :error="!valid"
    v-bind="fieldProps()">

    <component
      v-bind:is="fieldComponent"
      :field="field"
      @validate="onValidate"
      v-bind="$props"
      />
  </q-field>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { QField, QInput, QSelect } from 'quasar-framework/dist/quasar.mat.esm'
import PlaymoEmailInput from '@/components/inputs/email.vue'
import PlaymoSelectInput from '@/components/inputs/options.vue'
import PlaymoUserPlayCodeinput from '@/components/inputs/code.vue'
import PlaymoTtCcInput from '@/components/inputs/ttcc.vue'

const fieldsMap = {
  code: PlaymoUserPlayCodeinput,
  email: PlaymoEmailInput,
  options: PlaymoSelectInput,
  ttcc: PlaymoTtCcInput
}

export default {
  mixins: [ QField, QInput, QSelect ],
  components: { PlaymoEmailInput, PlaymoSelectInput, PlaymoTtCcInput, PlaymoUserPlayCodeinput },
  data () {
    return {
      valid: true,
      isCheckbox: this.field.type === 'checkbox' || this.field.type === 'ttcc'
    }
  },
  props: {
    value: {
      default: ''
    },
    field: {
      type: Object,
      required: true
    }
  },
  validations: {
    internalValue: { required, email }
  },
  computed: {
    fieldComponent () {
      return fieldsMap[this.field.type]
    }
  },
  methods: {
    onValidate (valid) {
      this.valid = valid
    },
    fieldProps () {
      if (!this.isCheckbox) return this.$props

      const { label, ...props } = this.$props // eslint-disable-line no-unused-vars
      return props
    }
  }
}
</script>

