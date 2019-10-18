<template>
  <div class="flex flex-col px-4 text-gray-900">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Based on your settings, here’s what you could expect
    </h1>

    <div class="mt-10 flex justify-start items-center">
      <img class="h-40" src="/img/undraw_begin_chat_c6pj.svg" />
    </div>
    <div class="mt-4 font-semibold text-lg text-gray-800 leading-snug">
      Unfortunately, she can’t book your place because your calendar is blocked.
    </div>
    <div class="font-light mt-3 mb-14">
      Lou is planning her trip and thinks your listing is perfect.
    </div>

    <div class="mt-4 flex justify-start items-center">
      <img class="h-40" src="/img/undraw_travelers_qlt1.svg" />
    </div>
    <div class="mt-4 font-semibold text-xl text-gray-800 leading-snug">
      Guests who meet Airbnb requirements can instantly book.
    </div>
    <div class="font-light mt-3 mb-14">
      In addition to meeting guest requirements, Lou agrees to your House Rules.
    </div>

    <div class="mt-4 flex justify-start items-center">
      <img class="h-40" src="/img/undraw_chat_1wo5.svg" />
    </div>
    <div class="mt-4 font-semibold text-xl text-gray-800 leading-snug">
      Guests send a message with their booking confirmation.
    </div>
    <div class="font-light mt-3 mb-14">
      Lou says she’ll be in town for work and she’d love to stay with you.
    </div>

    <div class="mt-4 flex justify-start items-center">
      <img class="h-40" src="/img/undraw_agreement_aajr.svg" />
    </div>
    <div class="mt-4 font-semibold text-xl text-gray-800 leading-snug">
      Welcome guests to your space!
    </div>
    <div class="font-light mt-3 mb-14">
      Before Lou arrives, co-ordinate details like check-in time and key
      exchange.
    </div>

    <Footer :back="back" :next="updateAndContinue" />
  </div>
</template>

<script>
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {}
  },
  computed: {
    hosting() {
      // Unfortunately, she can’t book your place because your calendar is blocked.
      // You’re available to host starting 18 Oct
    },
  },
  methods: {
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 25 : 24,
      })
    },
    updateAndContinue() {
      this.updateProgress(true)

      this.next()
    },
    updateAndExit() {
      this.updateProgress(false)

      this.checkpoint()
    },
  },
  created() {
    let listing = this.$store.state.listing
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.updateAndExit()
      },
    },
  },
}
</script>
