<template>
  <div class="mt-32 px-4">
    <div class="w-1/2">
      <div class="h-16 relative bg-gray-200">
        <!-- labels -->
        <div class="relative h-5">
          <!-- min stay label -->
          <div
            class="absolute font-light text-gray-600"
            :style="{ left: elemOffsetMin, top: '0%' }"
          >
            {{ pluralize('night', minStay, true) }}
          </div>
          <!-- max stay label -->
          <div
            class="absolute font-light text-gray-600"
            :style="{ left: elemOffsetMax, top: '0%' }"
          >
            {{ maxStayLabel }}
          </div>
        </div>
        <!-- pointers -->
        <div class="relative h-4">
          <!-- min stay pointer -->
          <div
            class="absolute border-r-2 h-6 border-gray-400"
            :style="{ left: elemOffsetMin, top: '0%' }"
          ></div>
          <!-- max stay pointer -->
          <div
            class="absolute border-r-2 h-6 border-gray-400"
            :style="{ left: elemOffsetMax, top: '0%' }"
          ></div>
        </div>
        <!-- parent span -> default linear gradient -->
        <span
          style="width: 75%"
          class="block h-full relative overflow-hidden rounded-full fade-right-grad"
        >
          <!-- max stay span -->
          <span
            style="width: 100%"
            class="block h-full relative overflow-hidden rounded-full z-20"
            :class="{ 'fade-left-grad': maxStay > 0 }"
          >
            <!-- min stay span -->
            <span
              style="width: 49%"
              class="block h-full relative overflow-hidden rounded-full z-30"
              :class="{ 'bg-indigo-200': this.trueMinStay > 0 }"
            >
              <img class="h-16" src="/img/undraw_female_avatar_l3ey.svg" />
            </span>
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
      MinStay: 1,
      trueMinStay: 0,
      maxStay: 0,
      initMinClasses: true,
    }
  },
  computed: {
    maxStayLabel() {
      if (this.maxStay == 0) return 'No max'

      return this.pluralize('night', this.maxStay, true)
    },
    elemOffsetMin() {
      if (this.trueMinStay == 0) return '21%'

      return '28%'
    },
    elemOffsetMax() {
      return '64%'
    },
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
        this.trueMinStay = count
        this.minStay = this.trueMinStay || 1

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
  background-image: linear-gradient(to left, #c3dafe, #ebf4ff);
}
</style>
