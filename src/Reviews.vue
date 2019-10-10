<template>
  <div v-if="reviewsBy && reviewsAbout">
    <Navigation :profileImage="user.profileImage" />

    <div class="bg-gray-200">
      <h1
        class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
      >
        Reviews
        <span class="text-indigo-500">by you</span>
      </h1>

      <div class="container w-2/3 mx-auto px-6 py-10">
        <ul class="flex border-b border-gray-400">
          <li class="-mb-px mr-1" v-for="(tab, index) in tabs" :key="index">
            <a
              class="inline-block py-2 px-4 font-semibold"
              :class="{
                'text-indigo-600 border-b-4 border-gray-400': tab.active,
                'text-indigo-500 hover:text-indigo-200 cursor-pointer': !tab.active
              }"
              @click="toggleTabs(index)"
              >{{ tab.title }}</a
            >
          </li>
        </ul>

        <ReviewsAbout :reviews="reviewsAbout" v-show="showReviewsAbout" />
        <ReviewsBy
          :reviews="reviewsBy"
          :expired="expired"
          v-show="showReviewsBy"
        />
      </div>
    </div>

    <BackButton />

    <Footer />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import BackButton from "./components/BackButton";
import Footer from "./components/Footer";
import ReviewsAbout from "./components/Profile/ReviewsAbout";
import ReviewsBy from "./components/Profile/ReviewsBy";

export default {
  components: { Navigation, BackButton, ReviewsAbout, ReviewsBy, Footer },
  data() {
    return {
      reviewsAbout: [],
      reviewsBy: [],
      expired: [],
      user: {},
      tabs: [
        { title: "Reviews about you", active: true },
        { title: "Reviews by you", active: false }
      ]
    };
  },
  computed: {
    showReviewsBy() {
      if (typeof this.tabs[1] === "undefined") return false;

      return this.tabs[1].active;
    },
    showReviewsAbout() {
      if (typeof this.tabs[0] === "undefined") return false;

      return this.tabs[0].active;
    }
  },
  methods: {
    toggleTabs(index) {
      for (var i = this.tabs.length - 1; i >= 0; i--) {
        if (index == i) {
          this.tabs[i].active = true;
        } else {
          this.tabs[i].active = false;
        }
      }
    },
    fetchProfile() {
      this.$http
        .get("/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(
          res => {
            this.user = res.data.user;
            // this.reviews = res.data.reviews
            this.listings = res.data.listings;
          },
          error => {
            console.log(error);
          }
        );
    },
    fetchReviews() {
      this.$http
        .get("/user/reviews", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(
          res => {
            this.reviewsAbout = res.data.reviewsAbout;
            this.reviewsBy = res.data.reviewsBy;
            this.expired = res.data.expired;
          },
          error => {
            console.log(error);
          }
        );
    }
  },
  mounted() {
    if (!this.$store.state.isLogged) {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    } else {
      this.fetchReviews();

      this.fetchProfile();
    }
  }
};
</script>
