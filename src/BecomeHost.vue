<template>
  <div class="flex">
    <Navbar
      v-if="!checkpoint"
      :header="navText"
      :page="page"
      :progress="progress"
      :save-and-exit="saveAndExit"
      :show-save-and-exit-btn="showSaveAndExitBtn"
      :checkpoint="checkpoint"
      :review="review"
      :goto-page="gotoPage"
    />

    <div class="bg-gray-100 min-h-screen w-3/5 px-6 pt-10 pb-20">
      <div class="ml-64" :class="{ 'mt-32': !checkpoint, 'mt-6': checkpoint }">
        <!-- Step One -->
        <PlaceType
          v-if="page == 1 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Bedrooms
          v-if="page == 2 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Baths
          v-if="page == 3 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Location
          v-if="page == 4 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <LocationConfirm
          v-if="page == 5 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Amenities
          v-if="page == 6 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <SharedSpaces
          v-if="page == 7 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />

        <!-- Checkpoint -->
        <Checkpoint
          :checkpoint="toggleCheckpoint"
          :step="step"
          :page="page"
          @review-step-one="stepOneReview"
          @continue-to-step-two="proceedStepTwo"
          @review-step-two="proceedStepTwo"
          @continue-to-step-three="proceedStepThree"
          @review-step-three="proceedStepThree"
          v-if="checkpoint"
        />

        <!-- Step Two -->
        <Photos
          v-if="page == 8 && !checkpoint"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
          :uploadUrl="uploadUrl"
        />
        <Description
          v-if="page == 9 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Name
          v-if="page == 10 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />

        <!-- Step Three -->
        <Requirements
          v-if="page == 11 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <HouseRules
          v-if="page == 12 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <ConfirmRequirements
          v-if="page == 13 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
          @review-requirements="gotoPage(11)"
          @review-house-rules="gotoPage(12)"
        />
        <BookingSteps
          v-if="page == 14 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <CalendarWarning
          v-if="page == 15 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <SettingsIntro
          v-if="page == 16 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <NoticePeriod
          v-if="page == 17 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <BookingInAdvance
          v-if="page == 18 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Stays
          v-if="page == 19 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <!-- Calendar days skipped here -->
        <Pricing
          v-if="page == 20 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <SpecialOffer
          v-if="page == 21 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <DiscountOffers
          v-if="page == 22 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
      </div>
    </div>

    <div class="relative bg-gray-200 w-2/5 px-6 pt-10 pb-20">
      <CalendarSnippet v-if="page == 17 && !checkpoint" />

      <AdvancedCalendarSnippet v-if="page == 18 && !checkpoint" />

      <NightsSnippet v-if="page == 19 && !checkpoint" />

      <PricingHelp v-if="page == 20 && !checkpoint" />

      <SpecialOfferHelp v-if="page == 21 && !checkpoint" />

      <DiscountHelper v-if="page == 22 && !checkpoint" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/BecomeHost/Navbar'
import PlaceType from './components/BecomeHost/Details/PlaceType'
import Bedrooms from './components/BecomeHost/Details/Bedrooms'
import Baths from './components/BecomeHost/Details/Baths'
import Location from './components/BecomeHost/Details/Location'
import LocationConfirm from './components/BecomeHost/Details/LocationConfirm'
import Amenities from './components/BecomeHost/Details/Amenities'
import SharedSpaces from './components/BecomeHost/Details/SharedSpaces'
import Checkpoint from './components/BecomeHost/Checkpoint'
import Photos from './components/BecomeHost/Scenery/Photos'
import Description from './components/BecomeHost/Scenery/Description'
import Name from './components/BecomeHost/Scenery/Name'
import Requirements from './components/BecomeHost/Guests/Requirements'
import HouseRules from './components/BecomeHost/Guests/HouseRules'
import ConfirmRequirements from './components/BecomeHost/Guests/ConfirmRequirements'
import BookingSteps from './components/BecomeHost/Guests/BookingSteps'
import CalendarWarning from './components/BecomeHost/Guests/CalendarWarning'
import SettingsIntro from './components/BecomeHost/Guests/SettingsIntro'
import NoticePeriod from './components/BecomeHost/Guests/NoticePeriod'
import CalendarSnippet from './components/BecomeHost/Guests/CalendarSnippet'
import BookingInAdvance from './components/BecomeHost/Guests/BookingInAdvance'
import AdvancedCalendarSnippet from './components/BecomeHost/Guests/AdvancedCalendarSnippet'
import Stays from './components/BecomeHost/Guests/Stays'
import NightsSnippet from './components/BecomeHost/Guests/NightsSnippet'
import Pricing from './components/BecomeHost/Guests/Pricing'
import PricingHelp from './components/BecomeHost/Guests/PricingHelp'
import SpecialOffer from './components/BecomeHost/Guests/SpecialOffer'
import SpecialOfferHelp from './components/BecomeHost/Guests/SpecialOfferHelp'
import DiscountOffers from './components/BecomeHost/Guests/DiscountOffers'
import DiscountHelper from './components/BecomeHost/Guests/DiscountHelper'

