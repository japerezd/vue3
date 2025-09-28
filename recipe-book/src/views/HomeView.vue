

<template>
  <main>
    <h1>Home</h1>
    <nav>
      <ul>
        <li>
          <RouterLink :to="{ name: 'recipe', params: { id: 1 } }">
            Recipe 1
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'not-found' }">
            Error
          </RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { RouterLink } from 'vue-router';

const recipeStore = useRecipeStore();
console.log(recipeStore.$state.recipes)
</script>