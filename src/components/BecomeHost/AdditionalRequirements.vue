<template>
  <div class="mb-20">
    <p class="tracking wide">
      Add additional requirements
    </p>

    <div class="flex flex-wrap mt-6">
      <div class="w-full px-3">
        <div class="mb-4" v-for="(option, index) in options" :key="index">
          <input
            type="checkbox"
            :id="index"
            :value="option"
            v-model="checkedRequirements"
          />
          <label :for="index" class="ml-2 font-light inline-block w-11/12">{{
            option
          }}</label>
        </div>
      </div>
    </div>

    <p class="text-sm tracking wide text-gray-600">
      More requirements can mean fewer reservations.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    initialCheckedAdditionalRequirements: {
      type: Array,
      default: () => {
        return []
      },
    },
    updateAdditionalRequirements: { type: Function, required: true },
  },
  data() {
    return {
      checkedRequirements: this.initialCheckedAdditionalRequirements,
      options: [
        'Government-issued ID submitted to Airbnb',
        'Recommended by other hosts and have no negative reviews',
      ],
    }
  },
  watch: {
    checkedRequirements: {
      immediate: true,
      handler: function(checkedRequirements) {
        this.updateAdditionalRequirements(this.checkedRequirements)
      },
    },
  },
}
</script>
