<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      Review Workcation’s guest requirements
    </h1>
    <p class="font-light tracking-wide">
      Workcation has requirements that all guests must meet before they book.
    </p>

    <p class="mt-10 font-light text-xl">All Workcation guests must provide:</p>

    <div class="flex items-center mt-4">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4">Email address</span>
    </div>
    <div class="flex items-center mt-1">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4"
        >Confirmed phone number</span
      >
    </div>
    <div class="flex items-center mt-1">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4"
        >Payment information</span
      >
    </div>

    <hr class="border-gray-300 my-8" />

    <p class="mt-10 font-light text-xl">
      Before booking your home, each guest must:
    </p>
    <div class="flex items-center mt-4">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4"
        >Agree to your House Rules</span
      >
    </div>
    <div class="flex items-center mt-1">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4"
        >Message you about their trip</span
      >
    </div>
    <div class="flex items-center mt-1">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4"
        >Let you know how many guests are coming</span
      >
    </div>
    <div class="flex items-center mt-1">
      <svg
        class="h-5 text-indigo-600 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
      <span class="font-light text-lg text-gray-900 ml-4"
        >Confirm their check-in time if they’re arriving within 2 days</span
      >
    </div>

    <hr class="border-gray-300 my-8" />

    <a
      class="text-indigo-600 cursor-pointer hover:text-indigo-200"
      @click="toggleAdditionalRequirements"
      v-show="!additionalRequirementsOn"
      >Add additional requirements</a
    >
    <AdditionalRequirements
      :update-additional-requirements="updateAdditionalRequirements"
      v-if="additionalRequirementsOn"
    />

    <Footer :back="back" :next="next" :checkpoint="checkpoint" />
  </div>
</template>

<script>
import AdditionalRequirements from '@/components/BecomeHost/AdditionalRequirements'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { AdditionalRequirements, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      checkedAdditionalRequirements: [],
      additionalRequirementsOn: false,
    }
  },
  methods: {
    updateAdditionalRequirements(additionalRequirements) {
      this.checkedAdditionalRequirements = additionalRequirements
    },
    toggleAdditionalRequirements() {
      this.additionalRequirementsOn = !this.additionalRequirementsOn
    },
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint()
      },
    },
  },
}
</script>
