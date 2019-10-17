<template>
  <div
    class="flex justify-between mt-4 border-t border-gray-400 bg-gray-100"
    v-if="review"
  >
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 8,
        'hover:bg-gray-300': page != 8,
      }"
      @click="gotoPage(8)"
    >
      Photos
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 9,
        'hover:bg-gray-300': page != 9,
      }"
      @click="gotoPage(9)"
    >
      Description
    </div>
    <div
      class="w-1/3 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 10,
        'hover:bg-gray-300': page != 10,
      }"
      @click="gotoPage(10)"
    >
      Title
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
