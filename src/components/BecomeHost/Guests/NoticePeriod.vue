<template>
  <div class="flex flex-col px-4">
    <h1 class="font-semibold text-2xl text-gray-800 leading-relaxed">
      How much notice do you need before a guest arrives?
    </h1>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5">
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': noticeError,
            }"
            id="grid-notice"
            v-model="notice"
            @change="noticeChanged"
          >
            <option v-for="(option, index) in noticeOptions" :key="index">
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
        <p v-show="noticeError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-8" v-if="showDeadlineTimes">
      <div class="w-3/5">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-frequency"
        >
          Guests can book before:
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': deadlineError,
            }"
            id="grid-deadline"
            v-model="deadline"
          >
            <option
              v-for="(option, index) in deadlineOptions"
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
        <p v-show="deadlineError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="mt-10 w-3/5 font-semibold tracking-wide text-sm text-gray-600">
      <span class="text-indigo-600">Tip:</span> At least
      <strong>2 days’ notice</strong> can help you plan for a guest’s arrival
      but you might miss out on last-minute trips.
    </div>

    <hr class="border-gray-300 my-8" />

    <a
      class="font-light text-lg text-indigo-600 cursor-pointer hover:text-indigo-200 mb-20"
      @click="showCheckinPeriod = true"
      v-if="!showCheckinPeriod"
      >When can guests check in?</a
    >

    <div class="mb-20" v-if="showCheckinPeriod">
      <p class="font-light text-lg text-gray-900">
        When can guests check in?
      </p>
      <div class="flex flex-wrap mt-2">
        <div class="w-1/3 pr-3">
          <label
            class="block text-gray-600 tracking-wide text-light mb-2"
            for="grid-checkin-from"
          >
            From
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-checkin-from"
              v-model="from"
            >
              <option v-for="(option, index) in fromOptions" :key="100 - index">
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
          <p v-show="false" class="text-red-500 text-xs italic">
            Please select an option
          </p>
        </div>
        <div class="w-1/3 pl-3">
          <label
            class="block text-gray-600 tracking-wide text-light mb-2"
            for="grid-checkin-to"
          >
            To
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-checkin-to"
              v-model="to"
            >
              <option
                v-for="(option, index) in toOptions"
                :key="200 - index"
                :disabled="option.disabled"
              >
                {{ option.text }}
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
          <p v-show="false" class="text-red-500 text-xs italic">
            Please select an option
          </p>
        </div>
      </div>
    </div>

    <Footer :back="back" :next="proceed" />
  </div>
</template>

<script>
import Footer from '@/components/BecomeHost/Footer'

export default {
  components: { Footer },
  props: {
    back: { type: Function, required: true },
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true },
  },
  data() {
    return {
      notice: '',
      noticeError: false,
      noticeOptions: ['Same day', '2 days', '3 days', '7 days'],
      deadline: '',
      deadlineError: false,
      showDeadlineTimes: false,
      from: 'Flexible',
      to: '',
      showCheckinPeriod: false,
    }
  },
  computed: {
    errors() {
      return this.noticeError
    },
    deadlineOptions() {
      return this.generateTimes()
    },
    fromOptions() {
      var arr = this.generateTimes(true, true)
      arr.pop()

      return arr
    },
    toOptions() {
      var cutoffIndex = this.generateTimes(true, true).indexOf(this.from) + 1

      return this.generateTimes(true, true).map((e, i) => {
        var disabled = false

        if (this.from == 'Flexible' && i > 0) disabled = true

        if (i <= cutoffIndex) disabled = true

        if (e == 'Flexible') disabled = false

        return { text: e, value: e, disabled: disabled }
      })
    },
  },
  methods: {
    generateTimes(special = false, short = false) {
      var times = []
      var intervalEncounters = 0
      var reset = false
      var ap = 'AM'
      var postfix = ''
      var sth = special ? 8 : 6

      if (special) times.push('Flexible')

      for (var i = sth; i <= 12; i++) {
        if (i == 12) {
          intervalEncounters += 1
          reset = true
          ap = intervalEncounters == 1 ? 'PM' : 'AM'
          postfix = ap == 'PM' ? ' (noon)' : ' (midnight)'
        } else {
          postfix = ''
        }

        short
          ? times.push(i + ap + postfix)
          : times.push(i + ':00 ' + ap + postfix)

        if (reset && intervalEncounters < 2) {
          i = 0
          reset = false
        }
      }

      if (special) {
        times.push('1AM (next day)')
        times.push('2AM (next day)')
        times.push('3AM (next day)')
      }

      return times
    },
    noticeChanged() {
      if (this.notice == 'Same day') {
        this.generateTimes()
        this.showDeadlineTimes = true
      } else {
        this.showDeadlineTimes = false
      }
    },
    toOptionDisabled(index) {
      if (this.from == 'flexible' && index > 0) {
        return true
      }

      var tmpArr = this.generateTimes()
      var cutoffIndex = tmpArr.indexOf(this.from) + 2
      if (index <= cutoffIndex) {
        return true
      }

      return false
    },
    checkNotice() {
      this.noticeError = this.notice == ''
    },
    proceed() {
      this.checkNotice()

      if (!this.errors) this.updateAndContinue()
    },
    updateListing() {
      this.$store.dispatch('updateNoticePeriod', {
        period: this.notice,
        deadline: this.deadline,
        checkInStart: this.from,
        checkInEnd: this.to,
      })
    },
    updateProgress(step) {
      this.$store.dispatch('updateProgress', {
        step: 3,
        page: step ? 18 : 17,
      })
    },
    updateAndContinue() {
      if (!this.noticeError) {
        this.updateListing()

        this.updateProgress(true)

        this.next()
      }
    },
    updateAndExit() {
      if (!this.noticeError) {
        this.updateListing()

        this.updateProgress(false)

        this.checkpoint()
      }
    },
    initializeValues() {
      let listing = this.$store.state.listing

      if (listing.hasOwnProperty('noticePeriod'))
        this.notice = listing.noticePeriod

      if (listing.hasOwnProperty('deadlineTime'))
        this.deadline = listing.deadlineTime

      if (listing.hasOwnProperty('checkInStart')) {
        if (listing.checkInStart) this.showCheckinPeriod = true

        this.from = listing.checkInStart
      }

      if (listing.hasOwnProperty('checkInEnd')) this.to = listing.checkInEnd
    },
  },
  created() {
    this.initializeValues()
  },
  watch: {
    notice: {
      immediate: true,
      handler: function(notice) {
        if (notice == 'Same day') {
          this.$root.$emit('update-days-for-calendar-snippet', 1)
        } else {
          this.$root.$emit('update-days-for-calendar-snippet', parseInt(notice))
        }
      },
    },
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.checkpoint()
      },
    },
  },
}
</script>
