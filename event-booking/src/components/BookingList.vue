<template>
  <ErrorCard v-if="error" :retry="fetchBookings">
    Could not load bookings at the moment. Please try again later.
  </ErrorCard>
  <section v-else class="grid grid-cols-1 gap-4">
    <template v-if="!isLoading">
      <BookingItem v-for="booking in bookings" :key="booking.id" :description="booking.eventTitle"
        :status="booking.status" @cancelled="cancelBooking(booking.id)" />
    </template>
    <template v-else>
      <LoadingBookingItem v-for="i in 4" :key="i" />
    </template>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import useBookings from '../composables/useBookings';
import ErrorCard from '@/components/ErrorCard.vue';

const { bookings, isLoading, fetchBookings, cancelBooking, error } = useBookings();

onMounted(() => {
  fetchBookings();
});
</script>
