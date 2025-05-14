<template>
  <SectionCard>
    {{ description }}
  </SectionCard>
</template>

<script setup>
import SectionCard from './SectionCard.vue';

defineProps({
  description: String
});
</script>
  