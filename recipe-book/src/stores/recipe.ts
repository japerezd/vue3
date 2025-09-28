import { defineStore } from "pinia";
import { ref } from "vue";

interface Recipe {
  id: string;
  name: string;
  description: string;
}

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([{ description: 'test', name: 'recipe 1', id: new Date().toString() }])

  return {
    recipes
  }
})