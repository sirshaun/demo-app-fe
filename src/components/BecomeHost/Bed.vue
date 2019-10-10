<template>
  <div class="flex flex-wrap items-center mt-6">
    <div class="w-1/3 font-light leading-none">{{ name }}</div>
    <div class="w-1/3">
      <Counter :initial-counter="beds" :func="updateNumberOfBeds" />
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Form/Counter";

export default {
  components: { Counter },
  props: {
    name: { type: String, required: true },
    func: { type: Function, required: true },
    initBeds: { type: Number, default: 0 }
  },
  data() {
    return {
      beds: this.initBeds
    };
  },
  methods: {
    updateNumberOfBeds(num) {
      this.beds = num;
    }
  },
  watch: {
    beds: {
      immediate: false,
      handler: function(beds) {
        this.func(this.name, beds);
      }
    }
  }
};
</script>
