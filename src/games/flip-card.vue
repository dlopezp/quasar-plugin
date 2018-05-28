<template>
  <DefaultLayout>
    <q-page slot="page" class="flex flex-center q-pa-md">
      <div class="panel" v-bind:class="{ flip: flip }">
        <div class="front flex flex-center" @click="flipCard">Toca la carta</div>
        <div class="back flex flex-center">{{ prize ? prize.alias : 'No Premio' }}</div>
      </div>
    </q-page>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/default.vue'
import NeedDealMixin from '@/mixins/need-deal'

export default {
  // name: 'PageName',
  components: {
    DefaultLayout
  },
  mixins: [ NeedDealMixin ],
  data () {
    return {
      flip: false
    }
  },
  methods: {
    flipCard () {
      this.flip = true
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'

  .panel
    float left
    height 80vh
    width 90vw
    position relative
    font-size .8em

    -webkit-perspective 600px
    perspective 600px

  .panel .front
    float none
    position absolute
    top 0
    left 0
    z-index 900
    width inherit
    height inherit
    border 1px solid #ccc
    background $blue-2
    text-align center
    box-shadow 0 1px 5px rgba(0,0,0,0.9)

    -webkit-transform rotateX(0) rotateY(0)
    transform rotateX(0) rotateY(0)

    -webkit-transform-style preserve-3d
    transform-style preserve-3d

    -webkit-backface-visibility hidden
    backface-visibility hidden

    /* -- transition is the magic sauce for animation -- */
    -webkit-transition all .4s ease-in-out
    transition all .4s ease-in-out

  .panel.flip .front
    z-index 900
    border-color #eee
    background #333
    box-shadow 0 15px 50px rgba(0,0,0,0.2)

    -webkit-transform rotateY(179deg)
    transform rotateY(179deg)

  .panel .back
    float none
    position absolute
    top 0
    left 0
    z-index 800
    width inherit
    height inherit
    border 1px solid #ccc
    background #333
    text-shadow 1px 1px 1px rgba(0,0,0,0.6)

    -webkit-transform rotateY(-179deg)
    transform rotateY(-179deg)

    -webkit-transform-style preserve-3d
    transform-style preserve-3d

    -webkit-backface-visibility hidden
    backface-visibility hidden

    /* -- transition is the magic sauce for animation -- */
    -webkit-transition all .4s ease-in-out
    transition all .4s ease-in-out

  .panel.flip .back
    z-index 1000
    background $green-2

    -webkit-transform rotateX(0) rotateY(0)
    transform rotateX(0) rotateY(0)

    box-shadow 0 15px 50px rgba(0,0,0,0.2)

</style>
