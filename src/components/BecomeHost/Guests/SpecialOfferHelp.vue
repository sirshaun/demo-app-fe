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
          Why add a special offer?
        </div>
        <div class="mt-4 font-light leading-snug text-sm text-gray-800">
          This will help attract your first guests and help get your first
          reviews. Once you get 3 reviews, you’ll get a star rating in search
          results, which will help your listing stand out. New listings that get
          booked and reviewed in the first month appear more often in search
          results and get an average of 3.6x more bookings in their first 3
          months.
          <!-- tooltip -->
        </div>
      </div>

      <!-- second "slide" -->
      <div v-if="slide == 2">
        <div class="mt-3 font-semibold tracking-wide">
          We’ll share your offer
        </div>
        <div class="mt-4 font-light leading-snug text-sm text-gray-800">
          We’ll let guests who are searching in your area know that they can
          save 20% if they book your home. This can help get more eyes on your
          listing, but only the first 3 guests who book will be eligible for the
          offer.
        </div>
      </div>

      <!-- third "slide" -->
      <div v-if="slide == 3">
        <div class="mt-3 font-semibold tracking-wide">
          Start with a lower price to attract bookings
        </div>
        <div class="mt-4 font-light leading-snug text-sm text-gray-800">
          The offer will be available to 3 guests. That way, you can get 3
          reviews and your star rating. After 3 guests have claimed your offer,
          it won’t be valid anymore. If no-one claims the offer, it’ll
          automatically expire after 30 days.
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
}
</script>
