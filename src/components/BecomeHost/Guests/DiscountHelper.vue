<template>
  <Slider
    :slides="1"
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
          Discount for longer stays
        </div>
        <div class="mt-4 font-light leading-snug text-sm text-gray-800">
          <p>
            To encourage longer stays, some hosts set a weekly or monthly
            discount. If you want your listing to appear in searches for
            reservations of 28 nights or more, set a monthly discount.
          </p>
          <p class="mt-4">
            Weekly discounts will apply to any reservation of 7 to 27 nights.
          </p>
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
      footerOn: false,
    }
  },
  methods: {
    updateSlide(slide) {
      this.slide = slide
    },
  },
}
</script>
