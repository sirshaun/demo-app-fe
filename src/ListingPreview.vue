<template>
  <div class="" v-if="user.spokenLanguages">
    <Navigation
      :profileImage="user.profileImage"
      :isHost="true"
      :sticky="false"
    />

    <div v-if="showSubNavBar">
      <nav class="nav-float-alt px-64 h-12 border-b border-gray-400">
        <div class="flex items-center justify-between h-full">
          <div class="flex items-center text-gray-600 h-full pt-3">
            <div
              class="mr-1 text-indigo-600 hover:text-indigo-200 cursor-pointer h-full border-b-2 border-gray-400"
            >
              Overview
            </div>
            <div class="mx-1 h-full">&bull;</div>
            <div
              class="mx-1 text-indigo-600 hover:text-indigo-200 cursor-pointer h-full"
            >
              Reviews
            </div>
            <div class="mx-1 h-full">&bull;</div>
            <div
              class="mx-1 text-indigo-600 hover:text-indigo-200 cursor-pointer h-full"
            >
              The Host
            </div>
            <div class="mx-1 h-full">&bull;</div>
            <div
              class="mx-1 text-indigo-600 hover:text-indigo-200 cursor-pointer h-full"
            >
              Location
            </div>
            <div class="mx-1 h-full">&bull;</div>
            <div
              class="ml-1 text-indigo-600 hover:text-indigo-200 cursor-pointer h-full"
            >
              Policies
            </div>
          </div>
          <div class="flex items-center text-gray-700 h-full">
            <div class="flex items-center cursor-pointer">
              <svg
                class="h-3 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" />
              </svg>
              Share
            </div>
            <div class="flex items-center cursor-pointer ml-5">
              <svg
                class="h-3 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
                />
              </svg>
              Save
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="bg-gray-100">
      <div class="flex flex-col text-gray-800">
        <div id="image-container" class="relative">
          <div
            class="absolute top-0 left-0 h-16 w-full bg-indigo-600 text-white md:px-64 md:py-5"
          >
            <div class="flex justify-between">
              <div class="font-light">
                <span class="font-medium">Preview mode:</span> This is how
                guests will receive your listing
              </div>
              <div>
                <router-link to="/become-a-host">
                  <a class="border border-white rounded px-3 py-2"
                    >Edit listing</a
                  >
                </router-link>
              </div>
            </div>
          </div>
          <img
            class="object-cover w-full"
            style="height: 690px;"
            :src="listingSplashImage"
          />
        </div>
        <div class="px-64 flex">
          <div class="w-2/3 m-6">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-3xl font-semibold">
                  {{ listing.title }} (<a
                    class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                    >Edit listing</a
                  >)
                </div>
                <div class="font-light">{{ listing.suburb }}</div>
              </div>
              <div class="text-center">
                <img
                  class="w-16 h-16 rounded-full mx-auto"
                  :src="user.profileImage"
                />
                <div class="text-sm font-light">{{ 'Shaun' }}</div>
              </div>
            </div>
            <div class="flex items-center mt-4">
              <span>
                <svg
                  class="h-3 mr-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z" />
                </svg>
              </span>
              <span class="font-semibold tracking-wide">{{
                'private room in apartment'
              }}</span>
            </div>
            <div class="w-2/3 ml-6 flex justify-between font-light">
              <span>{{ pluralize('guest', listing.guests, true) }}</span>
              <span>{{ bedrooms }}</span>
              <span>{{ pluralize('bed', listing.beds, true) }}</span>
              <span>{{ bathrooms }}</span>
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                >Edit summary</a
              >
              <div class="my-4 font-light">
                {{ listing.description }}
              </div>

              <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                >Contact host</a
              >
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="font-semibold">Amenities</div>
              <div class="flex justify-between mt-4 w-5/6">
                <div class="flex items-center">
                  <span>
                    <svg
                      class="mr-3 h-3 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M17.16 6.42a8.03 8.03 0 0 0-3.58-3.58l-1.34 2.69a5.02 5.02 0 0 1 2.23 2.23l2.69-1.34zm0 7.16l-2.69-1.34a5.02 5.02 0 0 1-2.23 2.23l1.34 2.69a8.03 8.03 0 0 0 3.58-3.58zM6.42 2.84a8.03 8.03 0 0 0-3.58 3.58l2.69 1.34a5.02 5.02 0 0 1 2.23-2.23L6.42 2.84zM2.84 13.58a8.03 8.03 0 0 0 3.58 3.58l1.34-2.69a5.02 5.02 0 0 1-2.23-2.23l-2.69 1.34zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      />
                    </svg>
                  </span>
                  <span :class="{ 'line-through': !smokeDetectorPresent }"
                    >Smoke detector</span
                  >
                </div>
                <div class="flex items-center">
                  <span>
                    <svg
                      class="mr-3 h-3 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M17.16 6.42a8.03 8.03 0 0 0-3.58-3.58l-1.34 2.69a5.02 5.02 0 0 1 2.23 2.23l2.69-1.34zm0 7.16l-2.69-1.34a5.02 5.02 0 0 1-2.23 2.23l1.34 2.69a8.03 8.03 0 0 0 3.58-3.58zM6.42 2.84a8.03 8.03 0 0 0-3.58 3.58l2.69 1.34a5.02 5.02 0 0 1 2.23-2.23L6.42 2.84zM2.84 13.58a8.03 8.03 0 0 0 3.58 3.58l1.34-2.69a5.02 5.02 0 0 1-2.23-2.23l-2.69 1.34zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      />
                    </svg>
                  </span>
                  <span :class="{ 'line-through': !carbonDetectorPresent }"
                    >Carbon monoxide detector</span
                  >
                </div>
              </div>
              <div
                class="my-3 text-sm font-light tracking-wide"
                v-if="detectorText != ''"
              >
                {{ detectorText }}
              </div>
              <div>
                <a
                  class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                  @click="toggleModal"
                  >Show all {{ totalAmenities }} amenities</a
                >
              </div>
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <!-- Calendar availability goes here -->
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="mb-4 text-2xl font-semibold">No reviews (yet)</div>
              <div class="my-4 font-light">
                Be one of the first guests to review {{ user.first_name }}'s
                place to help them get started.
              </div>
              <div class="flex items-center">
                <div>
                  <svg
                    class="h-8 mr-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"
                    />
                  </svg>
                </div>
                <div class="font-light tracking-wide">
                  We’re here to help your trip go smoothly. Every reservation is
                  covered by Workcation’s
                  <a
                    class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                    >Guest Refund Policy</a
                  >.
                </div>
              </div>
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="mb-2 text-2xl font-semibold">
                    Hosted by {{ user.first_name }}
                  </div>
                  <div class="font-light">
                    {{ user.location }} &bull; Joined in
                    {{
                      new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                      }).format(dateJoined)
                    }}
                    {{ dateJoined.getFullYear() }}
                  </div>
                </div>
                <div>
                  <img
                    class="w-16 h-16 rounded-full mx-auto"
                    :src="user.profileImage"
                  />
                </div>
              </div>
              <div class="flex items-center my-3">
                <span>
                  <svg
                    class="h-3 mr-1 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 12a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4 2.75V20l-4-4-4 4v-8.25a6.97 6.97 0 0 0 8 0z"
                    />
                  </svg>
                </span>
                Verified
              </div>
              <div class="mt-6">
                <a
                  class="bg-transparent hover:bg-indigo-500 text-indigo-700 hover:text-white p-2 border border-indigo-500 hover:border-transparent rounded cursor-pointer"
                  >Contact host
                </a>
              </div>
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <span class="font-semibold tracking-wide"
                >Always communicate through Workcation</span
              >
              &bull; To protect your payment, never transfer money or
              communicate outside of the Workcation website or app.
              <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                >Learn more</a
              >
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="mb-4 text-2xl font-semibold">The neighbourhood</div>
              <div class="font-light">
                {{ user.first_name }}’s place is located in {{ vagueAddress }}.
              </div>
              <div class="my-4">
                <GmapMap
                  :center="coordinates"
                  :zoom="16"
                  map-type-id="terrain"
                  style="width: 690px; height: 350px"
                >
                  <GmapMarker
                    :clickable="true"
                    :draggable="true"
                    @click="center = coordinates"
                  />
                </GmapMap>
              </div>
              <div class="font-light">
                Exact location information is provided after a booking is
                confirmed.
              </div>
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="mb-4 text-2xl font-semibold">
                Things to keep in mind
              </div>
              <div>
                <span class="font-medium tracking-wide">Check-in:</span>
                {{ checkInTimes }}
              </div>
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="font-semibold">House rules</div>
              <!-- house rules go here -->
            </div>

            <hr class="border-gray-300 my-6" />

            <div>
              <div class="font-semibold">Cancellations</div>
              <div class="font-medium tracking-wide mt-4">
                Flexible · Free cancellation for 48 hours
              </div>
              <div class="font-light">
                After that, cancel up to 24 hours before check-in and receive a
                full refund, minus the service fee.
              </div>
              <a class="text-indigo-600 cursor-pointer hover:text-indigo-200"
                >Read more about the policy</a
              >
              <!-- click and show  -->
            </div>

            <hr class="border-gray-300 my-6" />
          </div>
          <div class="w-1/3 m-6">
            <CheckAvailability :listing="listing" :pluralize="pluralize" />
          </div>
        </div>
        <div class="px-64 mx-6">
          <div class="mb-4 text-2xl font-semibold">More homes you may like</div>
          <div><!-- More homes you may like slide --></div>

          <div class="mb-4 text-2xl font-semibold">
            Things to do near this home
          </div>
          <div><!-- things to do near this home slide --></div>

          <div class="mb-4 text-2xl font-semibold">
            Explore other options in and around Mount Waverley
          </div>
          <div class="font-light tracking-wide">
            More places to stay in {{ listing.suburb }}:
          </div>
          <!-- property types as pills -->

          <!-- places nearby three columns -->
        </div>
      </div>
    </div>

    <AmenitiesModal
      v-show="modalOn"
      :toggle-modal="toggleModal"
      :modalOn="modalOn"
      :amenities="mergedAmenities"
    />

    <Footer />
  </div>
