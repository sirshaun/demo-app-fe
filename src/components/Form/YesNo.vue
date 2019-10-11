<template>
  <div>
    <div class="flex items-center">
      <div
        class="bg-transparent rounded-full border p-2 cursor-pointer"
        :class="{
          'bg-indigo-400 text-white border-gray-300': selected == 'no',
          'border-gray-500 text-gray-700': selected != 'no',
        }"
        @click="toggleRadio(false)"
      >
        <svg
          class="h-3 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
          />
        </svg>
      </div>
      <div
        class="ml-3 bg-transparent rounded-full border p-2 cursor-pointer"
        :class="{
          'bg-indigo-400 text-white border-gray-300': selected == 'yes',
          'border-gray-500 text-gray-700': selected != 'yes',
        }"
        @click="toggleRadio(true)"
      >
        <svg
          class="h-3 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
    </div>
    <div v-show="false">
      <input
        type="radio"
        :id="noOption.key"
        :value="noOption.text"
        :name="name"
        v-model="choice"
      />
      <input
        type="radio"
        :id="yesOption.key"
        :value="yesOption.text"
        :name="name"
        v-model="choice"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    initialChoice: { type: String, required: false },
    noOption: { type: Object, required: true },
    yesOption: { type: Object, required: true },
    updateChoice: { type: Function, required: true },
  },
  data() {
    return {
      choice: this.initialChoice,
      selected: '',
    }
  },
  computed: {
    yesSelected() {
      return this.choice == this.yesOption.text
    },
  },
  methods: {
    toggleRadio(yes) {
      if (yes) {
        this.choice = this.yesOption.text
      } else {
        this.choice = this.noOption.text
      }
    },
  },
  watch: {
    choice: {
      immediate: true,
      handler: function(choice) {
        this.updateChoice(choice)

        if (choice == this.yesOption.text) {
          this.selected = 'yes'
        } else {
          this.selected = 'no'
        }
      },
    },
  },
}
</script>
