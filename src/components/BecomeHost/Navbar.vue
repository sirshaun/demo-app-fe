<template>
  <div>
    <nav class="nav-float-alt pt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-white pl-6">
          <router-link to="/">
            <img class="h-6" src="/img/logo-mini.svg" alt="Workcation" />
          </router-link>
          <div class="ml-6 text-gray-900 font-light text-lg tracking-wide">
            {{ header }}
          </div>
        </div>
        <div
          class="font-light text-indigo-600 tracking-wide text-lg cursor-pointer pr-6 hover:text-indigo-400"
          @click="saveAndExit"
          v-if="showSaveAndExitBtn"
        >
          Save and Exit
        </div>
      </div>
      <div
        class="flex justify-between mt-4 border-t border-gray-400 bg-gray-100"
        v-if="review"
      >
        <div
          class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
          :class="{
            'bg-gray-200': page == 1,
            'hover:bg-gray-300': page != 1
          }"
          @click="gotoPage(1)"
        >
          Place type
        </div>
        <div
          class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
          :class="{
            'bg-gray-200': page == 2,
            'hover:bg-gray-300': page != 2
          }"
          @click="gotoPage(2)"
        >
          Bedrooms
        </div>
        <div
          class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
          :class="{
            'bg-gray-200': page == 3,
            'hover:bg-gray-300': page != 3
          }"
          @click="gotoPage(3)"
        >
          Baths
        </div>
        <div
          class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
          :class="{
            'bg-gray-200': page == 4 || page == 5,
            'hover:bg-gray-300': page != 4 || page != 5
          }"
          @click="gotoPage(4)"
        >
          Location
        </div>
        <div
          class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
          :class="{
            'bg-gray-200': page == 6,
            'hover:bg-gray-300': page != 6
          }"
          @click="gotoPage(6)"
        >
          Amenities
        </div>
        <div
          class="w-1/6 border-r border-gray-400 py-2 px-3 cursor-pointer tracking-wider"
          :class="{
            'bg-gray-200': page == 7,
            'hover:bg-gray-300': page != 7
          }"
          @click="gotoPage(7)"
        >
          Shared spaces
        </div>
      </div>
      <div class="w-full" :class="{ 'absolute bottom-0 left-0': !review }">
        <div class="h-1 relative bg-gray-200" v-if="!checkpoint">
          <span
            :style="{ width: progress }"
            class="block h-full relative overflow-hidden bg-indigo-400"
          ></span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    header: { type: String, required: true },
    saveAndExit: { type: Function, required: true },
    showSaveAndExitBtn: { type: Boolean, required: true },
    checkpoint: { type: Boolean, required: true },
    review: { type: Boolean, required: true },
    page: { type: Number, required: true },
    progress: { type: String, required: true },
    gotoPage: { type: Function, required: true }
  }
};
</script>
