<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <slot name="page"></slot>
      </transition>
    </q-page-container>

    <q-layout-footer flat class="q-pa-sm no-shadow">
      <slot name="footer"></slot>
    </q-layout-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutWithFooter',
  data () {
    return {}
  }
}
</script>
