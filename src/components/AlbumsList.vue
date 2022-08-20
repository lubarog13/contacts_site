<template>
<div class="albums">
  <h2>Список альбомов пользователя</h2>
  <v-container class="users-list__grid" v-if="userAlbums!==undefined && userAlbums!==null">
    <v-flex d-flex>
      <v-layout wrap >
        <v-flex v-for="album in userAlbums.slice((page-1)*2, page*2)" :key="album.id">
          <AlbumItem :photos="album.photos"/>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
  <v-progress-circular class="albums__progress" indeterminate :size="80" color="primary" v-else></v-progress-circular>
  <div class="text-center"  v-if="userAlbums" >
    <v-pagination
        v-model="page"
        :length="Math.round(userAlbums.length / 2) "
        circle
    ></v-pagination>
  </div>
</div>
</template>

<script>

import AlbumItem from "@/components/AlbumItem";
export default {
  name: "AlbumsList",
  components: {AlbumItem},
  data() {
    return {
      page: 1,
      userAlbums: null
    }
  },

  mounted() {
    this.$store.dispatch("fetchAlbums", this.$route.params.id).then(() => {
      this.userAlbums = this.$store.getters["getUserAlbums"]({userId: this.$route.params.id})
      let interval = setInterval(() => {
        if (this.userAlbums[this.userAlbums.length-1].photos!==undefined) {
          clearInterval(interval)
          this.$forceUpdate()
        }
      }, 200)
    })
  }
}
</script>

<style lang="scss">
.albums {
  display: flex;
  flex-direction: column;
  align-items: center;
  .flex {
    justify-content: center;
    display: flex;
  }
}
</style>