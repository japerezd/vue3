

<template>
  <main>
    <h1>Recipe Book</h1>
    <div>
      <input type="text" placeholder="Search a recipe" v-model="searchQuery">
    </div>
    <RecipeList :recipes="filteredRecipes" />
  </main>
</template>

<script setup lang="ts">
import RecipeList from '@/components/RecipeList.vue';
import { useRecipeStore } from '@/stores/recipe';
import { computed, ref } from 'vue';

const recipeStore = useRecipeStore();
const searchQuery = ref('')
const filteredRecipes = computed(() => recipeStore.filteredRecipes(searchQuery.value))

</script>