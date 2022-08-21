<template>
  <v-footer
      dark
      padless
  >
    <v-card
        flat
        tile
        width="100%"
        class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <a :href="links[index]" v-for="(icon, index) in icons"
           :key="icon">
        <v-btn
            class="mx-4 white--text"
            icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
        </a>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>lubarog13</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
    data: () => ({
      icons: [
        'mdi-github',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-gmail',
      ],
      links: [
          "https://github.com/lubarog13",
          "https://twitter.com/lubarog13",
          "https://www.linkedin.com/in/lubarog13/",
          "mailto:lubarog13@gmail.com"
      ]
    }),
}
</script>

<style lang="scss" scoped>

</style>