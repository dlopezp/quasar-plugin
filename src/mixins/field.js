import EventBus, { SEND_DATA_CANCELED } from '@/event-bus'

import { createNamespacedHelpers } from 'vuex'
import { name as gameName } from '@/store'
import { types as mutations } from '@/store/mutations'

const { mapMutations } = createNamespacedHelpers(gameName)

export default {
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      internalValue: this.value
    }
  },
  validations: {
    internalValue: {}
  },
  methods: {
    ...mapMutations({
      addFieldData: mutations.ADD_FIELD_DATA,
      registerField: mutations.REGISTER_FORM_FIELD
    }),
    validate () {
      this.$v.internalValue.$touch()
      this.$emit('validate', !this.$v.internalValue.$error)
    },
    storeValidation () {
      const data = { [this.field.id]: !this.$v.internalValue.$error }
      this.registerField({ data })
    },
    storeData (value) {
      const data = { [this.field.id]: value }
      this.addFieldData({ data })
    },
    onInput (value) {
      this.validate()
      this.storeValidation()
      this.storeData(value)
    }
  },
  mounted () {
    this.$v.internalValue.$touch()
    this.storeValidation()

    EventBus.$on(SEND_DATA_CANCELED, this.validate)
  }
}
