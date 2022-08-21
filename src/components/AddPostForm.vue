<template>
  <v-card class="add-post">
    <v-card-title>Новый пост</v-card-title>
<v-form v-model="valid">
  <v-text-field v-model="data.title" placeholder="Заголовок" :rules="textRules" filled required></v-text-field>
  <v-text-field v-model="data.body" placeholder="Текст" :rules="textRules" filled required></v-text-field>
  <v-btn type="button" color="primary" :disabled="!valid" @click="sendPost">Отправить</v-btn>
</v-form>
  </v-card>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "AddPostForm",
  props: ["userId"],
  data() {
    return {
      valid: false,
      data: {
        title: null,
        body: null
      },
      textRules: [
        v => !!v || 'Заполните поле',
      ],
    }
  },
  methods: {
    ...mapActions({
      addPost: "addUserPost"
    }),
    sendPost() {
      this.data.userId=this.userId
      this.addPost(this.data).then(() => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss">
.add-post {
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 300px;
  height: 400px;
  padding: 20px;
  z-index: 10;
  @media (max-width: 340px) {
    width: 250px;
  }
  form {
    display: flex;
    flex-direction: column;
    height: 250px;
  .v-btn {
    margin-top: auto;
  }
  }
}
</style>