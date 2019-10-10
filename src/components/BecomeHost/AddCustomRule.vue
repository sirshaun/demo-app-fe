<template>
  <div class="flex flex-wrap my-3">
    <div class="w-full">
      <span class="flex items-center">
        <input
          class="appearance-none block w-4/5 h-12 bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          id="grid-additional-rules"
          type="text"
          placeholder="Quiet hours? No shoes in the house?"
          v-model="customRule"
          @keyup.enter="addRule"
        />
        <button
          class="w-1/5 h-12 bg-white text-gray-700 text-lg tracking-wider font-semibold py-2 px-4 border border-gray-200"
          @click="addRule"
        >
          Add
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addCustomRule: { type: Function, required: true },
  },
  data() {
    return {
      customRule: '',
    }
  },
  methods: {
    addRule() {
      if (this.customRule != '') {
        this.addCustomRule(this.customRule)
        this.customRule = ''
      }
    },
  },
}
</script>
