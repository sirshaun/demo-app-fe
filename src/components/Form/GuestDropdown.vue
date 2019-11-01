<template>
  <on-click-outside :do="handleClickOutside">
    <div class="flex flex-wrap mt-4">
      <div class="w-full">
        <label
          class="block tracking-wide text-gray-700 text-xs font-medium mb-1"
        >
          Guests
        </label>
        <div
          class="appearance-none relative w-full h-12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight cursor-pointer"
          @click="toggleDropdown"
        >
          {{ pluralize('guest', guests, true) }}
          <div class="absolute text-gray-600" style="top: 25%; right: 2.5%;">
            <svg
              v-if="!dropdownOn"
              class="h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
            <svg
              v-if="dropdownOn"
              class="h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
              />
            </svg>
          </div>
        </div>
        <div class="relative inline-block w-full py-4 rounded-full">
          <div
            class="absolute w-full h-auto top-0 right-0 bg-white rounded text-gray-800 px-4 py-3 border border-gray-300 shadow z-10"
            v-if="dropdownOn"
          >
            <div class="flex flex-wrap mb-5">
              <div class="w-full px-3">
                <div class="clearfix mt-2">
                  <div class="float-left font-light">
                    Adults
                  </div>
                  <div class="float-right">
                    <Counter
                      :initial-counter="adults"
                      :func="updateNumberOfAdults"
                      :decrement-disabled="disableAdultDecrement"
                      :increment-disabled="disableIncrement"
                    />
                  </div>
                </div>
                <hr class="border-gray-300 my-6" />
                <div class="clearfix mt-6">
                  <div class="float-left font-light">
                    <div class="leading-none">Children</div>
                    <div class="text-xs tracking-wider">
                      Ages 2-12
                    </div>
                  </div>
                  <div class="float-right">
                    <Counter
                      :initial-counter="children"
                      :func="updateNumberOfChildren"
                      :decrement-disabled="disableChildDecrement"
                      :increment-disabled="disableIncrement"
                    />
                  </div>
                </div>
                <hr class="border-gray-300 my-6" />
                <div class="clearfix mt-6">
                  <div class="float-left font-light">
                    <div class="leading-none">Infants</div>
                    <div class="text-xs tracking-wider">
                      Under 2
                    </div>
                  </div>
                  <div class="float-right">
                    <Counter
                      :initial-counter="infants"
                      :func="updateNumberOfInfants"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="text-xs font-light mt-4 px-3">
              {{ pluralize('guest', maxGuests, true) }} maximum. Infants don’t
              count toward the number of guests.
            </div>
            <div class="text-right mt-4 px-3">
              <a
                class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                @click="toggleDropdown"
                >Close</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import OnClickOutside from '@/components/OnClickOutside'
import Counter from './Counter'

export default {
  components: { OnClickOutside, Counter },
  props: {
    maxGuests: { type: Number, required: true },
    pluralize: { type: Function, required: true },
  },
  data() {
    return {
      adults: 1,
      children: 0,
      infants: 0,
      dropdownOn: false,
    }
  },
  computed: {
    guests() {
      return this.adults + this.children
    },
    disableAdultDecrement() {
      return this.adults == 1
    },
    disableChildDecrement() {
      return this.maxGuests == 1
    },
    disableIncrement() {
      var remaining = this.maxGuests - this.guests

      return remaining == 0
    },
  },
  methods: {
    updateNumberOfAdults(num) {
      this.adults = num
    },
    updateNumberOfChildren(num) {
      this.children = num
    },
    updateNumberOfInfants(num) {
      this.infants = num
    },
    toggleDropdown() {
      this.dropdownOn = !this.dropdownOn
    },
    handleClickOutside() {
      if (this.dropdownOn) {
        this.toggleDropdown()
      }
    },
  },
}
</script>
