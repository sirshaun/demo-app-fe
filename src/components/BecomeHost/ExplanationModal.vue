<template>
  <Modal
    @close-modal="cancel"
    :show="modalOn"
    :prevent-background-scrolling="false"
  >
    <div
      class="modal-container bg-white md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-3/4 pb-4"
    >
      <div class="modal-content py-4 text-left px-6">
        <div class="cursor-pointer z-50 mb-6" @click="cancel">
          <svg
            class="h-6 text-gray-700 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </div>

        <div class="">
          <div class="leading-normal mb-6">
            <p class="text-2xl font-bold">
              Explain why your listing isn’t suitable for children
            </p>
            <p class="text-sm font-light">
              What features of your space might be dangerous to children or
              easily damaged?
            </p>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full">
              <textarea
                rows="3"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none"
                id="grid-description"
                placeholder="Example: The second floor staircase doesn't have handrails."
                v-model="explanation"
              ></textarea>
            </div>
          </div>

          <div class="mt-10">
            <a
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              @click="confirm"
            >
              Done
            </a>
            <a
              class="ml-4 bg-transparent text-indigo-700 py-2 px-4 border border-indigo-500 rounded cursor-pointer"
              @click="cancel"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  components: { Modal },
  props: {
    modalOn: { type: Boolean, required: true },
    updateExplanation: { type: Function, required: true },
  },
  data() {
    return {
      explanation: '',
    }
  },
  methods: {
    cancel() {
      this.$emit('close-explanation-modal')
    },
    confirm() {
      this.updateExplanation(this.explanation)

      this.$emit('close-explanation-modal')
    },
  },
}
</script>
