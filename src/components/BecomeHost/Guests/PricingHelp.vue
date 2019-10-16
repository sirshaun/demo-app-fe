<template>
  <Slider
    :slides="3"
    :init-slide="slide"
    :show-footer="footerOn"
    @update-slide-number="updateSlide"
  >
    <template v-slot:header>
      <svg
        class="h-8 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M7 13.33a7 7 0 1 1 6 0V16H7v-2.67zM7 17h6v1.5c0 .83-.67 1.5-1.5 1.5h-3A1.5 1.5 0 0 1 7 18.5V17zm2-5.1V14h2v-2.1a5 5 0 1 0-2 0z"
        />
      </svg>
    </template>

    <template v-slot:content>
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
          For example, on a day where few people are looking at your space,
          we’ll drop the price to attract more guests to book with you.
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
          New hosts start with a lower price to attract their first few
          bookings. Hosts who set prices within 5% of price tips are nearly 4x
          more likely to get booked.
        </div>
      </div>
    </template>
  </Slider>
</template>

<script>
import Slider from '@/components/Slider'

export default {
  components: { Slider },
  data() {
    return {
      slide: 1,
      footerOn: true,
    }
  },
  methods: {
    updateSlide(slide) {
      this.slide = slide
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
