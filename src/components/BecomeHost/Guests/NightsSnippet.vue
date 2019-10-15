<template>
  <div class="mt-32 px-4">
    <div class="w-3/5">
      <div class="h-16 relative bg-gray-200">
        <div
          class="text-gray-500"
          :class="{ 'ml-14': initMinClasses, 'ml-22': !initMinClasses }"
        >
          {{ pluralize('night', minStay, true) }}
        </div>
        <div
          class="h-6 border-r-2 border-gray-400"
          :class="{ 'w-2/12': initMinClasses, 'w-3/12': !initMinClasses }"
        ></div>
        <span
          style="width: 75%"
          class="block h-full relative overflow-hidden rounded-full fade-right-grad"
        >
          <span
            style="width: 100%"
            class="block h-full relative overflow-hidden rounded-full z-20"
            :class="{ 'fade-left-grad': maxStay > 0 }"
          >
            <img class="h-16" src="/img/undraw_female_avatar_l3ey.svg" />
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Pluralize from 'pluralize'

export default {
  data() {
    return {
      minStay: 1,
      maxStay: 0,
      initMinClasses: true,
      progress: '50%',
    }
  },
  methods: {
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive)
    },
  },
  mounted() {
    this.$root.$on('update-stays-for-night-snippet', data => {
      var [type, count] = data

      if (type == 'min') {
        this.minStay = count || 1

        if (count <= 1) {
          this.initMinClasses = true
        } else {
          this.initMinClasses = false
        }
      } else if (type == 'max') {
        this.maxStay = count
      }
    })
  },
}
</script>

<style scoped>
.fade-right-grad {
  background-color: #c3dafe;
  background-image: linear-gradient(to right, #c3dafe, #edf2f7);
}
.fade-left-grad {
  background-color: #c3dafe;
  background-image: linear-gradient(to left, #c3dafe, #edf2f7);
}
</style>
