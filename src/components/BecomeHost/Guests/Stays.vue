<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      How long can guests stay?
    </h1>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <div>
          <InlineCounter text="nights min" :func="updateMinStay" />
        </div>

        <div class="mt-4">
          <InlineCounter text="nights max" :func="updateMaxStay" />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-10" v-if="maxStay > 0">
      <div
        class="flex items-center text-gray-900 font-semibold tracking-wide mb-2"
      >
        For stays longer than 1 night
        <span @click="toggleTooltip">
          <svg
            class="ml-2 h-4 fill-current cursor-pointer"
            :class="{
              'text-indigo-200': tooltipOn,
              'text-indigo-400': !tooltipOn,
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
            />
          </svg>
        </span>
        <Tooltip
          :tip="tooltipText"
          :show="tooltipOn"
          :toggle-tooltip="toggleTooltip"
          v-if="tooltipOn"
        />
      </div>
      <div class="w-full px-3">
        <div
          :class="{ 'mb-3': index != exceptionOptions.length - 1 }"
          v-for="(option, index) in exceptionOptions"
          :key="index"
        >
          <input
            type="radio"
            :id="index"
            :value="option.text"
            name="overLimit"
            v-model="limitException"
          />
          <label :for="index" class="ml-2 font-light inline-block w-11/12"
            >{{ option.text }}
            <span
              class="bg-gray-300 uppercase text-sm font-normal tracking-wide p-1"
              v-if="option.recommended"
              >recommended</span
            ></label
          >
        </div>
      </div>
    </div>

    <div class="mt-10 w-3/5 font-semibold tracking-wide text-sm text-gray-600">
      <span class="text-indigo-600">Tip:</span> {{ tip }}
    </div>

    <Footer
      :back="back"
      :next="updateAndContinue"
      :checkpoint="updateAndExit"
    />
  </div>
</template>

<script>
import InlineCounter from '@/components/Form/InlineCounter'
import Tooltip from '@/components/Tooltip'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { InlineCounter, Tooltip, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      minStay: 0,
      maxStay: 0,
      limitException: 'Manually review and approve reservation requests',
      exceptionOptions: [
        {
          text: 'Manually review and approve reservation requests',
          recommended: true,
        },
        {
          text:
            "Don't allow reservation requests for stays longer than 1 night",
          recommended: false,
        },
      ],
      tooltipOn: false,
      tooltipText:
        "Your listing will show up in more guest search results if you allow reservation requests. For stays of this length you'll still be able to manually approve every reservation request",
    }
  },
  computed: {
    tip() {
      if (
        this.limitException ==
        "Don't allow reservation requests for stays longer than 1 night"
      )
        return 'Your maximum trip length setting is set to 1 nights. To host stays one week and longer, change this to 7 nights or more.'

      return 'Shorter trips can mean more reservations, but you might have to turn over your space more often.'
    },
  },
  methods: {
    toggleTooltip() {
      this.tooltipOn = !this.tooltipOn
    },
    updateMinStay(num) {
      this.minStay = num
    },
    updateMaxStay(num) {
      this.maxStay = num
    },
    updateListing() {
      this.$store.dispatch('updateListingStayLimit', {
        minNightStays: this.minStay,
        maxNightStays: this.maxStay,
        stayException: this.limitException,
      })
    },
    updateAndContinue() {
      this.updateListing()

      this.next()
    },
    updateAndExit() {
      this.updateListing()

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('minNightStays'))
        this.minStay = listing.minNightStays

      if (listing.hasOwnProperty('maxNightStays'))
        this.maxStay = listing.maxNightStays

      if (listing.hasOwnProperty('stayException'))
        this.limitException = listing.stayException
    },
  },
  created() {
    this.initializeValues()
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint()
      },
    },
  },
}
</script>
