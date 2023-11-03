<template>
  <div class="flex justify-between space-x-2 text-center">
    <input v-model="search" type="text" placeholder="Search by Title" class="w-full rounded-lg search-movie" />
    <span class="space-x-2">
      <button class="rounded-lg btn--search" @click="searchMovie(search)">Search</button>
    </span>
  </div>
  <div v-if="!movieData?.Response" class="w-full max-w-sm p-4 mx-auto space-y-2">
    <div class="animate-pulse">
      <div class="w-10 h-10 mx-auto mb-4 bg-blue-300 rounded-lg"></div>
      <div class="flex-1 py-1 space-y-6">
        <div class="h-2 bg-blue-300 rounded"></div>
      </div>
    </div>
    <div class="animate-pulse">
      <div class="w-10 h-10 mx-auto mb-4 bg-blue-300 rounded-lg"></div>
      <div class="flex-1 py-1 space-y-6">
        <div class="h-2 bg-blue-300 rounded"></div>
      </div>
    </div>
  </div>
  <div class="pt-4 text-white">
    <div v-if="movieData?.Response == 'False'" class="py-10 text-center">
      <p>Sorry, No Movie(s) shown.</p>
      <p>You can use the search feature to view another movies.</p>
    </div>
    <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div
        v-for="(data, index) in movieData?.Search" :key="index"
        @click="getDetail(data.imdbID)"
        class="p-1 text-center rounded cursor-pointer box-movie">
        <img :src="data.Poster" class="rounded-lg img--center img--home">
        <span class="px-2">
          <span class="text-white text-title">{{ data.Title }}</span>
        </span>
      </div>
    </div>
  </div>
  <div class="text-center rounded-lg btn--sticky" @click="goHistory()">History</div>
</template>
<script setup lang="ts">
import router from '@/router';
import axios from 'Axios'
import { ref, onMounted } from 'vue';

const search = ref('');
const movieData = ref();
const key = '31ccf49'

function getMovieList(title:string) {
  axios.get('http://www.omdbapi.com/', {
    params: { 
      apikey: key,
      s: title }
  })
  .then(response => {
    movieData.value = response.data
  })
  .catch(error => {
     console.error(error)
  })
}

onMounted(() => {
  getMovieList('guardians of the galaxy')
})

function searchMovie(search:string) {
  if(search !== '')
    getMovieList(search)
}

function getDetail(id:string) {
  router.push(`/detail/${id}`)
}
function goHistory() {
  router.push(`/history`)
}
</script>
