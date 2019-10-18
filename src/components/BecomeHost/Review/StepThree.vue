<template>
  <div
    class="flex justify-between mt-4 border-t border-gray-400 bg-gray-100"
    v-if="review"
  >
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 11,
        'hover:bg-gray-300': page != 11,
      }"
      @click="gotoPage(11)"
    >
      Guest requirements
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 12,
        'hover:bg-gray-300': page != 12,
      }"
      @click="gotoPage(12)"
    >
      House Rules
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 13,
        'hover:bg-gray-300': page != 13,
      }"
      @click="gotoPage(13)"
    >
      Your guest requirements
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 14,
        'hover:bg-gray-300': page != 14,
      }"
      @click="gotoPage(14)"
    >
      How guests will book
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 16,
        'hover:bg-gray-300': page != 16,
      }"
      @click="gotoPage(16)"
    >
      Questions
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 17,
        'hover:bg-gray-300': page != 17,
      }"
      @click="gotoPage(17)"
    >
      Availability settings
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 20,
        'hover:bg-gray-300': page != 20,
      }"
      @click="gotoPage(20)"
    >
      Calendar
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 21,
        'hover:bg-gray-300': page != 21,
      }"
      @click="gotoPage(21)"
    >
      Price
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 22,
        'hover:bg-gray-300': page != 22,
      }"
      @click="gotoPage(22)"
    >
      Welcome offer
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 23,
        'hover:bg-gray-300': page != 23,
      }"
      @click="gotoPage(23)"
    >
      Length-of-stay prices
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 24,
        'hover:bg-gray-300': page != 24,
      }"
      @click="gotoPage(24)"
    >
      Summary
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 25,
        'hover:bg-gray-300': page != 25,
      }"
      @click="gotoPage(25)"
    >
      Local laws
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: { type: Boolean, required: true },
    page: { type: Number, required: true },
    gotoPage: { type: Function, required: true },
  },
}
</script>
