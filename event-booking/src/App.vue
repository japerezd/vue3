

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <!-- we are taking event argument from EventList and use it here -->
    <EventList @register="handleRegistration($event)" />

    <h2 class="text-2xl font-medium">Your Bookings</h2>

    <section class="grid grid-cols-1 gap-4">
      <template v-if="!isLoading">
        <BookingItem v-for="booking in bookings" :key="booking.id" :description="booking.eventTitle"
          :status="booking.status" @cancelled="cancelBooking(booking.id)" />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </main>
</template>


<script setup>
import { onMounted } from 'vue';
import EventList from '@/components/EventList.vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingItem from '@/components/LoadingBookingItem.vue';
import useBookings from './composables/useBookings';

const { bookings, isLoading, fetchBookings } = useBookings();

const findBookingById = (id) => bookings.value.findIndex(booking => booking.id === id);

const handleRegistration = async (event) => {
  if(bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You have already registered for this event.');
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  };

  bookings.value.push(newBooking);

  try {
    const response  = await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to confirm booking');
  }

  const index = findBookingById(newBooking.id);
  bookings.value[index] = await response.json();
  } catch (error) {
    // handle error
    console.error('Failed to register for event:', error);
    bookings.value = bookings.value.filter(b => b.id !== newBooking.id);
  }
}

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Booking could not be cancelled');
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    bookings.value.splice(index, 0, originalBooking); // Restore the booking if cancellation fails
  }
}

onMounted(() => {
  fetchBookings();
});
</script>