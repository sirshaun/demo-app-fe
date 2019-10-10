<template>
  <div class="flex flex-col">
    <h1 class="font-semibold text-2xl text-gray-900 px-4">
      What kind of place are you listing?
    </h1>

    <div class="flex flex-wrap mt-10">
      <div class="w-3/5 px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-listing"
        >
          First, let's narrow down things
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': listingError
            }"
            id="grid-listing"
            v-model="listing"
            @change="listingChanged"
          >
            <option v-for="(option, index) in listingOptions" :key="index">
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
        <p v-show="listingError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-8">
      <div class="w-3/5 px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-type"
        >
          Now choose a property type
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': typeError
            }"
            :disabled="listing == ''"
            id="grid-type"
            v-model="type"
          >
            <option v-for="(option, index) in typeOptions" :key="100 - index">
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
        <p v-show="typeError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
        <div class="font-light text-xs">{{ description }}</div>
      </div>
    </div>

    <div class="flex flex-wrap mt-8" v-show="totalRoomsOptionShow">
      <div class="w-3/5 px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-total-rooms"
        >
          How many total rooms does your property have?
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{
              'border-red-500 bg-red-100 mb-1': totalRoomsError
            }"
            id="grid-total-rooms"
            v-model="totalRooms"
          >
            <option
              v-for="(option, index) in totalRoomsOptions"
              :key="200 - index"
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
        <p v-show="totalRoomsError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-8" v-show="guestOptionShow">
      <div class="w-full px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-4"
          for="grid-type"
        >
          What will guests have?
        </label>
        <div
          class="mb-4"
          v-for="(option, index) in roomOptions"
          :key="300 - index"
        >
          <input
            type="radio"
            :id="option.key"
            :value="option.text"
            name="room"
            v-model="room"
          />
          <label
            :for="option.key"
            class="ml-1 font-light inline-block w-11/12"
            >{{ option.text }}</label
          >
          <div class="font-light text-sm tracking wide pl-4">
            {{ option.descr }}
          </div>
        </div>
        <p v-show="roomError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <div class="flex flex-wrap mt-8 mb-10" v-show="guestOptionShow">
      <div class="w-full px-3">
        <label
          class="block text-gray-600 tracking-wide text-light mb-2"
          for="grid-type"
        >
          Is this set up as a dedicated guest space?
        </label>
        <div class="mb-4">
          <input
            type="radio"
            id="yes"
            value="yes"
            name="space"
            v-model="space"
          />
          <label for="yes" class="ml-1 font-light inline-block w-11/12"
            >Yes, it’s primarily set up for guests</label
          >
        </div>
        <div class="mb-4">
          <input type="radio" id="no" value="no" name="space" v-model="space" />
          <label for="no" class="ml-1 font-light inline-block w-11/12"
            >No, I keep my personal belongings here
          </label>
        </div>
        <p v-show="roomError" class="text-red-500 text-xs italic">
          Please select an option
        </p>
      </div>
    </div>

    <CaseModal @close-case-modal="toggleModal" v-if="caseModal" />

    <Footer :back="back" :next="proceed" :checkpoint="updateAndExit" />
  </div>
</template>

<script>
import CaseModal from "@/components/BecomeHost/CaseModal";
import Footer from "@/components/BecomeHost/Footer";

