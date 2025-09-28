<template>
  <div>
    <h1>{{ recipe?.name }}</h1>
    <p>{{ recipe?.description }}</p>
  </div>
  
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { useRoute } from 'vue-router';

const route = useRoute();
const recipeStore = useRecipeStore();
const recipe = recipeStore.getRecipeById(route.params.id as string)

// watch waits for a ref value or a getter
// pass a function that returns something -> getter
// immediate: to make it work when component is created/mounted
// watch(() => route.params.id, () => console.log('Fetching data inside watch'), { immediate: true })
</script>