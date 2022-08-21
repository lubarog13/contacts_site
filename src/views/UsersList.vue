<template>
<v-container class="users-list">
  <h2>Список пользователей</h2>
  <SearchInput @input="search"/>
  <v-container class="users-list__grid" v-if="users.length>0">
    <v-flex d-flex>
      <v-layout wrap>
      <v-flex md4 v-for="user in filteredUsers" :key="user.id" class="users-list__group">
        <UserItem :user="user" @click.native="selectUser(user.id)"/>
      </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
  <v-progress-circular class="users-list__progress" indeterminate :size="80" color="primary" v-else></v-progress-circular>
</v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UserItem from "@/components/UserItem";
import SearchInput from "@/components/SearchInput";

export default {
  name: "UsersList",
  components: {SearchInput, UserItem},
  data() {
    return {
      filteredUsers: []
    }
  },
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
    },
    search(value) {
      this.filteredUsers = this.users.filter(user => user.name.includes(value) || user.username.includes(value) || user.email.includes(value) || user.phone.includes(value) || user.company.name.includes(value))
    }
  },
  mounted() {
    if (this.users.length===0) {
      this.getUsers().then(() => {
        this.filteredUsers = this.users
      })
    } else {
      this.filteredUsers = this.users
    }
  }
}
</script>

<style scoped lang="scss">
.users-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  height: 100%;
  &__group {
    --xyz-rotate-x: 90deg;
    --xyz-rotate-z: -180deg;
    --xyz-origin: -200%;
    --xyz-stagger: 0.1s;
    --xyz-duration: 1.5s;
    --xyz-perspective: 100px;
    --xyz-translate-z: 100px;
    --xyz-translate-y: 10vh;

  }
&__progress {
      margin: auto;
   }
}
</style>