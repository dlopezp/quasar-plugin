<template>
  <DefaultLayout>
    <q-page slot="page" padding class="flex flex-center column content-center q-pa-md">
      <slot name="pre"></slot>
      <p v-for="text in texts" :key="text">
        {{ text }}
      </p>
      <slot name="post"></slot>
    </q-page>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'

export default {
  name: 'PlaymoNotificationPage',
  components: {
    DefaultLayout
  },
  props: {
    texts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