export default {
  components: { CaseModal, Footer },
  props: {
    next: { type: Function, required: true },
    checkpoint: { type: Function, required: true },
    exitBtnClicked: { type: Boolean, required: true }
  },
  data() {
    return {
      listing: "",
      listingOptions: ["Apartment", "House", "Bed and Breakfast"],
      type: "",
      caseModal: false,
      caseParticularTypes: [
        "Bed and breakfast",
        "Casa particular (Cuba)",
        "Minsu (Taiwan)",
        "Nature lodge",
        "Pension (South Korea)",
        "Ryokan (Japan)",
        "Serviced apartment"
      ],
      totalRooms: "",
      totalRoomsOptions: [
        "2-5",
        "6-10",
        "11-20",
        "21-30",
        "31-40",
        "41-50",
        "50+"
      ],
      room: "",
      roomOptions: [
        {
          key: "entire",
          text: "Entire place",
          descr:
            "Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen."
        },
        {
          key: "private",
          text: "Private room",
          descr:
            "Guests have their own private room for sleeping. Other areas could be shared."
        },
        {
          key: "shared",
          text: "Shared room",
          descr:
            "Guests sleep in a bedroom or a common area that could be shared with others."
        }
      ],
      space: "",
      totalRoomsOptionShow: false,
      guestOptionShow: false,
      listingError: false,
      typeError: false,
      totalRoomsError: false,
      roomError: false,
      spaceError: false
    };
  },
  computed: {
    typeOptions() {
      if (this.listing == "Apartment") {
        return [
          "Apartment",
          "Condominium",
          "Casa particular (Cuba)",
          "Loft",
          "Serviced apartment"
        ];
      }
      if (this.listing == "House") {
        return [
          "House",
          "Bungalow",
          "Cabin",
          "Casa particular (Cuba)",
          "Chalet",
          "Cottage",
          "Cycladic house",
          "Dammuso (Italy)",
          "Dome house",
          "Earth house",
          "Farm stay",
          "Houseboat",
          "Hut",
          "Lighthouse",
          "Pension (South Korea)",
          "Sherperd's hut (U.K., France)",
          "Tiny house",
          "Townhouse",
          "Trullo (italy)",
          "Villa"
        ];
      }
      if (this.listing == "Bed and Breakfast") {
        return [
          "Bed and breakfast",
          "Casa particular (Cuba)",
          "Farm stay",
          "Minsu (Taiwan)",
          "Nature lodge",
          "Ryokan (Japan)"
        ];
      }

      return [];
    },
    description() {
      switch (this.type) {
        case "Apartment":
          return "Apartments are typically located in multi-unit residential buildings or complexes where other people live.";
        case "Condominium":
          return "Condominiums or condos are units typically located in multi-unit residential buildings or complexes where other people live. Condos are owned by individuals whereas apartments are usually owned by a property management group.";
        case "Casa particular (Cuba)":
          return "A casa particular is a type of accommodation found in Cuba that may be more like a private apartment or a room in a bed and breakfast.";
        case "Loft":
          return "A loft is a space - usually an apartment or condo - with an open layout. Most or all walls in a loft do not fully extend to the ceiling.";
        case "Serviced apartment":
          return "Serviced apartments are furnished and serviced by professional management companies. They offer hotel-like amenities such as daily cleaning, laundry service, concierge and a front desk, making them popular choices for corporate housing and guests staying longer than 30 days.";
        case "House":
          return "Houses are residential buildings that are often stand-alone structures. Some houses, like duplexes, may share walls or outdoor areas with other houses.";
        case "Bungalow":
          return "Bungalows are houses with architectural features like a wide front verandah and a sloping roof. They’re usually single-level homes.";
        case "Cabin":
          return "Cabins are houses built with natural materials like logs and wood. They’re often located in natural settings like forests and mountains.";
        case "Chalet":
          return "Chalets are houses that are usually made of wood and have a sloping roof. Many are holiday homes in locations popular for skiing or summer homes.";
        case "Cottage":
          return "Cottages are cosy homes. They’re often located in rural areas or near a lake or beach.";
        case "Cycladic house":
          return "Cycladic houses are traditional whitewashed houses with cubic shapes and flat roofs. Their unique style is found in the Cyclades—a group of Greek islands.";
        case "Dammuso (Italy)":
          return "Dammusos are stone houses with wide walls and domed roofs - an architectural style unique to the island of Pantelleria in Italy.";
        case "Dome house":
          return "Dome houses have a hemispherical roof or may feature a completely spherical construction. Geodesic domes and bubble homes are types of dome houses.";
        case "Earth house":
          return "Earth houses are homes that are built into the earth or made out of natural materials like terrain or rammed earth.";
        case "Farm stay":
          return "Farm stays are professionally-managed accommodation in agricultural settings where guests may interact with animals or enjoy recreational activities like hiking or arts and crafts.";
        case "Houseboat":
          return "Houseboats are boats that are more like homes and are often set up as a primary residence. Choose 'houseboat' if you have a floating home.";
        case "Hut":
          return "Huts are made from simple materials like wood or mud and often have thatched roofs made of straw.";
        case "Lighthouse":
          return "A lighthouse is a tower with a bright light, originally built to help ships navigate waterways. They’re usually found on the coast near large bodies of water.";
        case "Pension (South Korea)":
          return "Pensions are Korean holiday homes often found in the countryside. They often have barbecues and other communal spaces that make them a good choice for groups and families.";
        case "Sherperd's hut (U.K, France)":
          return "Shepherd’s huts are tiny wagons on wheels originally used by shepherds on the move with their sheep.";
        case "Tiny house":
          return "Tiny houses are stand-alone houses that are very small in size and have compact interior living spaces. They’re usually less than 37 square metres (400 square feet).";
        case "Townhouse":
          return "Townhouses, row houses and terraced houses are private units that share walls and may share outdoor spaces with other units.";
        case "Trullo (Italy)":
          return "A trullo is a round, stone house with a cone-shaped roof that originated in the Apulia region of Italy.";
        case "Villa":
          return "Villas are luxurious homes that tend to have outdoor-indoor spaces and large yards, gardens or pools.";
        case "Bed and breakfast":
          return "Bed and breakfasts are professional hospitality businesses that offer breakfast for guests. A host usually lives on the property.";
        case "Minsu (Taiwan)":
          return "Minsus are professionally managed accommodation in Taiwan that offer private rooms for guests";
        case "Nature lodge":
          return "Nature lodges are professional hospitality businesses located in natural settings like forests and mountains.";
        case "Ryokan (Japan)":
          return "Ryokans are traditional Japanese inns that usually have a small number of professionally managed rooms and offer a cultural experience for guests.";
        default:
          return "";
      }
    },
    errors() {
      return (
        this.listingError || this.typeError || this.roomError || this.spaceError
      );
    }
  },
  methods: {
    listingChanged() {
      this.guestOptionShow = false;
    },
    checkListing() {
      this.listingError = this.listing == "";
    },
    checkType() {
      this.typeError = this.type == "";
    },
    checkTotalRooms() {
      if (this.totalRoomsOptionShow) {
        this.totalRoomsError = this.totalRooms == "";
      }
    },
    checkRoom() {
      this.roomError = this.room == "";
    },
    checkSpace() {
      this.spaceError = this.space == "";
    },
    back() {
      // TODO: go back to site
    },
    proceed() {
      this.checkListing() ||
        this.checkType() ||
        this.checkTotalRooms() ||
        this.checkRoom() ||
        this.checkSpace();

      if (!this.errors) this.updateAndContinue();
    },
    updateListingState() {
      this.$store.dispatch("updatePlaceType", {
        listing: this.listing,
        property: this.type,
        rooms: this.totalRooms,
        roomType: this.room,
        spaceType: this.space
      });

      this.$store.dispatch("updateProgress", {
        progress: "step one in progress"
      });
    },
    updateAndContinue() {
      this.updateListingState();

      this.next();
    },
    updateAndExit() {
      this.updateListingState();

      this.checkpoint();
    },
    toggleModal() {
      this.caseModal = !this.caseModal;
    },
    initializeValues() {
      let listing = this.$store.state.listing;

      if (listing.hasOwnProperty("listing")) this.listing = listing.listing;

      if (listing.hasOwnProperty("property")) this.type = listing.property;

      if (listing.hasOwnProperty("rooms")) this.totalRooms = listing.rooms;

      if (listing.hasOwnProperty("roomType")) this.room = listing.roomType;

      if (listing.hasOwnProperty("spaceType")) this.space = listing.spaceType;
    }
  },
  watch: {
    type: {
      immediate: true,
      handler: function(type) {
        this.caseModal = this.caseParticularTypes.includes(type);

        if (type != "") this.guestOptionShow = true;

        this.totalRoomsOptionShow =
          this.type == "Pension (South Korea)" ||
          this.type == "Bed and breakfast" ||
          this.type == "Ryokan (Japan)";
      }
    },
    exitBtnClicked: {
      immediate: true,
      handler: function(exitBtnClicked) {
        if (exitBtnClicked) this.updateAndExit();
      }
    }
  },
  created() {
    this.initializeValues();
  }
};
</script>
