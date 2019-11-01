<template>
  <div class="flex items-center">
    <svg
      class="h-6 md:h-8 mr-4 text-indigo-500 fill-current"
      :class="{
        'opacity-25 cursor-default': floor,
        'cursor-pointer': !floor,
      }"
      @click="decrement"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm5-9v2H5V9h10z"
      />
    </svg>
    <span class="font-thin">{{ counter }}</span>
    <svg
      class="h-6 md:h-8 ml-4 text-indigo-500 fill-current"
      :class="{
        'opacity-25 cursor-default': ceil,
        'cursor-pointer': !ceil,
      }"
      @click="increment"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    initialCounter: { type: Number, required: true },
    func: { type: Function, required: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    accuracy: { type: Number, default: 1 },
    incrementDisabled: { type: Boolean, default: false },
  },
  data() {
    return {
      counter: this.initialCounter < this.min ? this.min : this.initialCounter,
    }
  },
  methods: {
    increment() {
      if (this.counter < this.max) this.counter += this.accuracy
    },
    decrement() {
      if (this.counter > this.min) this.counter -= this.accuracy
    },
  },
  computed: {
    floor() {
      return this.counter == this.min
    },
    ceil() {
      if (this.incrementDisabled) return true

      return this.counter == this.max
    },
  },
  watch: {
    counter: {
      immediate: false,
      handler: function(counter) {
        this.func(counter)
      },
    },
  },
}
</script>
