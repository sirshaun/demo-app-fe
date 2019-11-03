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
              {{ amenity }}
              {{ extraText(amenity) }}
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
              {{ amenity }}
              {{ extraText(amenity) }}
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
              {{ amenity }}
              {{ extraText(amenity) }}
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
              {{ amenity }}
              {{ extraText(amenity) }}
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
              {{ amenity }}
              {{ extraText(amenity) }}
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
              {{ amenity }}
              {{ extraText(amenity) }}
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
              v-for="(amenity, index) in notIncludedAmenities"
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
        'Iron',
        'Air conditioning',
        'Desk/workplace',
        'Essentials',
        'TV',
        'Heating',
      ],
      facilityAmenities: ['Parking', 'Elevator', 'Hot tub', 'Gym', 'Pool'],
      diningAmenities: ['Breakfast,coffee,tea', 'Kitchen'],
      guestAccessAmenity: ['Private entrance', 'Private living room'],
      bedAndBathAmenities: [
        'Hnagers',
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
        'Washing machine',
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
      return this.basicAmenities.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return e
        }
      })
    },
    selectedFacilityAmenities() {
      return this.facilityAmenities.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return e
        }
      })
    },
    selectedDiningAmenities() {
      return this.diningAmenities.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return e
        }
      })
    },
    selectedGuestAccessAmenities() {
      return this.guestAccessAmenity.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return e
        }
      })
    },
    selectedBedsAndBathAmenities() {
      return this.bedAndBathAmenities.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return e
        }
      })
    },
    selectedSafetyFeaturesAmenities() {
      return this.safetyFeaturesAmenities.filter(e => {
        if (this.amenities.includes(e)) {
          this.removeFromNotIncludedArray(e)

          return e
        }
      })
    },
  },
  methods: {
    extraText(val) {
      if (val == 'Carbon monoxide detector')
        return "The host hasn't reported a carbon monoxide detector on the property."

      if (val == 'Smoke detector')
        return "The host hasn't reported a smoke detector on the property."

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
