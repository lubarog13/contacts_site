import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)
const baseURL = "https://jsonplaceholder.typicode.com/";
export default new Vuex.Store({
  state: {
    users: [],
    albums: {},
    posts: {},
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getUserAlbums: (state) => ({userId}) => {
      return state.albums[userId]
    },
    getUserPosts: (state) =>  ({userId}) => {
      return state.posts[userId]
    },
    getComments: (state) => ({userId, postId}) => {
      return state.posts[userId].filter(post => post.id===postId)[0].comments
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setAlbums(state, {userId, albums}) {
      state.albums[userId] = albums
    },
    setPosts(state, {userId, posts}) {
      state.posts[userId] = posts
    },
    setComments(state, {userId, postId, comments}) {
      state.posts[userId].filter(post => post.id===postId)[0].comments = comments
    }
  },
  actions: {
    async fetchUsers({state, commit}) {
      if (state.users.length===0) {
        await axios.get(baseURL + "users").then(res => {
          commit("setUsers", res.data)
        })
      }
    },
    fetchAlbums: async ({state, commit}, userId) => {
      let userAlbums = state.albums[userId]
      if (!userAlbums) {
        await axios.get(`${baseURL}albums?userId=${userId}`).then(res => {
          res.data.forEach(async (album) => {
            await axios.get(`${baseURL}photos?albumId=${album.id}`).then(res => {
              album.photos = res.data
            })
          })
          commit("setAlbums", {userId: userId, albums: res.data});
        })
      }
    },
    fetchPosts: async ({state, commit}, userId) => {
      let userPosts = state.posts[userId]
      if(!userPosts){
        await axios.get(`${baseURL}posts?userId=${userId}`).then(res => {
          commit('setPosts', {userId: userId, posts: res.data})
        })
      }
    },
    fetchComments: async ({state, commit}, {userId, postId}) => {
      console.log(postId)
      let post = state.posts[userId].filter(post => post.id===postId)[0]
      if(!post.comments){
        await axios.get(`${baseURL}posts/${postId}/comments/`).then(res => {
          console.log(postId, res.data)
          commit('setComments', {userId: userId, postId: postId, comments: res.data})
        })
      }
    }
  },
})
