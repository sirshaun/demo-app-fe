<template>
  <div class="mt-6">
    <DefaultRule
      v-for="(option, index) in options"
      :key="index"
      :index="index"
      :option="option"
      :next-btn-clicked="nextBtnClicked"
      @update-choice="updateRuleChoice"
      @update-choice-reason="updateRuleChoiceExplanation"
      @input-error="errorFound"
    />
  </div>
</template>

<script>
import DefaultRule from './DefaultRule'

export default {
  components: { DefaultRule },
  props: {
    nextBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      rules: [],
      options: [
        {
          text: 'Suitable for children (2-12)',
          help:
            'You can say your listing isn’t suitable for infants or children if there are features that are dangerous for children or there’s a risk of property damage. If you decide to restrict guests with infants or children from booking, add an explanation so guests can understand why your listing isn’t suitable for their trip. Learn More',
          explain: {
            title: 'Explain why your listing isn’t suitable for children',
            sub:
              'What features of your space might be dangerous to children or easily damaged?',
            placeholder:
              "Example: The second floor staircase doesn't have handrails.",
          },
        },
        {
          text: 'Suitable for infants (under 2 years)',
          help:
            'You can say your listing isn’t suitable for infants or children if there are features that are dangerous for children or there’s a risk of property damage. If you decide to restrict guests with infants or children from booking, add an explanation so guests can understand why your listing isn’t suitable for their trip. Learn More',
          explain: {
            title: 'Explain why your listing isn’t suitable for children',
            sub:
              'What features of your space might be dangerous to children or easily damaged?',
            placeholder:
              "Example: The second floor staircase doesn't have handrails.",
          },
        },
        {
          text: 'Suitable for pets',
          help:
            "You can limit guests from bringing pets, but assistance animals—for example, guide dogs—aren’t considered pets. You have to reasonably accommodate reservations where a guest might bring an assistance animal, even if your listing or House Rules state 'no pets'. Learn More",
        },
        {
          text: 'Smoking allowed',
        },
        {
          text: 'Events or parties allowed',
        },
      ],
    }
  },
  methods: {
    updateRuleChoice(index, choice) {
      if (typeof this.rules[index] == 'undefined') {
        this.rules[index] = { text: this.options[index].text, choice }
      } else {
        this.rules[index].choice = choice
      }

      this.updateRules()
    },
    updateRuleChoiceExplanation(index, explanation) {
      this.rules[index].explanation = explanation

      this.updateRules()
    },
    updateRules() {
      this.$emit('update-checked-rules', this.rules)
    },
    errorFound() {
      this.$emit('input-error')
    },
  },
}
</script>
