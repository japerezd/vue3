<template>
  <ErrorCard v-if="error" :retry="fetchEvents">
    Could not load events at the moment. Please try again later.
  </ErrorCard>
  <section v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <template v-if="!loading">
      <template v-if="events.length">
        <EventCard v-for="event in events" :key="event.id" :title="event.title" :when="event.date"
        :description="event.description" @register="handleRegistration(event)" />
      </template>

      <template v-else>
        <div class="col-span-2 text-center text-gray-500">
          No events yet.
        </div>
      </template>
    </template>
    <template v-else>
      <LoadingEventCard v-for="i in 4" :key="i" />
    </template>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import EventCard from '@/components/EventCard.vue';
import useBookings from '@/composables/useBookings';
import ErrorCard from '@/components/ErrorCard.vue';


const { handleRegistration } = useBookings();
const events = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

onMounted(() => fetchEvents());
</script>