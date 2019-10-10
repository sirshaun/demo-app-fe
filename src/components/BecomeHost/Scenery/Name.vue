<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900">
      Name your place
    </h1>
    <p>
      Attract guests with a listing title that highlights what makes your place
      special.
    </p>

    <div class="flex flex-wrap">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-name"
        >
          Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          id="grid-name"
          type="text"
          placeholder="Listing title"
          v-model="name"
        />
      </div>
    </div>

    <hr class="border-gray-300 my-6" />

    <div class="clearfix mt-6">
      <div class="float-left">
        <a
          class="flex items-center text-indigo-600 hover:opacity-50 cursor-pointer"
          @click="back"
        >
          <img
            src="/img/ikonate/chevron-left-indigo-600.svg"
            class="h-6 mr-1"
          />
          <span class="font-thin">Back</span>
        </a>
      </div>
      <div class="float-right">
        <a
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          @click="next"
        >
          Next
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true }
  },
  data() {
    return {
      name: ""
    };
  }
};
</script>
