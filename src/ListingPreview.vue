<template>
  <div class="" v-if="user.spokenLanguages">
    <Navigation :profileImage="user.profileImage" :isHost="!!user.host" />

    <div class="mt-22 bg-gray-200">
      <div class="flex flex-col text-gray-800">
        <div class="">
          <img
            class="object-cover w-full"
            style="height: 592px;"
            :src="
              cleanImagePath(
                'file:///Users/ItachiUchiha/Sites/demo-app-be/storage/app/images/airbnb-apartment-appartment-584399.jpg'
              )
            "
          />
        </div>
        <div class="flex">
          <div class="w-2/3">
            <div>Family home (<a>Edit listing</a>)</div>
            <div>{{ listing.suburb }}</div>
            <div>
              <span><!-- img here --></span>
              {{ 'private room in apartment' }}
            </div>
            <div>
              <!-- data we can get from the listing object -->
              <span>1 guest</span>
              <span>1 bedroom</span>
              <span>1 bed</span>
              <span>1 private bathroom</span>
            </div>

            <hr />

            <div>
              <a>Edit summary</a>
              <div>
                {{
                  'Nice quiet neighborhood, good for relaxation and family fun.'
                }}
              </div>

              <a>Contact host</a>
            </div>

            <hr />

            <div>
              <div>Amenities</div>
              <div class="flex justify-between">
                <div>
                  <span><!-- smoke detector img --></span>Smoke detector
                </div>
                <div>
                  <span><!-- smoke detector img --></span>Carbon monoxide
                  detector
                </div>
              </div>
              <div>
                <!-- calculated text -->
                The host hasn't reported smoke or carbon monoxide detectors on
                the property.
              </div>
              <div>
                <a>Show all (count) amenities</a>
              </div>
            </div>

            <hr />

            <div>
              <!-- Calendar availability goes here -->
            </div>

            <hr />

            <div>
              <div>No reviews (yet)</div>
              <div>
                Be one of the first guests to review Shaun's place to help them
                get started.
              </div>
              <div class="flex items-center">
                <div><!-- shield img goes here --></div>
                <div>
                  We’re here to help your trip go smoothly. Every reservation is
                  covered by Workcation’s <a>Guest Refund Policy</a>.
                </div>
              </div>
            </div>

            <hr />

            <div>
              <div class="flex items-center">
                <div>
                  <div>Hosted by {{ 'Shaun' }}</div>
                  <div>
                    Matabeleland South Province, Zimbabwe · Joined in December
                    2017
                  </div>
                </div>
                <div>
                  <!-- profile img goes here -->
                </div>
              </div>
              <div>
                <span><!-- verified img goes here --></span>
                Verified
              </div>
              <div>
                <a>Contact host</a>
              </div>
            </div>

            <hr />

            <div>
              <strong>Always communicate through Workcation</strong> · To
              protect your payment, never transfer money or communicate outside
              of the Airbnb website or app. <a>Learn more</a>
            </div>

            <hr />

            <div>
              <div>The neighbourhood</div>
              <div>
                Shaun’s place is located in Mount Waverley, Victoria, Australia.
              </div>
              <div>
                <!-- map goes here -->
              </div>
              <div>
                Exact location information is provided after a booking is
                confirmed.
              </div>
            </div>

            <hr />

            <div>
              <div>Things to keep in mind</div>
              <!-- data we can get from the listing object -->
              <div>Check-in: After 11AM</div>
            </div>

            <hr />

            <div>
              <div>House rules</div>
              <!-- house rules go here -->
            </div>

            <hr />

            <div>
              <div>Cancellations</div>
              <div>
                Flexible · Free cancellation for 48 hours
              </div>
              <div>
                After that, cancel up to 24 hours before check-in and receive a
                full refund, minus the service fee.
              </div>
              <a>Read more about the policy</a>
              <!-- click and show  -->
            </div>

            <hr />
          </div>
          <div class="w-1/3">
            <div class="border border-bg-gray-500 p-6">
              <div>{{ listing.basePrice }} <span>per night</span></div>

              <hr />

              <div>
                <!-- date inputs (check in / check out) -->
              </div>

              <div>
                <!-- guests input -->
              </div>

              <a>Check availability</a>
              <div>You won't be charged yet</div>

              <hr />

              <div>
                Enter dates and number of guests to check the total trip price,
                including additional fees and any taxes.
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>More homes you may like</div>
          <div><!-- More homes you may like slide --></div>

          <div>Things to do near this home</div>
          <div><!-- things to do near this home slide --></div>

          <div>Explore other options in and around Mount Waverley</div>
          <div>More places to stay in {{ listing.suburb }}:</div>
          <!-- property types as pills -->

          <!-- places nearby three columns -->
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Pluralize from 'pluralize'

import Navigation from './components/Navigation.vue'
import Footer from './components/Footer'

export default {
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      listing_id: this.$route.params.listing,
      listing: this.$store.state.listing,
      user: {},
    }
  },
  methods: {
    cleanImagePath(path) {
      if (process.env.VUE_APP_ENV == 'local') {
        var arr = path.split('/')

        return '/stock/' + arr[arr.length - 1]
      }

      return path
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
  },
  created() {
    if (this.listing_id != this.listing.id) {
      window.close()
    } else {
      this.fetchProfile()
    }
  },
}
</script>
