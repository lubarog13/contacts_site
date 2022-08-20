<template>
<div class="posts">
  <h2>Посты пользователя:</h2>
  <v-list two-line v-if="posts">
    <div v-for="post in posts.slice((page-1) * 10, page * 10)" :key="post.id">
      <v-list-item>
      <v-list-item-content>
        <v-list-item-title v-text="post.title">
        </v-list-item-title>
        <v-card-text v-text="post.body">
        </v-card-text>
        <v-divider></v-divider>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="showComments(post)"><v-icon color="primary">mdi-message-text</v-icon></v-btn>
      </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <div class="posts__comments" v-if="post.showComments && post.comments">
          <h4>Комментарии:</h4>
          <v-list two-line>
            <v-list-item v-for="comment in post.comments" :key="comment.id">
              <v-list-item-content>
                <v-list-item-subtitle v-text="comment.name"></v-list-item-subtitle>
                <p>{{comment.body}}</p>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
        </div>
      </v-list-item>
    </div>
  </v-list>
  <v-skeleton-loader
      v-else
      type="article, actions"
  ></v-skeleton-loader>
  <div class="text-center"  v-if="posts && posts.length>10" >
    <v-pagination
        v-model="page"
        :length="Math.round(posts.length / 10) "
        circle
    ></v-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "PostsList",
  data() {
    return {
      page: 1,
      posts: null
    }
  },
  methods: {
    async showComments(post) {
      if (!post.comments) {
        await this.$store.dispatch("fetchComments",{userId:  this.$route.params.id, postId: post.id}).then(() => {
          post.showComments = !post.showComments
        })
      } else {
        post.showComments=!post.showComments
      }
      this.$forceUpdate()
    }
  },
  mounted() {
    this.$store.dispatch("fetchPosts", this.$route.params.id).then(() => {
      this.posts = this.$store.getters["getUserPosts"]({userId: this.$route.params.id})
    })
  }
}
</script>

<style lang="scss" scoped>
.posts {
  margin-top: 30px;
}
</style>