import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Booking {
  Title: string
  imdbID: string
  Poster: string
  Seat: string[]
}

export const useBooking = defineStore('booking', () => {
  const listBooking = ref<Booking[]>([])
  const bookedMovieSeats = ref<string[]>([])

  function bookMovie(imdbId: string, title: string, poster: string, seat: string[]) {
    const booking: Booking = {
      imdbID: imdbId,
      Title: title,
      Poster: poster,
      Seat: seat
    }

    listBooking.value?.push(booking)
  }

  function getBookedSeats(imdbId: string) {
    bookedMovieSeats.value = listBooking.value
      .filter(movie => movie.imdbID === imdbId)
      .map(movie => movie.Seat)
      .reduce((acc, seats) => acc.concat(seats), []);
  }

  return {
    listBooking,
    bookMovie,
    bookedMovieSeats,
    getBookedSeats
  }
})
