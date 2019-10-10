<template>
  <div v-show="show">
    <div class="mt-4 px-10">
      <div class="flex content-center flex-wrap">
        <div
          class="cursor-pointer m-3 max-w-sm"
          style="height: 239.95px; width: 359.5px"
          v-for="(trip, index) in trips"
          :key="index"
        >
          <img
            class="h-full w-full rounded"
            :src="trip.imageUrl"
            :alt="trip.imageAlt"
          />
          <div class="mt-1 px-1">
            <p
              class="text-gray-600 text-xs uppercase font-light tracking-wide leading-none"
            >
              {{ trip.date }}
            </p>
            <p class="text-sm font-light leading-none">
              {{ trip.city }}
            </p>
            <p class="text-gray-600 text-xs font-light leading-none">
              {{ pluralize("reservation", trip.reservations, true) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pluralize from "pluralize";

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    trips: {
      type: Array,
      required: true
    }
  },
  methods: {
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive);
    }
  }
};
</script>
