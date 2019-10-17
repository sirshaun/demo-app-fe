<template>
  <div>
    <nav class="nav-float-alt pt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-white pl-6">
          <router-link to="/">
            <img class="h-6" src="/img/logo-mini.svg" alt="Workcation" />
          </router-link>
          <div class="ml-6 text-gray-900 font-light text-lg tracking-wide">
            {{ header }}
          </div>
        </div>
        <div
          class="font-light text-indigo-600 tracking-wide text-lg cursor-pointer pr-6 hover:text-indigo-400"
          @click="saveAndExit"
          v-if="showSaveAndExitBtn"
        >
          Save and Exit
        </div>
      </div>
      <StepOne
        :goto-page="gotoPage"
        :page="page"
        :review="review"
        v-if="step == 1"
      />
      <StepTwo
        :goto-page="gotoPage"
        :page="page"
        :review="review"
        v-if="step == 2"
      />
      <StepThree
        :goto-page="gotoPage"
        :page="page"
        :review="review"
        v-if="step == 3"
      />
      <div class="w-full" :class="{ 'absolute bottom-0 left-0': !review }">
        <div class="h-1 relative bg-gray-200" v-if="!checkpoint">
          <span
            :style="{ width: progress }"
            class="block h-full relative overflow-hidden bg-indigo-400"
          ></span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import StepOne from './Review/StepOne'
import StepTwo from './Review/StepTwo'
import StepThree from './Review/StepThree'

export default {
  components: { StepOne, StepTwo, StepThree },
  props: {
    header: { type: String, required: true },
    saveAndExit: { type: Function, required: true },
    showSaveAndExitBtn: { type: Boolean, required: true },
    checkpoint: { type: Boolean, required: true },
    review: { type: Boolean, required: true },
    step: { type: Number, required: true },
    page: { type: Number, required: true },
    progress: { type: String, required: true },
    gotoPage: { type: Function, required: true },
  },
}
</script>
