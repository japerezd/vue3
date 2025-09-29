<template>
  <div>
    <h1>{{ recipe?.name }}</h1>
    <p>{{ recipe?.description }}</p>
    <div>
      <RouterLink :to="{ name: 'edit-recipe', params: { id: recipe?.id }}">Edit</RouterLink>
    </div>
    <button v-if="recipe" @click="recipeStore.toggleFavorite(recipe.id)">
      {{ isFavorite ? 'Remove from favorites' : 'Add to favorites' }}
    </button>
  </div>
  
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const recipeStore = useRecipeStore();
const recipe = computed(() => recipeStore.getRecipeById(route.params.id as string))
const isFavorite = computed(() => recipe.value ? recipeStore.isFavorite(recipe.value.id) : false)

// watch waits for a ref value or a getter
// pass a function that returns something -> getter
// immediate: to make it work when component is created/mounted
// watch(() => route.params.id, () => console.log('Fetching data inside watch'), { immediate: true })
</script>