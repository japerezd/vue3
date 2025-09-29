<template>
  <div>
    <h1>Favorite Recipes</h1>
    <RecipeList :recipes="store.favoriteList" />
  </div>
</template>

<script setup lang="ts">
import RecipeList from '@/components/RecipeList.vue';
import { useRecipeStore } from '@/stores/recipe';

const store = useRecipeStore()
</script>