import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0); // State
  const doubleCount = computed(() => count.value * 2); // Getter
  function increment() { // Action
    count.value++;
  }

  return { count, doubleCount, increment };
});
