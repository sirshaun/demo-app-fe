<template>
  <div>
    <div
      class="flex flex-col"
      :class="{ 'opacity-50': !proceedStepThree }"
      v-if="!stepThreeComplete"
    >
      <div class="uppercase font-bold text-sm tracking-wider text-gray-600">
        Step 3
      </div>
      <div class="font-light text-2xl tracking-wide text-gray-800">
        Get ready for guests
      </div>
      <div class="font-light text-gray-800">
        Booking settings, calendar, price
      </div>
      <div class="mt-6 w-full" v-if="showProgressBar">
        <div class="h-1 relative bg-gray-200">
          <span
            :style="{ width: progress }"
            class="block h-full relative overflow-hidden bg-indigo-400"
          ></span>
        </div>
      </div>
      <div class="mt-6" v-if="proceedStepThree">
        <a
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
          @click="continueToStepThree"
        >
          Continue
        </a>
      </div>
    </div>

    <div class="clearfix mt-6" v-if="stepThreeComplete">
      <div class="float-left">
        <div class="flex flex-col">
          <div class="font-light text-gray-800">
            Booking settings, calendar, price
          </div>
          <div>
            <a
              class="text-indigo-600 hover:opacity-50 cursor-pointer"
              @click="reviewStepThree"
              >Change</a
            >
          </div>
        </div>
      </div>
      <div class="float-right">
        <svg
          class="h-10 text-indigo-700 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviewStepThree: { type: Function, required: true },
    continueToStepThree: { type: Function, default: false },
  },
  data() {
    return {
      step: this.$store.getters.step,
      page: this.$store.getters.page,
    }
  },
  computed: {
    proceedStepThree() {
      return this.$store.getters.stepTwoComplete
    },
    stepThreeComplete() {
      return this.$store.getters.stepThreeComplete
    },
    showProgressBar() {
      return this.$store.getters.lastPageNumber > 10
    },
    progress() {
      if (this.showProgressBar) {
        var progress = parseInt(
          ((this.$store.getters.lastPageNumber - 10) / 14) * 100
        )

        return progress + '%'
      }
    },
  },
}
</script>
