<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/HeaderMenu.vue'
</script>

<template>
  <div>
    <Header />
    <div class="min-h-screen px-4 pt-16 movie-list">
      <RouterView />
    </div>
  </div>
</template>
