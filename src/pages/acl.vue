<template>
  <DefaultLayout>
    <q-page slot="page" padding class="flex flex-center column content-center q-pa-md">

      <slot name="top"></slot>

      <p>{{ question }}</p>
      <div>
        <q-btn
          round
          color="secondary"
          @click="cancel"
          >
          {{ cancelText }}
        </q-btn>
        <q-btn
          round
          color="primary"
          @click="accept"
          >
          {{ acceptText }}
        </q-btn>
      </div>

      <slot name="bottom"></slot>
    </q-page>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'

export default {
  name: 'PlaymoAclPage',
  components: {
    DefaultLayout
  },
  data () {
    return {
      acceptText: this.acceptButtonText || this.$t('yes'),
      cancelText: this.cancelButtonText || 'No'
    }
  },
  props: {
    question: {
      type: String,
      required: true
    },
    acceptButtonText: {
      type: String
    },
    cancelButtonText: {
      type: String
    }
  },
  methods: {
    accept () {
      this.$router.push(this.$router.currentRoute.meta.next)
    },
    cancel () {
      this.$router.push(this.$router.currentRoute.meta.cancel)
    }
  }
}
</script>

<style>
</style>
