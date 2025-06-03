import { ref } from 'vue';

const bookings = ref([]);
const isLoading = ref(false);
const error = ref(null);

const fetchBookings = async () => {
  try {
    isLoading.value = true;
    error.value = null
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  } catch (err) {
    console.error('Error fetching bookings:', err);
    error.value = err
  } finally {
    isLoading.value = false;
  }
}

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

export default function useBookings() {
  return {
    bookings,
    isLoading,
    fetchBookings,
    handleRegistration,
    cancelBooking,
    error
  }
}