<template>
  <v-hover  v-slot="{ hover }"
            open-delay="200">
  <v-card class="user-card xyz-in" :elevation="hover ? 8 : 3">
    <v-card-subtitle :style="{color: hover? 'blue': 'inherit'}">@{{user.username}}</v-card-subtitle>
    <v-card-title>{{user.name}}</v-card-title>
    <v-card-text>{{user.email}}, {{user.phone}}</v-card-text>
  </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "UserItem",
  props: ["user"],

}
</script>

<style lang="scss" scoped>
.user-card {
  margin: 10px;
  cursor: pointer;
  height: 200px;

}
</style>