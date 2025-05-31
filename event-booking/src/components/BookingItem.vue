<template>
  <SectionCard>
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <div>{{ description }}</div>
        <div>{{ status }}</div>
      </div>
      <RoundButton variant="danger" @click="$emit('cancelled')">
        Cancel
      </RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';

defineProps({
  description: String,
  status: String
});

defineEmits(['cancelled']);
</script>
  