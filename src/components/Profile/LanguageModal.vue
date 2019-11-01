<template>
  <Modal
    @close-modal="closeModal"
    :show="modalOn"
    :prevent-background-scrolling="true"
  >
    <div
      class="modal-container bg-white md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-3/4"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <div class="cursor-pointer z-50 mb-6" @click="closeModal">
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

        <div class="">
          <div class="leading-normal mb-6">
            <p class="text-2xl font-bold">Languages I Speak</p>
            <p class="text-sm font-light">
              We have many international travelers who appreciate hosts who can
              speak their language.
            </p>
          </div>

          <div
            v-for="(chkBx, index) in languageCheckboxes"
            :key="index"
            class="py-1"
          >
            <input
              type="checkbox"
              :id="chkBx.language"
              :name="chkBx.language"
              :checked="chkBx.checked"
              @click="addLanguage(chkBx.language)"
            />
            <label
              :for="chkBx.language"
              class="ml-1 font-light inline-block w-11/12"
              >{{ chkBx.language }}</label
            >
          </div>

          <div class="mt-2">
            <button
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="updateLanguagesSpoken"
            >
              Done
            </button>
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
    languagesSelected: {
      type: Array,
      default: () => [],
    },
    modalOn: { type: Boolean },
  },
  data() {
    return {
      languages: [],
      spokenLanguages: [],
    }
  },
  computed: {
    languageCheckboxes() {
      return this.languages.map(lng => {
        return {
          language: lng,
          checked: this.languagesSelected.includes(lng),
        }
      })
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-language-modal')
    },
    updateLanguagesSpoken() {
      this.$emit(
        'update-languages-spoken',
        this.mergeArrays(this.spokenLanguages, this.languagesSelected)
      )

      this.closeModal()
    },
    fetchLanguages() {
      this.$http.get('/language').then(
        res => {
          this.languages = res.data
        },
        error => {
          console.log(error)
        }
      )
    },
    addLanguage(lng) {
      this.spokenLanguages.push(lng)
    },
    mergeArrays(...arrays) {
      let jointArray = []

      arrays.forEach(array => {
        jointArray = [...jointArray, ...array]
      })
      const uniqueArray = jointArray.reduce((newArray, item) => {
        if (newArray.includes(item)) {
          return newArray
        } else {
          return [...newArray, item]
        }
      }, [])
      return uniqueArray
    },
  },
  mounted() {
    this.fetchLanguages()
  },
}
</script>
