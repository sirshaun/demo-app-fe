<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap">
      <h1 class="font-semibold text-2xl text-gray-900">
        Add photos to your listing
      </h1>
      <a
        class="flex items-center text-indigo-600 hover:text-indigo-400 ml-10 cursor-pointer"
        @click="toggleModal"
      >
        <svg
          class="h-5 mr-2 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M7 13.33a7 7 0 1 1 6 0V16H7v-2.67zM7 17h6v1.5c0 .83-.67 1.5-1.5 1.5h-3A1.5 1.5 0 0 1 7 18.5V17zm2-5.1V14h2v-2.1a5 5 0 1 0-2 0z"
          />
        </svg>
        <span>Photo tips</span>
      </a>
    </div>

    <div class="text-sm font-light tracking-wide text-gray-900">
      Photos help guests imagine staying in your place. You can start with one
      and add more after you publish.
    </div>

    <form
      :action="uploadUrl"
      class="dropzone border-dashed border-2 border-gray-300 rounded p-2"
      id="my-awesome-dropzone"
    >
      <div
        class="flex items-center justify-center w-full dz-message cursor-pointer"
        style="height: 350px; background-image: url('/img/collage.png')"
      >
        <div class="flex flex-col items-center">
          <div class="">
            <a
              class="flex items-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              <svg
                class="h-6 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <span>Upload photos</span>
            </a>
          </div>
          <div class="text-gray-600 font-light tracking-wide mt-4">
            or drag them in
          </div>
        </div>
      </div>
    </form>

    <!-- <hr class="border-gray-300 my-6" /> -->

    <!-- TODO: Add carousel to preview the images that have been uploaded -->

    <Footer
      :back="back"
      :next="updateAndContinue"
      :checkpoint="checkpoint"
      :next-btn-text="nextBtnText"
    />

    <PhotoTipModal
      @close-tips-modal="toggleModal"
      v-if="modalOn"
      :modal-on="modalOn"
    />
  </div>
</template>

<script>
import Dropzone from "dropzone";

import PhotoTipModal from "@/components/BecomeHost/PhotoTipModal";
import Footer from "@/components/BecomeHost/Footer";

export default {
  components: { PhotoTipModal, Footer },
  props: {
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    uploadUrl: { type: String, required: true },
    exitBtnClicked: { type: Boolean, required: true }
  },
  data() {
    return {
      uploaded: false,
      modalOn: false,
      photos: []
    };
  },
  computed: {
    nextBtnText() {
      return this.photos.length ? "Done" : "Skip for now";
    }
  },
  methods: {
    back() {
      this.checkpoint();
    },
    toggleModal() {
      this.modalOn = !this.modalOn;
    },
    updateListingState() {
      /*this.$store.dispatch('updatePhotos', {
				photos: this.photos,
			})*/
    },
    updateAndContinue() {
      this.updateListingState();

      this.next();
    },
    updateAndExit() {
      this.updateListingState();

      this.checkpoint();
    }
  },
  mounted() {
    Dropzone.options.myAwesomeDropzone = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      paramName: "file",
      maxFilesize: 10,
      success: (file, response) => {
        this.photos.push({ url: response.url });
      },
      previewsContainer: false
    };
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint();
      }
    }
  }
};
</script>
