<template>
  <div class="flex relative">
    <div class="flex" style="height: 600px" v-if="complete">
      <img class="w-full h-auto" src="/img/undraw_travelers_qlt1.svg" />
    </div>

    <div
      class="absolute flex items-center justify-between bg-gray-100 border border-gray-400 rounded shadow-xl p-6 h-32 w-4/6"
      :style="insetY"
    >
      <div class="flex flex-col">
        <div class="font-thin">Family home</div>
        <a
          class="mt-1 text-indigo-600 cursor-pointer hover:text-indigo-200"
          @click="previewOfListing"
        >
          Preview
        </a>
      </div>
      <div>
        <img class="h-20" src="/img/undraw_for_sale_viax.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    complete: { type: Boolean },
    previewOfListing: { type: Function },
  },
  computed: {
    insetY() {
      if (this.complete) return { bottom: '-150px' }

      return { bottom: '-750px' }
    },
  },
}
</script>
