<template>
  <div class="flex content-center flex-wrap">
    <div
      class="relative cursor-pointer m-3"
      style="height: 239.95px; width: 359.5px"
      v-for="(group, index) in list"
      :key="index"
    >
      <router-link :to="'/wishlists/' + group.id">
        <img
          class="tile-img w-full h-full"
          :src="group.imageUrl"
          :alt="group.imageAlt"
        />
        <div class="absolute inset-x-0 bottom-0 max-w-md">
          <div class="text-white text-md font-semibold tracking-wide mx-4 my-2">
            {{ group.name }}<br />
            {{ pluralize("stay", group.stays, true) }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Pluralize from "pluralize";

export default {
  props: {
    list: {
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
