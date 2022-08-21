<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="40"
      />

      <router-link :to="{name: 'users'}"><div
          class="title shrink mt-1 hidden-sm-and-down">Список контактов</div></router-link>
    </div>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit !important;
  .title {
    font-weight: bold;
  }
}
</style>