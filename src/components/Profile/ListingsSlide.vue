<template>
  <Glider>
    <ul class="glide__slides">
      <li
        class="glide__slide max-w-sm"
        v-for="(listing, index) in listings"
        :key="index"
      >
        <img
          class="object-cover rounded-t-lg"
          :src="listing.imageUrl"
          style="height: 239.95px; width: 359.5px"
        />
        <!-- <div
                    class="bg-cover object-cover"
                    style="width: 293.333px; height: 195.55px; background-image: url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')"
                ></div> -->
        <div class="mt-1 px-1">
          <div class="flex items-baseline">
            <span
              class="inline-block bg-indigo-200 text-indigo-800 text-xs px-1 rounded-full uppercase font-semibold tracking-wide"
              v-if="listing.new"
              >New</span
            >
            <div
              class="text-gray-600 text-xs uppercase font-semibold tracking-wide ml-2"
            >
              {{ pluralize('bed', listing.beds, true) }}
              &bull;
              {{ pluralize('baths', listing.baths, true) }}
            </div>
          </div>
          <p class="font-semibold text-sm leading-tight truncate">
            {{ listing.title }}
          </p>
          <div class="flex items-center">
            <svg
              v-for="i in 5"
              :key="i"
              viewBox="0 0 24 24"
              :class="i <= listing.rating ? 'text-indigo-500' : 'text-gray-400'"
              class="h-3 w-3 fill-current"
            >
              <path
                d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
              />
            </svg>
            <span class="text-gray-600 text-xs ml-2">{{
              listing.reviewCount
            }}</span>
          </div>
        </div>
      </li>
    </ul>
  </Glider>
</template>

<script>
import Pluralize from 'pluralize'

import Glider from '@/components/Glider'

export default {
  components: { Glider },
  props: ['listings'],
  methods: {
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive)
    },
  },
}
</script>
