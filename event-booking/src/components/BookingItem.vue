<template>
  <RoundedCard>
    <div class="p-4">
      {{ description }}
    </div>
  </RoundedCard>
</template>

<script setup>
import RoundedCard from './RoundedCard.vue';

defineProps({
  description: String
});
</script>
  