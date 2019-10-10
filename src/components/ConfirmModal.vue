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

        <div class="pl-4 md:pl-8">
          <div class="tracking-wide mb-6">
            <p class="font-light">
              {{ message }}
            </p>
          </div>

          <div class="mt-2">
            <a
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              @click="confirm"
            >
              Yes, delete
            </a>
            <a
              class="ml-4 bg-transparent text-indigo-700 py-1 px-2 border border-indigo-500 rounded cursor-pointer"
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
import Modal from "./Modal";

export default {
  components: { Modal },
  props: {
    name: { type: String },
    deleteUrl: { type: String, required: true },
    redirectRoute: { type: String, required: true },
    modalOn: { type: Boolean, required: true }
  },
  computed: {
    message() {
      return typeof this.name == "undefined"
        ? "Proceed with delete action?"
        : "Are you sure you want to delete " + this.name + "?";
    }
  },
  methods: {
    cancel() {
      this.$emit("close-confirm-modal");
    },
    confirm() {
      this.$http.delete(this.deleteUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      this.$router.push(this.redirectRoute);
    }
  }
};
</script>
