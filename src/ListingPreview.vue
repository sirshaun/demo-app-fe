<template>
  <div>{{ listing }}</div>
</template>

<script>
export default {
  data() {
    return {
      listing_id: this.$route.params.listing,
      listing: this.$store.state.listing,
    }
  },
  created() {
    if (this.listing_id != this.listing.id) {
      window.close()
    }
  },
}
</script>
