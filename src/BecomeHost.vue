<template>
  <div class="flex">
    <Navbar
      v-if="!checkpoint && page != 30"
      :header="navText"
      :page="page"
      :step="step"
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
          :review="review"
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
          @note-last-page="noteLastPage"
        />

        <!-- Checkpoint -->
        <Checkpoint
          :checkpoint="toggleCheckpoint"
          :step="step"
          :page="page"
          @review-step-one="stepOneReview"
          @continue-to-step-two="proceedStepTwo"
          @review-step-two="stepTwoReview"
          @continue-to-step-three="proceedStepThree"
          @review-step-three="stepThreeReview"
          @publish-listing="publishListing"
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
        <Calendar
          v-if="page == 20 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Pricing
          v-if="page == 21 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <SpecialOffer
          v-if="page == 22 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <DiscountOffers
          v-if="page == 23 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <WhatToExpect
          v-if="page == 24 && !checkpoint"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />
        <Laws
          v-if="page == 25 && !checkpoint"
          :review="review"
          :back="prevPage"
          :next="nextPage"
          :checkpoint="toggleCheckpoint"
          :exit-btn-clicked="exitBtnClicked"
        />

        <!-- End -->
        <Publish
          :checkpoint="toggleCheckpoint"
          :publish="publishListing"
          v-if="complete && !checkpoint && page == 30"
        />
      </div>
    </div>

    <div class="relative bg-gray-200 w-2/5 px-6 pt-10 pb-20">
      <Preview
        :listing_id="listing.id"
        :complete="complete"
        :preview-of-listing="previewListing"
        v-if="checkpoint"
      />

      <CalendarSnippet v-if="page == 17 && !checkpoint" />

      <AdvancedCalendarSnippet v-if="page == 18 && !checkpoint" />

      <NightsSnippet v-if="page == 19 && !checkpoint" />

      <PricingHelp v-if="page == 21 && !checkpoint" />

      <SpecialOfferHelp v-if="page == 22 && !checkpoint" />

      <DiscountHelper v-if="page == 23 && !checkpoint" />
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
import Preview from './components/BecomeHost/Checkpoint/Preview'
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
import Calendar from './components/BecomeHost/Guests/Calendar'
import Pricing from './components/BecomeHost/Guests/Pricing'
import PricingHelp from './components/BecomeHost/Guests/PricingHelp'
import SpecialOffer from './components/BecomeHost/Guests/SpecialOffer'
import SpecialOfferHelp from './components/BecomeHost/Guests/SpecialOfferHelp'
import DiscountOffers from './components/BecomeHost/Guests/DiscountOffers'
import DiscountHelper from './components/BecomeHost/Guests/DiscountHelper'
import WhatToExpect from './components/BecomeHost/Guests/WhatToExpect'
import Laws from './components/BecomeHost/Guests/Laws'
import Publish from './components/BecomeHost/Publish'

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
    Preview,
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
    Calendar,
    Pricing,
    PricingHelp,
    SpecialOffer,
    SpecialOfferHelp,
    DiscountOffers,
    DiscountHelper,
    WhatToExpect,
    Laws,
    Publish,
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
      complete: false,
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
        // starts at page 11 ergo page 11 is page 1 for step 3
        progress = parseInt(((this.page - 10) / 14) * 100)
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

      if (this.page > 25) this.page = 30
    },
    gotoPage(page) {
      this.page = page
    },
    toggleCheckpoint() {
      if (!this.checkpoint) this.persist()

      this.checkpoint = !this.checkpoint
    },
    stepOneReview() {
      this.noteLastPage()

      this.step = 1
      this.page = 1
      this.review = true
    },
    proceedStepTwo() {
      let lastPageNumber = this.$store.getters.lastPageNumber
      this.step = 2
      // this.page = 8
      if (this.page < 8 || this.page > 10) {
        if (lastPageNumber > 7 && lastPageNumber < 11) {
          this.page = lastPageNumber
        } else {
          this.page = 8
        }
      }
    },
    stepTwoReview() {
      this.noteLastPage()

      this.step = 2
      this.page = 8
      this.review = true
    },
    proceedStepThree() {
      let lastPageNumber = this.$store.getters.lastPageNumber
      this.step = 3
      // this.page = 11
      if (this.page < 11 || this.page > 25) {
        if (lastPageNumber > 10 && lastPageNumber < 26) {
          this.page = lastPageNumber
        } else {
          this.page = 11
        }
      }
    },
    stepThreeReview() {
      this.noteLastPage()

      this.step = 3
      this.page = 11
      this.review = true
    },
    noteLastPage() {
      this.$store.dispatch('updateProgress', {
        lastPageNumber: this.page,
      })
    },
    saveAndExit() {
      this.exitBtnClicked = true
    },
    publishListing() {
      //
    },
    persist() {
      var url = ''
      if (this.$store.getters.listing_id) {
        url = 'user/listings/' + this.$store.getters.listing_id + '/update'
      } else {
        url = 'user/listings/create'
      }

      this.$http
        .post(url, this.$store.state.listing, {
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
    async reload() {
      let response = await this.$http.get('user/listings/unpublished', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      return response.data
    },
    previewListing() {
      let routeData = this.$router.resolve({
        name: 'listingPreview',
        query: { listing: this.$store.getters.listing_id },
      })
      window.open(routeData.href, '_blank')
    },
    updateStatusFromState(listing, step, page, status, checkpoint) {
      if (step) this.step = step

      if (page) this.page = page

      if (status) {
        this.checkpoint = checkpoint

        this.complete = status == 'complete'
      }

      if (this.complete && this.page < 30) this.review = true

      this.listing = listing
    },
  },
  watch: {
    checkpoint: {
      immediate: true,
      handler: function(checkpoint) {
        if (checkpoint) {
          this.exitBtnClicked = false

          if (this.review) this.review = false
        }
      },
    },
    page: {
      immediate: true,
      handler: function(page) {
        if (page == 30) {
          this.complete = true
        }
      },
    },
  },
  created() {
    if (!this.$store.state.isLogged) {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    } else {
      if (!this.$store.getters.listingExists) {
        this.reload().then(data => {
          if (data.found) {
            this.$store.dispatch('reloadListingFromDatabase', data.listing)
            this.updateStatusFromState(
              this.$store.state.listing,
              this.$store.getters.step,
              this.$store.getters.page,
              this.$store.getters.status,
              this.$store.getters.checkpoint
            )
          }
        })
      } else {
        this.updateStatusFromState(
          this.$store.state.listing,
          this.$store.getters.step,
          this.$store.getters.page,
          this.$store.getters.status,
          this.$store.getters.checkpoint
        )
      }
    }
  },
}
</script>
