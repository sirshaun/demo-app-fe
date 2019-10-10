<template>
  <div class="flex flex-col" :class="{ 'opacity-50': !proceedStepThree }">
    <div class="uppercase font-bold text-sm tracking-wider text-gray-600">
      Step 3
    </div>
    <div class="font-light text-2xl tracking-wide text-gray-800">
      Get ready for guests
    </div>
    <div class="font-light text-gray-800">
      Booking settings, calendar, price
    </div>
    <div class="mt-6" v-if="proceedStepThree">
      <a
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
        @click="continueToStepThree"
      >
        Continue
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photosUploaded: { type: Boolean, default: false },
    proceedStepThree: { type: Boolean, default: false },
    reviewStepThree: { type: Function, required: true },
    continueToStepThree: { type: Function, default: false },
  },
}
</script>
