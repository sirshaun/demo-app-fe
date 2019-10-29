<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full px-3">
        <div class="flex justify-between">
          <div class="w-2/3 font-light">
            <div class="flex flex-col">
              <div>{{ name }}</div>
              <div v-if="!addingBeds">
                {{ pluralize('bed', beds, true) }}
              </div>
              <div v-show="addingBeds">
                <Bed
                  v-for="(bed, index) in allBeds"
                  :name="bed"
                  :key="index"
                  :initBeds="initialCount(bed)"
                  :func="incrementBeds"
                />
                <div class="relative mt-6 mb-10">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    :id="('grid-bed-add-', nameSlug)"
                    @change="addBed($event)"
                  >
                    <option
                      v-for="(option, index) in bedOptions"
                      :selected="isDefaultOption(option)"
                      :disabled="isDefaultOption(option)"
                      :key="100 - index"
                    >
                      {{ option }}
                    </option>
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
          </div>
          <div class="mt-3">
            <a
              class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded cursor-pointer"
              @click="toggleView"
              >{{ addingBedsBtnText }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-gray-300 mx-2 my-6" />
  </div>
</template>

<script>
import Pluralize from 'pluralize'

import Bed from './Bed'

const beds = [
  'double',
  'queen',
  'single',
  'sofa',
  'king',
  'small',
  'couch',
  'bunk',
  'floor',
  'air',
  'cot',
  'toddler',
  'hammock',
  'water',
]

export default {
  components: { Bed },
  props: {
    name: { type: String, required: true },
    spaces: { type: Object },
  },
  data() {
    return {
      double: 0,
      queen: 0,
      single: 0,
      sofa: 0,
      king: 0,
      small: 0,
      couch: 0,
      bunk: 0,
      floor: 0,
      air: 0,
      cot: 0,
      toddler: 0,
      hammock: 0,
      water: 0,
      defaultBeds: ['Double', 'Queen', 'Single', 'Sofa bed'],
      bedOptions: [
        'Add another bed',
        'King',
        'Small double (3/4)',
        'Couch',
        'Bunk bed',
        'Floor matress',
        'Air matress',
        'Cot',
        'Toddler bed',
        'Hammock',
        'Water bed',
      ],
      allBeds: [],
      addingBeds: false,
    }
  },
  computed: {
    beds() {
      return (
        this.double +
        this.queen +
        this.single +
        this.sofa +
        this.king +
        this.small +
        this.couch +
        this.bunk +
        this.floor +
        this.air +
        this.cot +
        this.toddler +
        this.hammock +
        this.water
      )
    },
    nameSlug() {
      return this.name.toLowerCase().replace(' ', '-')
    },
    addingBedsBtnText() {
      if (this.beds == 0 && !this.addingBeds) return 'Add beds'

      if (this.beds > 0 && !this.addingBeds) return 'Edit beds'

      return 'Done'
    },
  },
  methods: {
    incrementBeds(bed, beds) {
      this[this.shortName(bed)] = beds
    },
    addBed(event) {
      var $select = event.target
      // document.querySelector('#grid-bed-add-' + this.nameSlug)
      var bedType = event.target.value

      this.updateBeds(bedType)

      // reset select
      $select.value = 'Add another bed'
    },
    updateBeds(bedType) {
      // remove option from select options
      var index = this.bedOptions.indexOf(bedType)
      if (index > -1) {
        this.bedOptions.splice(index, 1)
      }

      // add bed type to list
      this.allBeds.push(bedType)
    },
    isDefaultOption(option) {
      return option == 'Add another bed'
    },
    toggleView() {
      if (this.addingBedsBtnText == 'Done')
        this.$emit('bedroom-beds-updated', this.name, this.bedsAsArray())

      this.addingBeds = !this.addingBeds
    },
    bedsAsArray() {
      var arr = {}

      beds.forEach(e => {
        if (this[e] > 0) arr[e] = this[e]
      })

      return arr
    },
    initialCount(bed) {
      return this[this.shortName(bed)]
    },
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive)
    },
    shortName(name) {
      // NOTE: names with white space are shortened to just the
      // first word of that name (to match the data in the parent)

      if (/\s/.test(name)) {
        return name.substr(0, name.indexOf(' ')).toLowerCase()
      }

      return name.toLowerCase()
    },
    restoreBeds() {
      if (
        typeof this.spaces != 'undefined' &&
        Object.keys(this.spaces).length
      ) {
        var sluggedName = this.name.toLowerCase().replace(' ', '_')

        var beds = this.spaces[sluggedName]

        for (let key in beds) {
          var bedType = ''

          if (beds[key]) {
            this[key] = beds[key]

            this.bedOptions.forEach(e => {
              if (this.shortName(e) == key) {
                bedType = e
              }
            })

            if (bedType != '') this.updateBeds(bedType)
          }
        }
      }
    },
  },
  created() {
    this.allBeds = this.defaultBeds

    this.restoreBeds()
  },
}
</script>
