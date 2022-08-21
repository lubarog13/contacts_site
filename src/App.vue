<template>
  <v-app>
    <HeaderComponent/>
    <v-main>
      <router-view/>
    </v-main>
    <FooterComponent></FooterComponent>
  </v-app>
</template>

<script>

import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  name: 'App',
  components: {FooterComponent, HeaderComponent},
  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
}
.row {
  max-width: 100%;
}
h2 {
  margin: 20px 30px;
  font-size: 30px;
  @media (max-width: 400px) {
    margin: 15px 20px;
    font-size: 25px;
  }
}
</style>
