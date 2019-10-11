<template>
  <div class="flex flex-wrap my-3">
    <div class="w-full flex flex-col">
      <div class="flex items-center">
        <input
          type="checkbox"
          :id="'extra-detail-' + index"
          :name="'extra-detail-' + index"
          v-model="detail"
          @click="toggleDescriptionField"
        />
        <label
          :for="'extra-detail-' + index"
          class="ml-2 font-light inline-block w-11/12"
          >{{ option.text }}</label
        >
      </div>
      <div v-if="descriptionFieldOn">
        <div class="text-gray-600">
          {{ option.descr }}
        </div>
        <input
          class="appearance-none block w-4/5 h-12 bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          id="description"
          type="text"
          placeholder="Add your description"
          v-model="description"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: { type: Number, required: true },
    option: { type: Object, required: true },
    initialDetails: { required: false },
    addDetail: { type: Function, required: true },
    removeDetail: { type: Function, required: true },
    updateDetailDescription: { type: Function, required: true },
  },
  data() {
    return {
      descriptionFieldOn: false,
      description: '',
      detail: '',
    }
  },
  methods: {
    toggleDescriptionField() {
      if (this.descriptionFieldOn) {
        this.removeDetail(this.index)
      } else {
        this.collateData()
      }

      this.descriptionFieldOn = !this.descriptionFieldOn
    },
    collateData() {
      var detail = { detail: this.option.text, description: this.description }

      this.addDetail(this.index, detail)
    },
    sluggedName(name) {
      return name
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, ' ')
        .replace(' ', '_')
    },
  },
  watch: {
    description: {
      immediate: false,
      handler: function(description) {
        this.updateDetailDescription(this.index, this.description)
      },
    },
  },
  created() {
    if (!!this.initialDetails) {
      if (this.initialDetails.hasOwnProperty('description')) {
        this.description = this.initialDetails.description

        this.toggleDescriptionField()
      }

      if (this.initialDetails.hasOwnProperty('detail'))
        this.detail = this.initialDetails.detail
    }
  },
}
</script>
