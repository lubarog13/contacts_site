<template>

<div class="album" v-if="photos!==undefined">
  <v-carousel hide-delimiter-background
              show-arrows-on-hover>
    <v-carousel-item
        v-for="photo in photos.slice(0, 5)"
        :key="photo.id"
        :src="photo.thumbnailUrl"
        reverse-transition="fade-transition"
        transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</div>
  <v-skeleton-loader v-else
      class="mx-auto"
      max-width="300"
      type="card"
  ></v-skeleton-loader>
</template>

<script>
export default {
  name: "AlbumItem",
  props: ["photos"],
}
</script>

<style lang="scss">
.album {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
.v-carousel {
    height: 100% !important;
     &__item {
       height: 100% !important;
     }
   &__controls__item {
     width: 10px !important;
     height: 10px !important;
   }
    .mdi-chevron-right, .mdi-chevron-left {
      font-size: 20px !important;
    }
  }
}
.v-skeleton-loader {
  width: 90% !important;
  height: 200px;
}
</style>