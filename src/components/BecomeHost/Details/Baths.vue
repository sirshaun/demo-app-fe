<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900 px-4">
      How many bathrooms?
    </h1>
    <p class="px-4">
      Count bathrooms that don’t have a shower or bathtub as a half bathroom.
    </p>

    <div class="flex flex-wrap mt-6">
      <div class="w-full px-3">
        <div class="flex flex-wrap items-center mt-6">
          <div class="w-1/3 font-light leading-none">Bathrooms</div>
          <div class="w-1/3">
            <Counter
              :initial-counter="bathrooms"
              :func="updateNumberOfBathrooms"
              :min="1"
              :accuracy="0.5"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-6">
      <div class="w-full px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-type"
        >
          Are any of the bathrooms private?
        </label>
        <div
          :class="{ 'mb-3': index != privacyOptions.length - 1 }"
          v-for="(option, index) in privacyOptions"
          :key="index"
        >
          <input
            type="radio"
            :id="option.key"
            :value="option.text"
            name="privateBathroom"
            v-model="privateBathroom"
          />
          <label
            :for="option.key"
            class="ml-1 font-light inline-block w-11/12"
            >{{ option.text }}</label
          >
        </div>
        <p
          v-show="privateBathroomError"
          class="text-red-500 text-xs italic mt-px"
        >
          Please select an option
        </p>
      </div>
    </div>

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
  </div>
</template>

<script>
import Counter from "@/components/Form/Counter";
import Footer from "@/components/BecomeHost/Footer";

export default {
  components: { Counter, Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true }
  },
  data() {
    return {
      bathrooms: 1,
      privateBathroom: "",
      privacyOptions: [
        { key: "yes", text: "Yes" },
        { key: "no", text: "No, they’re shared" }
      ],
      privateBathroomError: false
    };
  },
  methods: {
    checkPrivacyOption() {
      this.privateBathroomError = this.privateBathroom == "";
    },
    updateNumberOfBathrooms(num) {
      this.bathrooms = num;
    },
    proceed() {
      this.checkPrivacyOption();

      if (!this.privateBathroomError) this.updateAndContinue();
    },
    updateListingState() {
      this.$store.dispatch("updateBaths", {
        bathrooms: this.bathrooms,
        private: this.privateBathroom
      });
    },
    updateAndContinue() {
      this.updateListingState();

      this.next();
    },
    updateAndExit() {
      this.updateListingState();

      this.checkpoint();
    },
    initializeValues() {
      let listing = this.$store.state.listing;

      if (listing.hasOwnProperty("bathrooms"))
        this.bathrooms = listing.bathrooms;

      if (listing.hasOwnProperty("private"))
        this.privateBathroom = listing.private;
    }
  },
  created() {
    this.initializeValues();
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.updateAndExit();
      }
    }
  }
};
</script>
