<template>
  <div class="flex flex-col px-4 text-gray-900">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Your local laws and taxes
    </h1>
    <div class="flex flex-wrap mt-6 font-semibold text-lg text-gray-800">
      Make sure you familiarise yourself with your local laws, as well as
      <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
        >Airbnb’s Anti-Discrimination Policy.</a
      >
    </div>

    <div class="mt-6 mb-20">
      <p>
        Take a moment to review the local laws that apply to your listing. We
        want to make sure you have everything you need to get off to a great
        start.
      </p>

      <p class="mt-3">
        Most cities have rules covering homesharing, and the specific codes and
        ordinances can appear in many places (such as zoning, building,
        licensing or tax codes). In many municipalities, you must register, get
        a permit or obtain a licence before you list your property or accept
        guests. You may also be responsible for collecting and remitting certain
        taxes. In some places, short-term rentals can be prohibited altogether.
      </p>

      <p class="mt-3">
        Since you are responsible for your own decision to list or book, you
        should be comfortable with the applicable rules before listing on
        Airbnb. To get you started, we offer some helpful resources under 'Your
        City Laws'.
      </p>

      <div class="mt-2">
        <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
          >Learn more about responsible hosting</a
        >
      </div>

      <p class="mt-3">
        By accepting our Terms of Service and listing your space, you certify
        that you will follow applicable laws and regulations.
      </p>
    </div>

    <Footer :back="back" :next="updateAndContinue" next-btn-text="Finish" />
  </div>
</template>

<script>
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    review: { type: Boolean, default: false },
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
      if (this.review) {
        this.$store.dispatch('updateProgress', {
          step: null,
          page: step ? 30 : 25,
        })
      } else {
        this.$store.dispatch('updateProgress', {
          step: null,
          page: step ? 30 : 25,
          status: 'complete',
        })
      }
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
