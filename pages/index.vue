<template>
    <div class="container">
      <h1>Тестовое задание</h1>
      <p>Этот проект реализован на Nuxt3 Composition API + Tailwind + Type Script</p>
      <nuxt-link to="/posts">открыть таблицу</nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    font-size: 3em;
    margin-bottom: 0.5em;
  }
  
  p {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  </style>
  