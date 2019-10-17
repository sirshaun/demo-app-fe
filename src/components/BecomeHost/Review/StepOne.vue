<template>
  <div
    class="flex justify-between mt-4 border-t border-gray-400 bg-gray-100"
    v-if="review"
  >
    <div
      class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 1,
        'hover:bg-gray-300': page != 1,
      }"
      @click="gotoPage(1)"
    >
      Place type
    </div>
    <div
      class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 2,
        'hover:bg-gray-300': page != 2,
      }"
      @click="gotoPage(2)"
    >
      Bedrooms
    </div>
    <div
      class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 3,
        'hover:bg-gray-300': page != 3,
      }"
      @click="gotoPage(3)"
    >
      Baths
    </div>
    <div
      class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 4 || page == 5,
        'hover:bg-gray-300': page != 4 || page != 5,
      }"
      @click="gotoPage(4)"
    >
      Location
    </div>
    <div
      class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 6,
        'hover:bg-gray-300': page != 6,
      }"
      @click="gotoPage(6)"
    >
      Amenities
    </div>
    <div
      class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
      :class="{
        'bg-gray-200': page == 7,
        'hover:bg-gray-300': page != 7,
      }"
      @click="gotoPage(7)"
    >
      Shared spaces
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
