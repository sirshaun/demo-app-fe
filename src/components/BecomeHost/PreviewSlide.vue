<template>
  <Glider>
    <ul class="glide__slides">
      <li
        class="glide__slide max-w-sm relative"
        v-for="(image, index) in images"
        :key="index"
      >
        <div
          class="absolute top-0 right-0 m-2 border rounded-full p-2 text-white cursor-pointer hover:bg-white hover:text-gray-600 hover:shadow-lg"
          @click="func(index)"
        >
          <svg
            class="h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </div>
        <img
          class="object-cover rounded"
          :src="cleanImagePath(image)"
          style="height: 239.95px; width: 359.5px"
        />
      </li>
    </ul>
  </Glider>
</template>

<script>
import Pluralize from 'pluralize'

import Glider from '@/components/Glider'

export default {
  components: { Glider },
  props: {
    images: { type: Array, required: true },
    func: { type: Function, required: true },
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
