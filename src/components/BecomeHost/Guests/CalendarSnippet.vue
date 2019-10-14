<template>
  <div class="mt-32 px-4">
    <span class="font-light text-lg text-gray-700">Today</span>
    <div class="flex flex-wrap mt-3" style="max-width: 300px">
      <div
        v-for="(n, i) in N"
        class="border-b border-r border-gray-500 text-gray-600 relative flex justify-center"
        :class="{
          'border-l': first(i),
          'border-t': !bottom(i),
          'blocked': blocked(i, N),
          'h-20 w-20 items-center': bigger(),
          'items-end pb-1': !bigger(),
          'h-16 w-16': normal(),
          'h-10 w-10': smaller(),
        }"
      >
        <span
          class="absolute left-0 top-0 pt-1 pl-1 text-sm"
          v-if="!bigger()"
          >{{ 14 + i }}</span
        >
        <img
          :class="{ 'h-16': bigger(), 'h-10': normal(), 'h-8 z-20': smaller() }"
          src="/img/undraw_female_avatar_l3ey.svg"
          v-if="!blocked(i, N)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: 0,
    }
  },
  computed: {
    N() {
      if (this.days == 1) return 1

      if (this.days == 7) return 14

      return this.days + 1
    },
  },
  methods: {
    first(index) {
      return index == 0 || index == 7
    },
    bottom(index) {
      return index > 6
    },
    blocked(index, length) {
      if (this.days == 7) return index != this.days

      return index != length - 1
    },
    normal() {
      return this.days < 7
    },
    smaller() {
      return this.days >= 7
    },
    bigger() {
      return this.days < 2
    },
  },
  mounted() {
    this.$root.$on(
      'update-days-for-calendar-snippet',
      days => (this.days = days)
    )
  },
}
</script>

<style scoped>
.blocked {
  background: -webkit-repeating-linear-gradient(
    45deg,
    #edefed,
    #edefed 4px,
    #e6e6e6 2px,
    #e6e6e6 6px
  );
  background: -moz-repeating-linear-gradient(
    45deg,
    #edefed,
    #edefed 4px,
    #e6e6e6 2px,
    #e6e6e6 6px
  );
  background: -o-repeating-linear-gradient(
    45deg,
    #edefed,
    #edefed 4px,
    #e6e6e6 2px,
    #e6e6e6 6px
  );
  background: repeating-linear-gradient(
    45deg,
    #edefed,
    #edefed 4px,
    #e6e6e6 2px,
    #e6e6e6 6px
  );
}
</style>
