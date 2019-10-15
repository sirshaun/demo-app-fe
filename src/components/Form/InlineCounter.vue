<template>
  <div class="border border-gray-500 rounded p-2 ">
    <div class="flex justify-between">
      <div class="flex items-center" @click="getFocus">
        <input
          class="w-2 flex-grow appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          id="grid-counter"
        />
        <span class="font-light text-gray-600">{{ text }}</span>
      </div>
      <div class="flex items-center">
        <div class="border-l border-gray-500 px-4">
          <img class="h-8" src="/img/ikonate/minus-gray-600.svg" />
        </div>
        <div class="border-l border-gray-500 pl-4 pr-2">
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
    func: { type: Function, required: true },
  },
  methods: {
    getFocus() {
      document.getElementById('grid-counter').focus()
    },
  },
}
</script>
