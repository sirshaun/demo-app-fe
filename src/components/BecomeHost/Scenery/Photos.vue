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

    <hr class="border-gray-300 my-6" v-if="previewAvailable" />

    <PreviewSlide
      :images="photos"
      :func="removePhoto"
      v-if="previewAvailable"
      class="mb-20"
    />

    <Footer
      :back="back"
      :next="updateAndContinue"
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
import Dropzone from 'dropzone'

import PhotoTipModal from '@/components/BecomeHost/PhotoTipModal'
import PreviewSlide from '@/components/BecomeHost/PreviewSlide'
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { PhotoTipModal, PreviewSlide, Footer },
  props: {
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    uploadUrl: { type: String, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      uploaded: false,
      modalOn: false,
      photos: [],
    }
  },
  computed: {
    nextBtnText() {
      return this.photos.length ? 'Done' : 'Skip for now'
    },
    previewAvailable() {
      return this.photos.length
    },
  },
  methods: {
    back() {
      this.checkpoint()
    },
    removePhoto(index) {
      this.photos.splice(index, 1)
    },
    toggleModal() {
      this.modalOn = !this.modalOn
    },
    updateListingState() {
      this.$store.dispatch('updatePhotos', {
        photos: this.photos,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 2,
        page: step ? 9 : 8,
      })
    },
    updateAndContinue() {
      this.updateListingState()

      this.updateProgress(true)

      this.next()
    },
    updateAndExit() {
      this.updateListingState()

      this.updateProgress(false)

      this.checkpoint()
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('photos')) this.photos = listing.photos
    },
  },
  created() {
    Dropzone.options.myAwesomeDropzone = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      paramName: 'file',
      maxFilesize: 10,
      success: (file, response) => {
        // NOTE: success seems to run twice with the same paylod
        // meaning image uris are added twice, check if image doesn't
        // already exist before adding it
        response.uris.forEach(e => {
          if (this.photos.indexOf(e) == -1) this.photos.push(e)
        })
      },
      previewsContainer: false,
      uploadMultiple: true,
    }

    this.initializeValues()
  },
  watch: {
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint()
      },
    },
  },
}
</script>
