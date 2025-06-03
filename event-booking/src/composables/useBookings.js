import { ref } from 'vue';

const bookings = ref([]);
const isLoading = ref(false);

const fetchBookings = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
  } finally {
    isLoading.value = false;
  }
}

export default function useBookings() {
  return {
    bookings,
    isLoading,
    fetchBookings
  }
}