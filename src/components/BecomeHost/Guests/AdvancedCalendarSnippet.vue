<template>
  <div class="mt-32 px-4">
    <div class="flex flex-wrap mt-3" style="max-width: 300px">
      <div
        v-for="(el, i) in elements"
        class="h-20 w-20 m-2 border border-gray-500 text-gray-600 relative flex items-end justify-center"
        :class="{ blocked: blocked(i, elements.length) }"
      >
        <span class="absolute top-0 text-lg uppercase text-gray-600">{{
          el
        }}</span>
        <img
          class="h-12 pb-1"
          src="/img/undraw_male_avatar_323b.svg"
          v-if="showAvatar(i, elements.length)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'

export default {
  data() {
    return {
      byMonths: true,
      startingYear: new Date().getFullYear(),
      count: 3,
      allDatesUnavailable: true,
      allDatesAvailable: false,
    }
  },
  computed: {
    elements() {
      var arr = []

      if (this.byMonths) {
        var now = moment()
        for (var i = 0; i < this.count; i++) {
          arr.push(now.format('MMM'))
          now.add(1, 'M')
        }
      } else {
        for (var i = 0; i < this.count; i++) {
          arr.push(this.startingYear + i)
        }
      }
      return arr
    },
  },
  methods: {
    blocked(index, length) {
      if (this.allDatesUnavailable) return true

      if (this.allDatesAvailable) return false

      return index != length - 1
    },
    showAvatar(index, length) {
      if (this.allDatesUnavailable) return false

      return index == length - 1
    },
  },
  mounted() {
    this.$root.$on('update-months-for-calendar-snippet', data => {
      var [type, count, ...data] = data

      this.count = count
      this.allDatesUnavailable = typeof data[0] != 'undefined'
      this.allDatesAvailable = false

      if (type == 'year') {
        if (count == 3) {
          this.allDatesAvailable = true
          this.startingYear += 1
        }
        this.byMonths = false
      } else if (type == 'month') {
        this.byMonths = true
      }
    })
  },
}
</script>

<style scoped>
.blocked {
  background: -webkit-repeating-linear-gradient(
    45deg,
    #edf2f7,
    #edf2f7 4px,
    #e2e8f0 2px,
    #e2e8f0 6px
  );
  background: -moz-repeating-linear-gradient(
    45deg,
    #edf2f7,
    #edf2f7 4px,
    #e2e8f0 2px,
    #e2e8f0 6px
  );
  background: -o-repeating-linear-gradient(
    45deg,
    #edf2f7,
    #edf2f7 4px,
    #e2e8f0 2px,
    #e2e8f0 6px
  );
  background: repeating-linear-gradient(
    45deg,
    #edf2f7,
    #edf2f7 4px,
    #e2e8f0 2px,
    #e2e8f0 6px
  );
}
</style>
