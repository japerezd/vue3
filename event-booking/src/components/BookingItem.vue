<template>
  <SectionCard>
    <div class="flex justify-between">
      <div>{{ description }}</div>
      <RoundButton variant="danger">
        Cancel
      </RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';

defineProps({
  description: String
});
</script>
  