<template>
  <div class="my-8">
    <div class="flex justify-between">
      <div class="flex items-center">
        <span class="font-light">{{ option.text }}</span>
        <span v-if="helpAvailable" @click="toggleTooltip">
          <svg
            class="ml-2 h-4 fill-current cursor-pointer"
            :class="{
              'text-indigo-200': tooltipOn,
              'text-indigo-400': !tooltipOn,
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
            />
          </svg>
        </span>
        <Tooltip
          :tip="option.help"
          :show="tooltipOn"
          :toggle-tooltip="toggleTooltip"
          v-if="tooltipOn"
        />
      </div>
      <div>
        <YesNo
          name="children"
          :initial-choice="choice"
          :yes-option="{ key: 'yes', text: 'Yes' }"
          :no-option="{ key: 'no', text: 'No' }"
          :update-choice="updateChoice"
        />
      </div>
    </div>
    <div
      class="mt-1 text-sm text-indigo-500 hover:text-indigo-200 tracking-wide cursor-pointer"
      v-if="explainWhyOn"
      @click="toggleExplanationModal"
    >
      Explain why
    </div>
    <p v-show="error" class="text-red-500 text-xs italic mt-px">
      Please select an option
    </p>

    <ExplanationModal
      :modal-on="explanationModalOn"
      :update-explanation="updateExplanation"
      v-if="explanationModalOn"
      @close-explanation-modal="toggleExplanationModal"
    />
  </div>
</template>

<script>
import ExplanationModal from './ExplanationModal'
import YesNo from '@/components/Form/YesNo'
import Tooltip from '@/components/Tooltip'

export default {
  components: { YesNo, ExplanationModal, Tooltip },
  props: {
    initialChoice: { type: String, required: false },
    initialExplanation: { type: String, required: false },
    option: { type: Object, required: false },
    index: { type: Number, required: true },
    nextBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      choice: this.initialChoice,
      explanation: this.initialExplanation,
      explainWhyOn: false,
      explanationModalOn: false,
      tooltipOn: false,
      error: false,
    }
  },
  computed: {
    helpAvailable() {
      return this.option.hasOwnProperty('help')
    },
    explanationOption() {
      return this.option.hasOwnProperty('explain')
    },
  },
  methods: {
    toggleExplanationModal() {
      this.explanationModalOn = !this.explanationModalOn
    },
    toggleTooltip() {
      this.tooltipOn = !this.tooltipOn
    },
    updateChoice(choice) {
      this.choice = choice
    },
    updateExplanation(explanation) {
      this.explanation = explanation
    },
  },
  watch: {
    nextBtnClicked: {
      immediate: true,
      handler: function(nextBtnClicked) {
        if (this.choice == '') {
          this.error = true
          this.$emit('input-error')
        } else {
          this.error = false
        }
      },
    },
    choice: {
      immediate: true,
      handler: function(choice) {
        if (choice != '' && this.error) {
          this.error = false
        }

        if (this.choice == 'No') {
          if (this.explanationOption && !this.explainWhyOn) {
            this.explainWhyOn = true
          }
        } else if (this.explainWhyOn) {
          this.explainWhyOn = false
        }

        this.$emit('update-choice', this.index, this.choice)
      },
    },
    explanation: {
      immediate: false,
      handler: function(explanation) {
        this.$emit('update-choice-reason', this.index, this.explanation)
      },
    },
  },
}
</script>
