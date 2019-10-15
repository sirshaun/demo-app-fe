<template>
  <div class="border border-gray-500 rounded p-2 ">
    <div class="flex justify-between">
      <div class="flex items-center" @click="getFocus">
        <input
          class="ml-2 w-5 flex-grow appearance-none bg-transparent border-none text-gray-700 text-lg leading-tight focus:outline-none"
          type="number"
          :id="'grid-counter-' + id"
          v-model="count"
        />
        <span class="ml-1 font-light text-gray-600">{{ text }}</span>
      </div>
      <div class="flex items-center">
        <div
          class="border-l border-gray-500 px-4 cursor-pointer"
          @click="decrement"
        >
          <img class="h-8" src="/img/ikonate/minus-gray-600.svg" />
        </div>
        <div
          class="border-l border-gray-500 pl-4 pr-2 cursor-pointer"
          @click="increment"
        >
          <img class="h-8" src="/img/ikonate/plus-gray-600.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    id: { type: String, required: true },
    func: { type: Function, required: true },
    initialCount: { type: Number, default: 0 },
  },
  data() {
    return {
      count: this.initialCount,
    }
  },
  methods: {
    increment() {
      if (this.count == '') this.count = 0

      this.count += 1
    },
    decrement() {
      if (this.count == '') this.count = 0

      if (this.count > 0) this.count -= 1
    },
    getFocus() {
      document.getElementById('grid-counter-' + this.id).focus()
    },
  },
  watch: {
    count: {
      immediate: true,
      handler: function(count) {
        if (count == 0) this.count = ''
        this.func(count)
      },
    },
  },
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
