<template>
  <div class="flex flex-wrap">
    <div class="w-1/2">
      <h1 class="font-semibold text-xl text-gray-900">
        Great progress, Shaun!
      </h1>
      <p>
        Now let’s get some details about your place so you can publish your
        listing.
      </p>

      <div class="clearfix mt-6">
        <div class="float-left">
          <div class="flex flex-col">
            <div class="font-light text-gray-800">
              Beds, bathrooms, amenities and more
            </div>
            <div>
              <a
                class="text-indigo-600 hover:opacity-50 cursor-pointer"
                @click="reviewStepOne"
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

      <hr class="border-gray-300 my-6" />

      <StepTwo
        :continue-to-step-two="continueToStepTwo"
        :review-step-two="reviewStepTwo"
      />

      <hr class="border-gray-300 my-6" />

      <StepThree
        :continue-to-step-three="continueToStepThree"
        :review-step-three="reviewStepThree"
      />

      <div class="mt-6" v-if="completed">
        <hr class="border-gray-300 my-6" />

        <a
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
          @click="publishListing"
        >
          Publish listing
        </a>
      </div>
    </div>
    <div class="w-1/2"></div>
  </div>
</template>

<script>
import StepTwo from './Checkpoint/StepTwo'
import StepThree from './Checkpoint/StepThree'

export default {
  components: { StepTwo, StepThree },
  props: {
    step: { type: Number, required: true },
    page: { type: Number, required: true },
    checkpoint: { type: Function, required: true },
  },
  computed: {
    headerText() {
      return this.$store.getters.status == 'complete'
        ? 'You’re ready to publish!'
        : 'Great progress!' // todo: add name
    },
    subHeaderText() {
      return this.$store.getters.status == 'complete'
        ? 'You’ll be able to welcome your first guest after you set your availability, which you can easily do after you hit publish.'
        : 'Now let’s get some details about your place so you can publish your listing.' // todo: add name
    },
    completed() {
      return this.$store.getters.status == 'complete'
    },
  },
  methods: {
    updateProgress(checkpoint) {
      this.$store.dispatch('updateProgress', {
        checkpoint: checkpoint,
      })
    },
    reviewStepOne() {
      this.checkpoint()
      this.$emit('review-step-one')
    },
    continueToStepTwo() {
      this.checkpoint()
      this.$emit('continue-to-step-two')
    },
    reviewStepTwo() {
      this.checkpoint()
      this.$emit('review-step-two')
    },
    continueToStepThree() {
      this.checkpoint()
      this.$emit('continue-to-step-three')
    },
    reviewStepThree() {
      this.checkpoint()
      this.$emit('review-step-three')
    },
    publishListing() {
      this.$emit('publish-listing')
    },
  },
  mounted() {
    this.updateProgress(true)
  },
  destroyed() {
    this.updateProgress(false)
  },
}
</script>
