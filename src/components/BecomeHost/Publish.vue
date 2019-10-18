<template>
  <div class="flex flex-wrap">
    <div class="w-1/2">
      <h1 class="font-semibold text-2xl text-gray-900">
        You’re ready to publish!
      </h1>
      <p class="mt-4 text-gray-700 font-light">
        You’ll be able to welcome your first guest after you set your
        availability, which you can easily do after you hit publish.
      </p>

      <div class="mt-6 flex flex-wrap items-center">
        <a
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Publish
        </a>

        <a
          class="ml-6 text-indigo-600 hover:opacity-50 cursor-pointer"
          @click="checkpoint"
          >Edit lisitng</a
        >
      </div>
    </div>
    <div class="w-1/2">
      <!-- <img class="h-40" src="/img/undraw_travelers_qlt1.svg" /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkpoint: { type: Function, required: true },
    publish: { type: Function, required: true },
  },
}
</script>
