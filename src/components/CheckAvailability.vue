<template>
  <div>
    <div class="border border-bg-gray-500 p-6">
      <div class="font-semibold text-lg">
        {{ currencySymbol + financial(listing.basePrice) }}
        <span class="text-xs tracking-wide text-gray-700">per night</span>
      </div>

      <hr class="border-gray-300 my-6" />

      <div class="flex flex-wrap">
        <div class="w-full">
          <label
            class="block tracking-wide text-gray-700 text-xs font-medium mb-1"
            for="grid-dates"
          >
            Dates
          </label>
          <div class="v-date-picker">
            <DatePicker
              :value="dates"
              mode="range"
              :columns="$screens({ default: 1, lg: 2 })"
              color="indigo"
              v-model="dates"
            />
          </div>
        </div>
      </div>

      <GuestDropdown
        :max-guests="listing.guests"
        :pluralize="pluralize"
        @guests-changed="updateGuests"
      />

      <div class="">
        <a
          class="inline-block w-full text-center bg-indigo-500 text-white p-2 rounded cursor-pointer hover:bg-indigo-700"
        >
          Check availability
        </a>
      </div>
      <div class="text-center text-xs font-light tracking-wide">
        You won't be charged yet
      </div>

      <hr class="border-gray-300 my-6" />

      <div class="text-xs text-center font-light tracking-wide">
        Enter dates and number of guests to check the total trip price,
        including additional fees and any taxes.
      </div>
    </div>
    <div class="flex items-center justify-center mt-4">
      <svg
        class="h-3 mr-3 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M7.667 12H2v8H0V0h12l.333 2H20l-3 6 3 6H8l-.333-2z" />
      </svg>
      <span class="text-indigo-600 cursor-pointer hover:text-indigo-200"
        >Report this listing</span
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import GuestDropdown from './Form/GuestDropdown'

export default {
  components: { DatePicker, GuestDropdown },
  props: {
    listing: { type: Object, required: true },
    pluralize: { type: Function, required: true },
  },
  data() {
    return {
      currencySymbol: '',
      dates: '',
      guests: 0,
      adults: 0,
      children: 0,
      infants: 0,
    }
  },
  methods: {
    updateGuests(data) {
      var [adults, children, infants] = data

      this.adults = adults
      this.children = children
      this.infants = infants
      this.guests = this.adults + this.children
    },
    financial(num) {
      return Number.parseFloat(num).toFixed(2)
    },
    fetchCurrencySymbol() {
      axios
        .get(
          'https://restcountries.eu/rest/v2/currency/' +
            this.listing.currency.toLowerCase()
        )
        .then(
          res => {
            this.currencySymbol = res.data[0].currencies[0].symbol
          },
          error => {
            console.log(error)
          }
        )
    },
  },
  created() {
    this.fetchCurrencySymbol()
  },
}
</script>
