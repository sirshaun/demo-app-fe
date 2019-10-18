<template>
  <div>
    <div class="flex flex-col px-4">
      <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
        Here’s how guests will book with you
      </h1>

      <div class="flex justify-between mt-10">
        <div class="flex flex-col border border-gray-400 p-3 mr-3">
          <div class="mb-6">
            <img
              class="w-full h-32 mx-auto object-contain"
              src="/img/undraw_begin_chat_c6pj.svg"
            />
          </div>
          <div class=" text-gray-900 mb-3">
            <span class="mr-1 text-lg font-light">1.</span>
            <span class="font-semibold"
              >Qualified guests find your listing</span
            >
          </div>
          <div class="text-gray-700 leading-snug">
            Anyone who wants to book with you needs to confirm their contact
            information, provide payment details and tell you about their trip.
          </div>
        </div>
        <div class="flex flex-col border border-gray-400 p-3 mr-3">
          <div class="mb-6">
            <img
              class="w-full h-32 mx-auto object-cover"
              src="/img/undraw_personal_settings_kihd.svg"
            />
          </div>
          <div class=" text-gray-900 mb-3">
            <span class="mr-1 text-lg font-light">2.</span>
            <span class="font-semibold">You set controls for who can book</span>
          </div>
          <div class="text-gray-700 leading-snug">
            To book available dates without having to send a request, guests
            must agree to your rules and meet all the requirements you set.
          </div>
          <div class="mt-3">
            <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
              >I want to review every request</a
            >
          </div>
        </div>
        <div class="flex flex-col border border-gray-400 p-3">
          <div class="mb-6">
            <img
              class="w-full h-32 mx-auto object-cover"
              src="/img/undraw_messages1_9ah2.svg"
            />
          </div>
          <div class=" text-gray-900 mb-3">
            <span class="mr-1 text-lg font-light">3.</span>
            <span class="font-semibold"
              >Once a guest books, you get notified</span
            >
          </div>
          <div class="text-gray-700 leading-snug">
            You’ll immediately get a confirmation email with information like
            why they’re coming, when they’re arriving and who they’re coming
            with.
          </div>
        </div>
      </div>

      <div class="mt-10 font-semibold">
        You’re protected throughout
      </div>

      <div class="flex items-start mt-5">
        <div class="w-1/6">
          <svg
            class="h-12 text-indigo-500 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"
            />
          </svg>
        </div>
        <div class="w-4/6 text-gray-700 leading-snug mb-20">
          In the rare case there are issues, Airbnb has you covered with 24/7
          customer support, a $1,000,000 USD Host Guarantee, and completely
          penalty-free cancellations if you’re uncomfortable with a reservation.
        </div>
      </div>
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
  methods: {
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 15 : 14,
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
