<template>
  <Modal
    @close-modal="toggleModal"
    :show="modalOn"
    :prevent-background-scrolling="true"
  >
    <div
      class="modal-container bg-white md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-3/4"
    >
      <div class="modal-content py-4 text-left px-8">
        <div class="cursor-pointer z-50 mb-6" @click="toggleModal">
          <svg
            class="h-5 text-gray-700 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </div>

        <div class="mb-10" style="width: 500px">
          <div class="leading-normal mb-6">
            <p class="text-2xl font-bold">Amenities</p>
          </div>

          <div class="" v-if="selectedBasicAmenities.length">
            <div class="text-lg font-medium mb-8">
              Basic
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in selectedBasicAmenities"
            >
              <span class="">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != selectedBasicAmenities.length - 1"
              />
            </div>
          </div>

          <div class="mt-10" v-if="selectedFacilityAmenities.length">
            <div class="text-lg font-medium mb-8">
              Facilities
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in selectedFacilityAmenities"
            >
              <span class="">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != selectedFacilityAmenities.length - 1"
              />
            </div>
          </div>

          <div class="mt-10" v-if="selectedDiningAmenities.length">
            <div class="text-lg font-medium mb-8">
              Dining
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in selectedDiningAmenities"
            >
              <span class="">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != selectedDiningAmenities.length - 1"
              />
            </div>
          </div>

          <div class="mt-10" v-if="selectedGuestAccessAmenities.length">
            <div class="text-lg font-medium mb-8">
              Guest access
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in selectedGuestAccessAmenities"
            >
              <span class="">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != selectedGuestAccessAmenities.length - 1"
              />
            </div>
          </div>

          <div class="mt-10" v-if="selectedBedsAndBathAmenities.length">
            <div class="text-lg font-medium mb-8">
              Beds and baths
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in selectedBedsAndBathAmenities"
            >
              <span class="">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != selectedBedsAndBathAmenities.length - 1"
              />
            </div>
          </div>

          <div class="mt-10" v-if="selectedSafetyFeaturesAmenities.length">
            <div class="text-lg font-medium mb-8">
              Safety features
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in selectedSafetyFeaturesAmenities"
            >
              <span class="">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != selectedSafetyFeaturesAmenities.length - 1"
              />
            </div>
          </div>

          <div class="mt-10" v-if="notIncludedAmenities.length">
            <div class="text-lg font-medium mb-8">
              Not included
            </div>
            <div
              class="flex flex-col text-gray-700 leading-relaxed"
              v-for="(amenity, index) in formattedNotIncludedAmenities"
            >
              <span class="line-through">{{ amenity }}</span>
              <span class="text-xs font-light">{{ extraText(amenity) }}</span>
              <hr
                class="border-gray-300 my-6"
                v-show="index != notIncludedAmenities.length - 1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  components: { Modal },
  props: {
    modalOn: { type: Boolean, default: false },
    amenities: { type: Array, required: true },
    toggleModal: { type: Function, required: true },
  },
  data() {
    return {
      basicAmenities: [
        'Fireplace',
        'Wifi',
        'Laundry - dryer',
        'Iron',
        'Air conditioning',
        'Desk/workplace',
        'Laundry - washer',
        'Essentials',
        'TV',
        'Heating',
      ],
      facilityAmenities: ['Parking', 'Elevator', 'Hot tub', 'Gym', 'Pool'],
      diningAmenities: ['Breakfast,coffee,tea', 'Kitchen'],
      guestAccessAmenity: ['Private entrance', 'Private living room'],
      bedAndBathAmenities: [
        'Closet/drawers',
        'Hair dryer',
        'Shampoo',
        'Lock on bedroom door',
      ],
      safetyFeaturesAmenities: [
        'Fire extinguisher',
        'Carbon monoxide detector',
        'Smoke detector',
        'First aid kit',
      ],
      notIncludedAmenities: [
        'Wifi',
        'Kitchen',
        'Hair dryer',
        'Shampoo',
        'Air conditioning',
        'Laundry - washer',
        'Essentials',
        'TV',
        'Heating',
        'Private entrance',
        'Carbon monoxide detector',
        'Smoke detector',
      ],
    }
  },
  computed: {
    selectedBasicAmenities() {
      return this.basicAmenities
        .filter(e => {
          if (this.amenities.includes(e)) {
            this.removeFromNotIncludedArray(e)

            return true
          }
        })
        .map(e => {
          if (e == 'Fireplace') {
            return 'Indoor fireplace'
          } else if (e == 'Desk/workplace') {
            return 'Laptop friendly workspace'
          } else if (e == 'Laundry - washer') {
            return 'Washing machine'
          } else if (e == 'Laundry - dryer') {
            return 'Dryer'
          } else if (e == 'Wifi') {
            return 'Wi-Fi'
          }

          return e
        })
    },
    selectedFacilityAmenities() {
      return this.facilityAmenities
        .filter(e => {
          if (this.amenities.includes(e)) {
            this.removeFromNotIncludedArray(e)
            return true
          }
        })
        .map(e => {
          if (e == 'Parking') {
            return 'Free parking on premises'
          }

          return e
        })
    },
    selectedDiningAmenities() {
      return this.diningAmenities
        .filter(e => {
          if (this.amenities.includes(e)) {
            this.removeFromNotIncludedArray(e)

            return true
          }
        })
        .map(e => {
          if (e == 'Breakfast,coffee,tea') {
            return 'Breakfast'
          }

          return e
        })
    },
    selectedGuestAccessAmenities() {
      return this.guestAccessAmenity.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return true
        }
      })
    },
    selectedBedsAndBathAmenities() {
      return this.bedAndBathAmenities
        .filter(e => {
          if (this.amenities.includes(e)) {
            this.removeFromNotIncludedArray(e)

            return true
          }
        })
        .map(e => {
          if (e == 'Closet/drawers') {
            return 'Hangers'
          }

          return e
        })
    },
    selectedSafetyFeaturesAmenities() {
      return this.safetyFeaturesAmenities.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return true
        }
      })
    },
    formattedNotIncludedAmenities() {
      return this.notIncludedAmenities.map(e => {
        if (e == 'Laundry - washer') {
          return 'Washing machine'
        } else if (e == 'Wifi') {
          return 'Wi-Fi'
        }

        return e
      })
    },
  },
  methods: {
    extraText(val) {
      if (val == 'Wi-Fi') {
        return 'Continuous access in the listing'
      }

      if (val == 'Dryer') {
        return 'In the building, free or for a fee'
      }

      if (val == 'Laptop friendly workspace') {
        return 'A table or desk with space for a laptop and a chair that’s comfortable to work in'
      }

      if (val == 'Essentials') {
        return 'Towels, bed sheets, soap and toilet paper'
      }

      if (val == 'Heating') {
        return 'Central heating or a heater in the listing'
      }

      if (val == 'Elevator') {
        return 'The home or building has a lift that’s at least 132cm deep and a doorway at least 81cm wide.'
      }

      if (val == 'Gym') {
        return 'Free, in the building or nearby'
      }

      if (val == 'Pool') {
        return 'Private or Shared'
      }

      if (val == 'Breakfast') {
        return 'Breakfast is provided'
      }

      if (val == 'Kitchen') {
        return 'Space where guests can cook their own meals'
      }

      if (val == 'Private entrance') {
        return 'Separate street or building entrance'
      }

      if (val == 'Lock on bedroom door') {
        return 'Private room can be locked for safety and privacy'
      }

      if (val == 'Carbon monoxide detector') {
        return "The host hasn't reported a carbon monoxide detector on the property."
      }

      if (val == 'Smoke detector') {
        return "The host hasn't reported a smoke detector on the property."
      }

      return ''
    },
    removeFromNotIncludedArray(val) {
      var index = this.notIncludedAmenities.indexOf(val)

      if (index >= 0) {
        this.notIncludedAmenities.splice(index, 1)
      }
    },
  },
}
</script>
