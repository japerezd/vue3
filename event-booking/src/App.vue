

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">
      <template v-if="!eventsAreLoading">
        <EventCard v-for="event in events" :key="event.id" :title="event.title" :when="event.date"
        :description="event.description" @register="console.log('Registered!')" />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>

    <section class="grid grid-cols-1 gap-4">
      <BookingItem description="Vue Conference 2025" />
      <BookingItem description="React Conference 2025" />
      <BookingItem description="Svelte Conference 2025" />
    </section>
  </main>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import EventCard from '@/components/EventCard.vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingEventCard from './components/LoadingEventCard.vue';

const events = ref([]);
const eventsAreLoading = ref(false);

const fetchEvents = async () => {
  eventsAreLoading.value = true;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } finally {
    eventsAreLoading.value = false;
  }
}

onMounted(() => fetchEvents());
</script>