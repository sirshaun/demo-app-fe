<template>
  <div
    class="fixed w-1/5 mt-32 p-6 border border-gray-400 bg-gray-100 rounded"
    style="top: 50px"
  >
    <div>
      <svg
        class="h-8 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M7 13.33a7 7 0 1 1 6 0V16H7v-2.67zM7 17h6v1.5c0 .83-.67 1.5-1.5 1.5h-3A1.5 1.5 0 0 1 7 18.5V17zm2-5.1V14h2v-2.1a5 5 0 1 0-2 0z"
        />
      </svg>
    </div>

    <!-- first "slide" -->
    <div v-if="slide == 1">
      <div class="mt-3 font-semibold tracking-wide">
        Increase bookings when demand is low
      </div>
      <div class="mt-4 font-light leading-snug text-sm text-gray-800">
        Smart Pricing can automatically adjust your nightly price as demand
        changes based on factors like popular local events, seasonality and
        weekend vs. weekdays.
      </div>
      <div class="flex border-b-4 border-indigo-400 mt-5">
        <div
          class="flex flex-col border-t border-l border-r border-gray-300 w-1/3 p-3"
        >
          <div class="font-semibold text-gray-700 tracking-wide text-center">
            Thu
          </div>
          <div class="mt-2 text-indigo-600 font-semibold text-center">
            $33
          </div>
          <div class="text-indigo-600 font-semibold text-center">USD</div>
        </div>
        <div
          class="border-t border-r border-gray-300 flex flex-col justify-center w-1/3 p-3"
        >
          <div class="font-semibold text-gray-700 tracking-wide text-center">
            Fri
          </div>
          <div class="mt-2 text-indigo-600 font-semibold text-center">
            $36
          </div>
          <div class="text-indigo-600 font-semibold text-center">USD</div>
        </div>
        <div
          class="border-t border-r border-gray-300 flex flex-col justify-center w-1/3 p-3"
        >
          <div class="font-semibold text-gray-700 tracking-wide text-center">
            Sat
          </div>
          <div class="mt-2 text-indigo-600 font-semibold text-center">
            $38
          </div>
          <div class="text-indigo-600 font-semibold text-center">USD</div>
        </div>
      </div>
      <div class="mt-3 text-xs text-gray-600">
        For example, on a day where few people are looking at your space, we’ll
        drop the price to attract more guests to book with you.
      </div>
    </div>

    <!-- second "slide" -->
    <div v-if="slide == 2">
      <div class="mt-3 font-semibold tracking-wide">
        You’re in control
      </div>
      <div class="mt-4 font-light leading-snug text-sm text-gray-800">
        When you turn on competitive pricing, you set the range you’re willing
        to charge each night. You can always turn off competitive pricing for
        specific days in your calendar.
      </div>
    </div>

    <!-- third "slide" -->
    <div v-if="slide == 3">
      <div class="mt-3 font-semibold tracking-wide">
        Start with a lower price to attract bookings
      </div>
      <div class="mt-4 font-light leading-snug text-sm text-gray-800">
        New hosts start with a lower price to attract their first few bookings.
        Hosts who set prices within 5% of price tips are nearly 4x more likely
        to get booked.
      </div>
    </div>

    <!-- footer with controls -->
    <div class="flex items-center justify-between mt-6" v-if="footerOn">
      <div
        class="rounded py-2 px-6 border"
        :class="{
          'border-gray-400 text-gray-400': slide == 1,
          'border-gray-600 text-gray-600 cursor-pointer': slide > 1,
        }"
        @click="decrement"
      >
        <svg
          class="h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"
          />
        </svg>
      </div>
      <div class="flex items-center justify-center">
        <div
          class="h-3 w-3 m-1 rounded-full"
          :class="{ 'bg-gray-600': slide == 1, 'bg-gray-400': slide != 1 }"
        ></div>
        <div
          class="h-3 w-3 m-1 rounded-full"
          :class="{ 'bg-gray-600': slide == 2, 'bg-gray-400': slide != 2 }"
        ></div>
        <div
          class="h-3 w-3 m-1 rounded-full"
          :class="{ 'bg-gray-600': slide == 3, 'bg-gray-400': slide != 3 }"
        ></div>
      </div>
      <div
        class="rounded py-2 px-6 border"
        :class="{
          'border-gray-400 text-gray-400': slide == 3,
          'border-gray-600 text-gray-600 cursor-pointer': slide < 3,
        }"
        @click="increment"
      >
        <svg
          class="h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.172 9l-6.071-6.071 1.414-1.414L20 10l-.707.707-7.778 7.778-1.414-1.414L16.172 11H0V9z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 1,
      footerOn: true,
    }
  },
  methods: {
    increment() {
      if (this.slide < 3) this.slide += 1
    },
    decrement() {
      if (this.slide > 1) this.slide -= 1
    },
  },
  mounted() {
    this.$root.$on('update-slide-pricing-help', slide => (this.slide = slide))

    this.$root.$on('update-slide-pricing-smart-help', smartPricing => {
      this.footerOn = smartPricing

      if (!this.footerOn) this.slide = 3
    })
  },
}
</script>
