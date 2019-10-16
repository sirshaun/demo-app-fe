<template>
  <div
    class="fixed w-1/5 mt-32 p-6 border border-gray-400 bg-gray-100 rounded"
    style="top: 50px"
  >
    <div>
      <slot name="header"></slot>
    </div>

    <slot name="content"></slot>

    <!-- footer with controls -->
    <div class="flex items-center justify-between mt-6" v-if="showFooter">
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
          v-for="(e, i) in slides"
          class="h-3 w-3 m-1 rounded-full"
          :class="{
            'bg-gray-600': active(i + 1),
            'bg-gray-400': !active(i + 1),
          }"
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
  props: {
    slides: { type: Number, default: 3 },
    initSlide: { type: Number, default: 1 },
    showFooter: { type: Boolean, default: true },
  },
  data() {
    return {
      slide: this.initSlide,
      footerOn: true,
    }
  },
  methods: {
    increment() {
      if (this.slide < this.slides) this.slide += 1
    },
    decrement() {
      if (this.slide > 1) this.slide -= 1
    },
    active(slide) {
      return this.slide == slide
    },
  },
  watch: {
    initSlide: {
      immediate: true,
      handler: function(initSlide) {
        this.slide = initSlide
      },
    },
    slide: {
      immediate: true,
      handler: function(slide) {
        this.$emit('update-slide-number', slide)
      },
    },
  },
}
</script>
