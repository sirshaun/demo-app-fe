<template>
  <div>
    <div class="flex flex-col" v-if="!stepTwoComplete">
      <div class="uppercase font-bold text-sm tracking-wider text-gray-600">
        Step 2
      </div>
      <div class="font-light text-2xl tracking-wide text-gray-800">
        Set the scene
      </div>
      <div class="font-light text-gray-800">
        Set the Photos, short description, title
      </div>
      <div class="mt-6">
        <a
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          @click="continueToStepTwo"
        >
          {{ btnText }}
        </a>
      </div>
    </div>

    <div class="clearfix mt-6" v-if="stepTwoComplete">
      <div class="float-left">
        <div class="flex flex-col">
          <div class="font-light text-gray-800">
            Photos, short description, title
          </div>
          <div>
            <a
              class="text-indigo-600 hover:opacity-50 cursor-pointer"
              @click="reviewStepTwo"
              >Change</a
            >
          </div>
        </div>
      </div>
      <div class="float-right">
        <svg
          class="h-10 text-indigo-700 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviewStepTwo: { type: Function, required: true },
    continueToStepTwo: { type: Function, required: true },
  },
  computed: {
    stepTwoComplete() {
      return this.$store.getters.stepTwoComplete
    },
    btnText() {
      return this.$store.getters.photosUploaded ? 'Continue' : 'Add photos'
    },
  },
}
</script>
