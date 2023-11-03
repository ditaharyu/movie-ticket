<template>
  <button class="rounded-lg btn--back" @click="goHome()">Home</button>
  <div class="py-4 space-y-2">
    <div
      v-for="data, index in listBooking" :key="index"
      class="flex p-1 space-x-4 text-white border-[1px] border-blue-300 border-solid rounded-lg">
      <img :src="data.Poster" class="rounded-lg img--history" />
      <div class="my-auto">
        <div>{{ data.Title }}</div>
        <div>
          Seat : 
          <span v-for="seat, index in data.Seat" :key="index">{{ seat + ' ' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBooking } from '@/stores/booking'
import { storeToRefs } from 'pinia'

const booking = useBooking()
const { listBooking } = storeToRefs(booking)

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
