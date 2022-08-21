<template>
  <v-container class="user-page">
    <v-row v-if="user">
      <v-col md="4" cols="12" class="user-page__profile">
        <h1>{{user.name}}<a :href="'http://' + user.website"><v-chip label link class="user-page__website">сайт <v-icon size="10">mdi-open-in-new</v-icon></v-chip></a></h1>
        <v-row>
          <v-col>
            {{user.username}}
          </v-col>
          <v-col>
            <a :href="'mailto:'+user.email">{{user.email}}</a>
          </v-col>
        </v-row>
        <v-row><v-col>Телефон: <a :href="'tel:'+user.phone">{{user.phone}}</a></v-col></v-row>
        <v-row>
          <v-col><b>Адрес:</b> {{user.address.city}}, {{user.address.street}}, {{user.address.suite}}</v-col>
        </v-row>
        <v-row>
          <v-col><b>Компания:</b> {{user.company.name}}; <em>{{user.company.catchPhrase}}</em></v-col>
        </v-row>
      </v-col>
      <v-col md="8" cols="12" class="user-page__content">
        <AlbumsList v-if="page!=='posts'"></AlbumsList>
        <SearchInput @input="search" v-if="page!=='albums'"></SearchInput>
        <PostsList :search-string="searchString" v-if="page!=='albums'"></PostsList>
      </v-col>
    </v-row>
    <v-progress-circular class="user-page__progress" indeterminate :size="80" color="primary" v-else-if="user===null"/>
    <div class="user-page__error" v-else>
      <h2>Пользователь не найден</h2>
      <router-link :to="{name: 'users'}"><v-btn color="info"><v-icon left >mdi-arrow-left</v-icon> Назад</v-btn></router-link>
    </div>
  </v-container>
</template>

<script>
import AlbumsList from "@/components/AlbumsList";
import PostsList from "@/components/PostsList";
import {mapActions, mapGetters} from "vuex";
import SearchInput from "@/components/SearchInput";
export default {
  name: "UserPage",
  components: {SearchInput, PostsList, AlbumsList},
  data() {
    return {
      user: null,
      searchString: "",
    }
  },
  computed: {
    ...mapGetters({
      users: "getUsers"
    }),
    page() {
      return this.$route.query.page;
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: "fetchUsers"
    }),
    search(value) {
      this.searchString = value
    }
  },
  mounted() {
    if (this.users.length===0) {
      this.fetchUsers().then(() => {
        this.user = this.users.find(user => user.id == this.$route.params.id)
      })
    } else {
      this.user = this.users.find(user => user.id == this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.user-page {
  display: flex;
  min-height: 100%;
  animation: 1.5s fadeIn ease-out;
  &__profile {
    margin-top: 50px;
    h1 {
      display: inline-flex;
      align-items: flex-start;
    }
  }
  &__progress {
    margin: auto;
  }
  &__website {
    margin-left: 10px;
    font-weight: 300;
    font-size: 12px !important;
    position: relative;
    vertical-align: top;
    margin-top: 5px;
    padding: 0 20px 0 5px !important;
    float: right;
    height: 20px !important;
    .v-icon {
      margin-left: 5px;
      position: absolute !important;
      right:  3px;
      top: 3px;
    }
  }
  &__error {
    margin: auto;
  }
  a {
    text-decoration: none;
  }
}
</style>