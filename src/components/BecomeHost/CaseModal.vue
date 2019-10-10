<template>
  <Modal @close-modal="dismiss" :show="true">
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

        <div class="pl-4 md:pl-8">
          <div class="tracking-wide mb-6">
            <p class="text-2xl font-bold leading-snug mb-6">
              This listing will go through review
            </p>

            <p class="font-light leading-snug mb-4">
              A Casa particular on Airbnb should be a licensed hospitality
              business and will go through review to make sure it meets our
              criteria. This helps listings appear in the right searches and
              lets guests know what to expect.
            </p>

            <p class="font-light leading-snug mb-4">
              If that doesn’t sound like this property, change the property
              type.
              <a class="text-indigo-600 hover:text-indigo-200 cursor-pointer"
                >Learn more</a
              >
            </p>

            <hr class="border-gray-300 my-6" />

            <div class="flex flex-wrap">
              <div
                class="w-1/2 text-sm font-light tracking-wide"
                v-for="(type, index) in types"
                :key="index"
              >
                {{ type }}
              </div>
            </div>
          </div>

          <div class="mt-6">
            <a
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
              @click="dismiss"
            >
              Got it
            </a>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: { Modal },
  data() {
    return {
      types: [
        "Aparthotel",
        "Bed & Breakfast",
        "Boutique Hotel",
        "Heritage Hotel (India)",
        "Hotel",
        "Ryokan (Japan)",
        "Resort",
        "Casa particular",
        "Nature Lodge",
        "Condohotel",
        "Pension (Korea)",
        "Minsu  (Taiwan)",
        "Hostel",
        "Pousada",
        "Serviced Apartment",
        "Timeshare"
      ]
    };
  },
  methods: {
    dismiss() {
      this.$emit("close-case-modal");
    }
  }
};
</script>
