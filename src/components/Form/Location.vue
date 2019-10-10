<template>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-city"
      >
        City
      </label>
      <div class="relative">
        <select
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="{ 'border-red-500 mb-3': cityError }"
          id="grid-city"
          v-model="city"
          @change="checkCity"
        >
          <option v-for="(city, index) in cities" :key="index">{{
            city
          }}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-state"
      >
        Province
      </label>
      <div class="relative">
        <select
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          :class="{ 'border-red-500 mb-3': stateError }"
          id="grid-state"
          v-model="state"
          @change="checkState"
        >
          <option v-for="(state, index) in states" :key="100 - index">{{
            state
          }}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      cityError: true,
      state: "",
      stateError: true,
      states: [],
      cities: []
    };
  },
  methods: {
    checkCity() {
      if (this.city != "") {
        this.cityError = false;
        this.locationInfoAcquired();
      }
    },
    checkState() {
      if (this.state != "") {
        this.stateError = false;
        this.locationInfoAcquired();
      }
    },
    locationInfoAcquired() {
      if (!this.cityError && !this.stateError) {
        this.$emit("location-info-filled-out", [this.city, this.state, false]);
      }
    },
    fetchStates() {
      this.$http.get("/location/state").then(
        res => {
          this.states = res.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    fetchCities() {
      this.$http.get("/location/city").then(
        res => {
          this.cities = res.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.fetchStates();
    this.fetchCities();
  }
};
</script>
