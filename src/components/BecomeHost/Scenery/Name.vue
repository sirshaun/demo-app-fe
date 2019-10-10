<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900">
      Name your place
    </h1>
    <p>
      Attract guests with a listing title that highlights what makes your place
      special.
    </p>

    <div class="flex flex-wrap">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-name"
        >
          Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          :class="{ 'border-red-500 bg-red-100 mb-3': nameError }"
          id="grid-name"
          type="text"
          placeholder="Listing title"
          v-model="name"
        />
        <p v-show="nameError" class="text-red-500 text-xs italic">
          We need a title for your place
        </p>
      </div>
    </div>

    <Footer :back="back" :next="proceed" :checkpoint="updateAndContinue" />
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
    return {
      name: '',
      nameError: false,
    }
  },
  methods: {
    checkDescription() {
      // char limit 50
      this.nameError = this.name == ''
    },
    proceed() {
      this.checkDescription()

      if (!this.nameError) this.updateAndContinue()
    },
    updateListingState() {
      this.$store.dispatch('updateTitle', {
        title: this.name,
      })
    },
    updateAndContinue() {
      this.updateListingState()

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('title')) this.name = listing.title
    },
  },
  created() {
    this.initializeValues()
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
