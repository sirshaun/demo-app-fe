<template>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-first-name"
      >
        First Name
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
        :class="{ 'border-red-500 mb-3': firstnameError }"
        id="grid-first-name"
        type="text"
        placeholder="Jane"
        v-model="firstname"
        @blur="checkFirstNameNotEmpty"
      />
      <p v-show="firstnameError" class="text-red-500 text-xs italic">
        Please fill out this field.
      </p>
    </div>
    <div class="w-full md:w-1/3 px-3">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-middle-name"
      >
        Middle Name
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-middle-name"
        type="text"
        placeholder="Mary"
        v-model="middlename"
      />
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-last-name"
      >
        Last Name
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        :class="{ 'border-red-500 mb-3': lastnameError }"
        id="grid-last-name"
        type="text"
        placeholder="Doe"
        v-model="lastname"
        @blur="checkLastNameNotEmpty"
      />
      <p v-show="lastnameError" class="text-red-500 text-xs italic">
        Please fill out this field.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstname: "",
      firstnameError: false,
      middlename: "",
      lastname: "",
      lastnameError: false
    };
  },
  methods: {
    checkFirstNameNotEmpty() {
      if (this.firstname == "") {
        this.firstnameError = true;
      } else {
        this.firstnameError = false;
        this.fullNameAcquired();
      }
    },
    checkLastNameNotEmpty() {
      if (this.lastname == "") {
        this.lastnameError = true;
      } else {
        this.lastnameError = false;
        this.fullNameAcquired();
      }
    },
    fullNameAcquired() {
      if (!this.firstnameError && !this.lastnameError) {
        this.$emit("names-filled-out", [
          this.firstname,
          this.middlename,
          this.lastname,
          false
        ]);
      } else {
        this.$emit("names-filled-out", [
          this.firstname,
          this.middlename,
          this.lastname,
          true
        ]);
      }
    }
  }
};
</script>
