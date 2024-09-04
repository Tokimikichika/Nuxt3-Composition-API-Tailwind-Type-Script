<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Posts</h1>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2 cursor-pointer" @click="sortById">ID</th>
            <th class="border border-gray-300 p-2">Title</th>
            <th class="border border-gray-300 p-2">Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in paginatedPosts" :key="post.id">
            <td class="border border-gray-300 p-2">{{ post.id }}</td>
            <td class="border border-gray-300 p-2">{{ post.title }}</td>
            <td class="border border-gray-300 p-2">{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center mt-4">
        <button
          class="bg-blue-500 text-white p-2 mx-1"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Prev
        </button>
        <button
          class="bg-blue-500 text-white p-2 mx-1"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
      <div v-if="loading" class="text-center mt-4">
        <span>Loading...</span>
      </div>
  
      <button
        class="bg-green-500 text-white p-2 mt-4"
        @click="showModal = true"
      >
        Add New Post
      </button>
  
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-4 rounded shadow-lg w-1/2">
          <h2 class="text-xl font-bold mb-4">New Post</h2>
          <input
            v-model="newPost.title"
            class="border border-gray-300 p-2 w-full mb-4"
            placeholder="Title"
          />
          <textarea
            v-model="newPost.body"
            class="border border-gray-300 p-2 w-full mb-4"
            placeholder="Body"
          ></textarea>
          <button class="bg-blue-500 text-white p-2" @click="addPost">Save</button>
          <button class="bg-red-500 text-white p-2 ml-2" @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { usePostsStore } from '@/stores/posts'
  
  const store = usePostsStore()
  const loading = ref(false)
  const currentPage = ref(1)
  const postsPerPage = 10
  
  const fetchPosts = async () => {
    loading.value = true
    await store.fetchPosts()
    loading.value = false
  }
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage
    const end = start + postsPerPage
    return store.posts.slice(start, end)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(store.posts.length / postsPerPage)
  })
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const sortById = () => {
    store.sortPostsById()
  }
  
  const showModal = ref(false)
  const newPost = ref({
    title: '',
    body: '',
  })
  
  const addPost = async () => {
    if (newPost.value.title && newPost.value.body) {
      await store.addPost(newPost.value)
      showModal.value = false
      newPost.value = { title: '', body: '' } 
    }
  }
  
  onMounted(() => {
    fetchPosts()
  })
  </script>
  