<template>
  <div class="mt-6 mb-20">
    <div class="block tracking-wide text-gray-700 font-bold mb-4">
      Details guests must know about your home
    </div>

    <AddExtraDetail
      v-for="(option, index) in options"
      :option="option"
      :index="index"
      :key="index"
      :add-detail="addDetail"
      :remove-detail="removeDetail"
      :update-detail-description="updateDetailDescription"
      :initial-details="extraDetails[index]"
    />
  </div>
</template>

<script>
import AddExtraDetail from './AddExtraDetail'

export default {
  components: { AddExtraDetail },
  props: {
    initialExtraDetails: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      extraDetails: this.initialExtraDetails,
      options: [
        {
          text: 'Must climb stairs',
          descr: 'Describe the stairs (for example, how many flights)',
        },
        {
          text: 'Potential for noise',
          descr: 'Describe the noise and when it’s likely to take place',
        },
        {
          text: 'Pet(s) live on property',
          descr: 'Describe the pets you have',
        },
        {
          text: 'No parking on property',
          descr: 'Describe the parking situation around your listing',
        },
        {
          text: 'Some spaces are shared',
          descr: 'Describe the spaces the guests will share',
        },
        {
          text: 'Amenity limitations',
          descr:
            'Describe an amenity or service that’s limited, such as weak Wi-Fi or limited hot water',
        },
        {
          text: 'Surveillance or recording devices on property',
          descr:
            'Describe any device that records or sends video, audio, or still images. Specify each device’s location and whether it will be on or off. Learn more',
          link: '',
        },
        {
          text: 'Weapons on property',
          descr:
            'Describe any weapons (firearms, airguns, tasers, etc.), their location, and how they’re secured Learn more',
          link: '',
        },
        {
          text: 'Dangerous animals on property',
          descr:
            'Describe any domesticated or wild animals that could be a health or safety risk to guests or other animals Learn more',
          link: '',
        },
      ],
    }
  },
  methods: {
    addDetail(index, detail) {
      this.extraDetails[index] = detail

      this.updateDetails()
    },
    removeDetail(index) {
      this.extraDetails.splice(index, 1)

      this.updateDetails()
    },
    updateDetails() {
      this.$emit('update-checked-details', this.extraDetails)
    },
    updateDetailDescription(index, description) {
      this.extraDetails[index].description = description
    },
  },
}
</script>
