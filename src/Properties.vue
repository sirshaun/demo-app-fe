<template>
  <div>
    <Navigation />

    <div class="bg-gray-200">
      <h1
        class="px-10 text-2xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-snug"
      >
        Featured
        <span class="text-indigo-500">properties</span>
      </h1>

      <div
        class="min-h-screen px-12 inline-flex items-center justify-center"
        v-for="(property, index) in properties"
        :key="index"
      >
        <PropertyCard :property="property" />
      </div>
    </div>

    <BackButton />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import PropertyCard from "./components/PropertyCard";
import BackButton from "./components/BackButton";

export default {
  components: { PropertyCard, Navigation, BackButton },
  props: ["city"],
  data() {
    return {
      properties: [],
      searchTerm: ""
    };
  },
  methods: {
    fetchProperties() {
      let url =
        typeof this.city == "undefined"
          ? "/property/"
          : "/property/?term=" + this.city;

      this.$http.get(url).then(
        res => {
          this.properties = res.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.fetchProperties();
  }
};
</script>
