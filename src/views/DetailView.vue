<template>
  <button class="rounded-lg btn--back" @click="goBack()">Back</button>

  <div v-if="!movieDetail" class="w-full max-w-sm p-4 mx-auto">
    <div class="animate-pulse">
      <div class="w-10 h-10 mx-auto mb-4 bg-blue-300 rounded-lg"></div>
      <div class="flex-1 py-1 space-y-6">
        <div class="h-2 bg-blue-300 rounded"></div>
        <div class="space-y-3">
          <div class="h-2 bg-blue-300 rounded"></div>
          <div class="h-2 bg-blue-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="py-4 text-center">
    <div class="mb-4">
      <img :src="movieDetail?.Poster" class="rounded-lg h-36 lg:h-full img--center img--detail">
    </div>
    <div class="text-white ">
      <div class="detail--title"><b>{{ movieDetail?.Title }}</b></div>
      <div class="flex justify-center py-4 space-x-4">
        <div class="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 rounded-md bg-yellow-50 ring-1 ring-inset ring-yellow-600/20">
          {{ movieDetail?.Rated }}
        </div>
        <div class="flex space-x-1">
          <img :src="imgTime" alt="duration" class="w-[1.5rem] text-white bg-white rounded-full">
          <span>
            {{ movieDetail?.Runtime }}
          </span>
        </div>
      </div>
    </div>
    <div class="space-y-2 text-white">
      <span>
        {{ movieDetail?.Plot }}
      </span>
      <div>
        Genre : 
        {{ movieDetail?.Genre }}
      </div>
      <div>
        Director :
        {{ movieDetail?.Director }}
      </div>
      <div>
        Actor(s) :
        {{ movieDetail?.Actors }}
      </div>
    </div>
  </div>
  <div class="py-4 text-center">
    <button
      class="w-full rounded-lg lg:w-1/2 btn--book"
      @click="goBook()">
        Book Now
    </button>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import axios from 'Axios'
import { onMounted, ref } from 'vue'
import imgTime from '@/assets/image/time-forward.svg'

const route = useRoute()
const movieDetail = ref()
const key = '31ccf49'

async function getDetailMovie(id:string) {
  await axios.get('http://www.omdbapi.com/', {
    params: { 
      apikey: key,
      i: id }
  })
  .then(response => {
    movieDetail.value = response.data
  })
  .catch(error => {
     console.error(error)
  })
}

onMounted(() => {
  getDetailMovie(route.params.id.toString())
})

function goBack() {
  router.go(-1)
}

function goBook() {
  router.push(`/detail/${route.params.id}/booking`)
}
</script>
