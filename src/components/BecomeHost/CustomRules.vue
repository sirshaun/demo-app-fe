<template>
  <div class="mt-6">
    <div class="block tracking-wide text-gray-700 font-bold mb-4">
      Additional Rules
    </div>
    <div
      class="flex items-center justify-between mb-4"
      v-for="(rule, index) in customRules"
      :key="index"
    >
      <div>{{ rule }}</div>
      <div
        class="cursor-pointer text-gray-400 hover:text-gray-700"
        @click="removeCustomRule(index)"
      >
        <svg
          class="h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customRules: { type: Array, required: true },
    removeCustomRule: { type: Function, required: true },
  },
}
</script>
