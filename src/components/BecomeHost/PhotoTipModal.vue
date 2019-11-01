<template>
  <Modal @close-modal="dismiss" :show="modalOn">
    <div
      class="modal-container bg-white md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-3/4 pb-4"
    >
      <div class="modal-content py-4 text-left px-6">
        <div class="cursor-pointer z-50 mb-6" @click="dismiss">
          <img
            class="w-4 h-4 md:h-8 md:w-8"
            src="/img/ikonate/close.svg"
            alt=""
          />
        </div>

        <div class="">
          <div class="tracking-wide mb-6">
            <p class="text-2xl font-bold">
              Tips to get great photos of your space
            </p>
          </div>

          <div class="text-gray-900 font-light">
            <div class="flex items-start mb-2">
              <img src="/img/ikonate/camera-rear.svg" class="h-6 mr-2" />
              <span>
                Take photos in landscape mode to capture as much of your space
                as possible. Shoot from corners to add perspective.</span
              >
            </div>
            <div class="flex items-start mb-2">
              <img src="/img/ikonate/sun.svg" class="h-6 mr-2" />
              <span>
                Spaces look best in natural light. If it’s nighttime, turn on
                your lights. Avoid using flash.</span
              >
            </div>
            <div class="flex items-start mb-2">
              <img src="/img/ikonate/tv.svg" class="h-6 mr-2" />
              <span>
                Include all spaces your guest will access, like bedrooms,
                bathrooms, the kitchen, and living room.</span
              >
            </div>
            <p class="">
              Once you publish your listing, you’ll also be able to request
              professional photography.
            </p>
          </div>

          <div class="mt-6">
            <a
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              @click="dismiss"
            >
              Done
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
  },
  methods: {
    dismiss() {
      this.$emit('close-tips-modal')
    },
  },
}
</script>
