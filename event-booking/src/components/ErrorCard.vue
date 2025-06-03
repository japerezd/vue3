<template>
  <SectionCard>
    <div class="space-y-4 items-center flex flex-col">
      <div class="text-red-500">
        <slot />
      </div>
      <RoundButton v-if="retry" @click="retry">Retry Now</RoundButton>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';

defineProps({
  retry: {
    type: Function,
    required: false
  }
});

</script>

