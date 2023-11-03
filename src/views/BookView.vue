<template>
  <div class="w-full max-w-sm p-4 mx-auto">
    <div class="w-full h-6 mx-auto mb-4 text-center bg-orange-200 rounded-lg">
      <b>Screen</b>
    </div>
  </div>
  <div class="seat">
    <div
      class="seat__item"
      v-for="(seat, index) in seats" :key="index">
      <input type="checkbox" :name="seat" :id="seat" :value="seat" v-model="chooseSeat" :disabled="bookedMovieSeats.includes(seat)">
      <label :for="seat">{{ seat }}</label>
    </div>
  </div>
  <div class="pt-4 seat__description">
    <span class="seat__description-available">Available</span>
    <span class="seat__description-booked">Booked</span>
    <span class="seat__description-selected">Selected</span>
  </div>
  <div
    v-if="chooseSeat.length > seatChoice"
    class="w-full pb-4 font-bold text-center text-white">
    Please, change your exact amount!
  </div>
  <div class="flex px-4 action-bar">
    <select v-model="seatChoice">
      <option
        v-for="(i, index) in 5" :key="index"
        :value="i"
        :selected="i === 1">
        {{ i }}
      </option>
    </select>
    <button
      class="w-full rounded-lg btn--book"
      @click="bookNow()"
      :disabled="chooseSeat.length !== seatChoice">
      Book Now
    </button>
  </div>
</template>

<script setup lang="ts">
import { useBooking } from '@/stores/booking'
import axios from 'Axios'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const seats = [
  'A1', 'A2', 'A3', 'A4', 'A5',
  'B1', 'B2', 'B3', 'B4', 'B5',
  'C1', 'C2', 'C3', 'C4', 'C5',
]
const chooseSeat = ref([])
const seatChoice = ref(1)
const route = useRoute()
const router = useRouter()

const booking = useBooking()
const { bookedMovieSeats } = storeToRefs(booking)

const detailMovie = ref({})

async function getDetailById(id: string) {
  axios.get(`http://www.omdbapi.com/?apikey=31ccf49&i=${id}`)
  .then(response => {
    detailMovie.value = response.data
  })
  .catch(error => {
    console.error(error)
  })
}

watch(() => seatChoice.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    chooseSeat.value = []
  }
})

onMounted(() => {
  getDetailById(route.params.id.toString())
})

const { bookMovie, getBookedSeats } = booking

function bookNow(){
  if (detailMovie.value) {
    const data = detailMovie.value
    bookMovie(data.imdbID, data?.Title, data?.Poster, chooseSeat?.value)

    router.push('/history')
  }
}
</script>

<style lang="scss" scoped>
.seat {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  // padding: 48px;
  gap: 8px;

  &__item {
    position: relative;
    margin: 18px;

    input {
      position: absolute;
      left: 50%;
      right: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      appearance: none;
      background-color: #3876BF;
      border-radius: 6px;
      transition: all 0.1s ease-in;
    }

    input:checked {
      background-color: #f8c300;

      & + label {
        color: #000000;
      }
    }

    input:disabled {
      background-color: #999999;
    }

    label {
      font-size: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__description {
    display: flex;
    justify-content: space-evenly;
    font-size: 10px;
    color: #888888;
    margin-bottom: 24px;

    &-selected::before,
    &-booked::before,
    &-available::before {
      content: "";
      display: inline-block;
      margin-right: 4px;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      vertical-align: sub;
    }

    &-available::before {
      background-color: #3876BF;
    }

    &-booked::before {
      background-color: #999999;
    }

    &-selected::before {
      background-color: #f8c300;
    }
  }
}

.error-limit {
  margin-bottom: 72px;
}

.action-bar {
  gap: 16px;

  select {
    appearance: none;
    padding: 0 16px 0 4px;
    color: white;
    background-color: transparent;
    border: 2px solid #f17707;
    border-radius: 6px;
    background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right 0.25rem center;
    background-size: 8px 10px;

    option {
      background-color: #363740;
    }
  }
  .select-button {
    flex: 1;
  }
}
</style>