export default {
  components: {
    Navbar,
    PlaceType,
    Bedrooms,
    Baths,
    Location,
    LocationConfirm,
    Amenities,
    SharedSpaces,
    Checkpoint,
    Photos,
    Description,
    Name,
    Requirements,
    HouseRules,
    ConfirmRequirements,
    BookingSteps,
    CalendarWarning,
    SettingsIntro,
    NoticePeriod,
    CalendarSnippet,
    BookingInAdvance,
    AdvancedCalendarSnippet,
    Stays,
    NightsSnippet,
    Pricing,
    PricingHelp,
    SpecialOffer,
    SpecialOfferHelp,
    DiscountOffers,
    DiscountHelper,
  },
  data() {
    return {
      user: {},
      listing: {},
      page: 1,
      step: 1,
      text: [
        'Step 1: Start with the basics',
        'Step 2: Set the scene',
        'Step 3: Get ready for guests',
      ],
      checkpoint: false,
      review: false,
      exitBtnClicked: false,
    }
  },
  computed: {
    navText() {
      return this.text[this.step - 1]
    },
    progress() {
      if (this.review) return '100%'

      var progress = 0
      if (this.step == 1) {
        progress = parseInt((this.page / 7) * 100)
      }

      if (this.step == 2) {
        // starts at page 8 ergo page 8 is page 1 for step 2
        progress = parseInt(((this.page - 7) / 3) * 100)
      }

      if (this.step == 3) {
        // TODO
      }

      return progress + '%'
    },
    showSaveAndExitBtn() {
      if (this.step == 1 && !this.review) return false

      return true
    },
    uploadUrl() {
      var id = this.$store.getters.listing_id

      if (typeof id != 'undefined') {
        return (
          process.env.VUE_APP_API_URI + '/user/listings/' + id + '/image-upload'
        )
      }

      return ''
    },
  },
  methods: {
    prevPage() {
      this.page -= 1
    },
    nextPage() {
      this.page += 1
    },
    gotoPage(page) {
      this.page = page
    },
    toggleCheckpoint() {
      // this.persist()

      this.checkpoint = !this.checkpoint
    },
    stepOneReview() {
      this.step = 1
      this.page = 1
      this.review = true
    },
    proceedStepTwo() {
      this.step = 2
      this.page = 8
    },
    proceedStepThree() {
      this.step = 3
      this.page = 11
    },
    saveAndExit() {
      this.exitBtnClicked = true
    },
    persist() {
      this.$http
        .post('/user/listings/create', this.$store.state.listing, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(res => {
          this.$store.dispatch('setListingId', {
            id: res.data.id,
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  watch: {
    page: {
      immediate: true,
      handler: function(page) {
        if (page > 7 && this.step == 1) {
          this.toggleCheckpoint()
        } else if (page > 10 && this.step == 2) {
          this.toggleCheckpoint()
        }
      },
    },
    checkpoint: {
      immediate: true,
      handler: function(checkpoint) {
        if (checkpoint) this.exitBtnClicked = false
      },
    },
  },
  created() {
    if (!this.$store.state.isLogged) {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    } else {
      this.listing = this.$store.state.listing
    }
  },
}
</script>
