import { defineStore } from 'pinia'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    async fetchPosts() {
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      this.posts = response.data
    },
    sortPostsById() {
      this.posts.sort((a, b) => a.id - b.id)
    },
    async addPost(newPost: Omit<Post, 'id'>) {
      const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', newPost)
      this.posts.unshift(response.data)
    },
  },
})
