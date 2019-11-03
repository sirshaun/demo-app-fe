<template>
  <div class="flex relative">
    <div class="flex" style="height: 600px" v-if="complete">
      <img class="w-full h-auto" src="/img/undraw_travelers_qlt1.svg" />
    </div>

    <div
      class="absolute flex items-center justify-between bg-gray-100 border border-gray-400 rounded shadow-xl p-6 h-32 w-4/6"
      :style="insetY"
    >
      <div class="flex flex-col">
        <div class="font-thin">Family home</div>
        <router-link
          :to="'/listing/' + listing_id + '/preview'"
          target="_blank"
        >
          <a class="mt-1 text-indigo-600 hover:text-indigo-200">
            Preview
          </a>
        </router-link>
      </div>
      <div>
        <img class="h-20" :src="listingImage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listing_id: { type: Number },
    photos: {
      type: Array,
      default: () => {
        return []
      },
    },
    complete: { type: Boolean },
    previewOfListing: { type: Function },
  },
  computed: {
    insetY() {
      if (this.complete) return { bottom: '-150px' }

      return { bottom: '-750px' }
    },
    listingImage() {
      if (this.photos.length) {
        return this.cleanImagePath(this.photos[0])
      }

      return '/img/undraw_for_sale_viax.svg'
    },
  },
  methods: {
    cleanImagePath(path) {
      if (process.env.VUE_APP_ENV == 'local') {
        var arr = path.split('/')

        return '/stock/' + arr[arr.length - 1]
      }

      return path
    },
  },
}
</script>
