<template>
<div class="users-list">
  <v-container class="users-list__grid" v-if="users.length>0">
    <v-flex d-flex>
      <v-layout wrap>
      <v-flex md4 v-for="user in users" :key="user.id">
        <UserItem :user="user" @click.native="selectUser(user.id)"/>
      </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
  <v-progress-circular class="users-list__progress" indeterminate :size="80" color="primary" v-else></v-progress-circular>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UserItem from "@/components/UserItem";

export default {
  name: "UsersList",
  components: {UserItem},
  computed: {
    ...mapGetters({
      users: "getUsers"
    })
  },
  methods: {
    ...mapActions({
        "getUsers": "fetchUsers"
    }),
    selectUser(userId) {
      this.$router.push({name: "user", params: {id: userId}})
    }
  },
  mounted() {
    if (this.users.length===0) {
      this.getUsers()
    }
  }
}
</script>

<style scoped lang="scss">
.users-list {
  display: flex;
  width: 100%;
  height: 100%;
  &__progress {
      margin: auto;
   }
}
</style>