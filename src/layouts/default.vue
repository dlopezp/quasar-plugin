<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <slot name="page"></slot>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {}
  }
}
</script>