</template>

<script>
import googlemap from '@/map/google-map.js'
import Pluralize from 'pluralize'

import Navigation from './components/Navigation'
import AmenitiesModal from './components/AmenitiesModal'
import CheckAvailability from './components/CheckAvailability'
import Footer from './components/Footer'

export default {
  components: {
    Navigation,
    AmenitiesModal,
    CheckAvailability,
    Footer,
  },
  data() {
    return {
      listing_id: this.$route.params.listing,
      listing: this.$store.state.listing,
      user: {},
      showSubNavBar: false,
      modalOn: false,
    }
  },
  computed: {
    listingSplashImage() {
      if (this.listing.photos.length) {
        return this.cleanImagePath(this.listing.photos[0])
      }

      return '/img/undraw_for_sale_viax.svg'
    },
    bedrooms() {
      if (this.listing.bedrooms.toLowerCase() == 'studio') {
        return '1 bedroom'
      }

      return this.listing.bedrooms
    },
    bathrooms() {
      var setting = this.listing.private ? 'private' : 'shared'

      return (
        this.listing.bathrooms +
        ' ' +
        setting +
        ' ' +
        this.pluralize('bath', this.listing.bathrooms, false)
      )
    },
    smokeDetectorPresent() {
      return this.listing.safetyAmenities.includes('Smoke detector')
    },
    carbonDetectorPresent() {
      return this.listing.safetyAmenities.includes('Carbon monoxide detector')
    },
    detectorText() {
      if (this.smokeDetectorPresent && this.carbonDetectorPresent) {
        return ''
      } else if (this.smokeDetectorPresent && !this.carbonDetectorPresent) {
        return "The host hasn't reported carbon monoxide detectors on the property."
      } else if (!this.smokeDetectorPresent && this.carbonDetectorPresent) {
        return "The host hasn't reported smoke detectors on the property."
      } else {
        return "The host hasn't reported smoke or carbon monoxide detectors on the property."
      }
    },
    totalAmenities() {
      return this.listing.safetyAmenities.length + this.listing.amenities.length
    },
    dateJoined() {
      if (!this.user.hasOwnProperty('created_at')) return new Date()

      var dateTime = this.user.created_at.split(' ')

      var date = dateTime[0].split('-')
      var yyyy = date[0]
      var mm = date[1] - 1
      var dd = date[2]

      var time = dateTime[1].split(':')
      var h = time[0]
      var m = time[1]
      var s = parseInt(time[2]) //get rid of that 00.0;

      return new Date(yyyy, mm, dd, h, m, s)
    },
    vagueAddress() {
      return (
        this.listing.suburb +
        ', ' +
        this.listing.state +
        ', ' +
        this.listing.countryLong
      )
    },
    coordinates() {
      return {
        lat: parseFloat(this.listing.latitude),
        lng: parseFloat(this.listing.longitude),
      }
    },
    checkInTimes() {
      if (this.listing.checkInStart.toLowerCase() == 'flexible')
        return 'Flexible'

      if (this.listing.checkInEnd != '')
        return this.listing.checkInStart + ' - ' + this.listing.checkInEnd

      if (this.listing.checkInEnd.toLowerCase() == 'flexible')
        return 'After ' + this.listing.checkInStart

      return this.listing.checkInStart
    },
    mergedAmenities() {
      return [
        ...this.listing.amenities,
        ...this.listing.safetyAmenities,
        ...this.listing.spaces,
      ]
    },
  },
  methods: {
    toggleModal() {
      this.modalOn = !this.modalOn
    },
    cleanImagePath(path) {
      if (process.env.VUE_APP_ENV == 'local') {
        var arr = path.split('/')

        return '/stock/' + arr[arr.length - 1]
      }

      return path
    },
    pluralize(word, count = 0, inclusive) {
      return Pluralize(word, count, inclusive)
    },
    fetchProfile() {
      this.$http
        .get('/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(
          res => {
            this.user = res.data.user
            // this.reviews = res.data.reviews
            // this.listings = res.data.listings
          },
          error => {
            console.log(error)
          }
        )
    },
    isElementInViewport(el) {
      const scroll = window.scrollY || window.pageYOffset
      const boundsTop = el.getBoundingClientRect().top + scroll

      const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
      }

      const bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight,
      }

      return (
        (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
        (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
      )
    },
  },
  created() {
    if (this.listing_id != this.listing.id) {
      window.close()
    } else {
      this.fetchProfile()
    }
  },
  mounted() {
    const listener = () => {
      const imageContainer = document.getElementById('image-container')

      if (!this.isElementInViewport(imageContainer)) {
        this.showSubNavBar = true
      } else {
        this.showSubNavBar = false
      }
    }

    window.addEventListener('scroll', listener)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', listener)
    })
  },
}
</script>
