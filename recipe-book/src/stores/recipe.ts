import { defineStore } from "pinia";
import { ref } from "vue";

interface Recipe {
  id: string;
  name: string;
  description: string;
}

type NewRecipe = Omit<Recipe, 'id'>

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([])
  const addRecipe = (recipe: NewRecipe) => {
    const newRecipe = {
      id: Date.now().toString(),
      ...recipe
    }
    recipes.value.push(newRecipe)
    return newRecipe;
  }

  const getRecipeById = (id: string) => recipes.value.find((r) => r.id === id)

  const filteredRecipes = (searchQuery: string) => recipes.value.filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const editRecipe = (id: string, recipeToEdit: NewRecipe) => {
    const recipeEdited = {
      name: recipeToEdit?.name ?? '',
      description: recipeToEdit?.description ?? '',
      id,
    }
    const recipeIndex = recipes.value.findIndex((r) => r.id === id)
    recipes.value[recipeIndex] = recipeEdited

    return recipeEdited;
  }
  
  const editRecipe2 = (updatedRecipe: Recipe) => {
    const index = recipes.value.findIndex((recipe) => recipe.id === updatedRecipe.id)
    if (index !== -1) {
      recipes.value[index] = updatedRecipe;
    }
  }


  return {
    recipes,
    addRecipe,
    getRecipeById,
    filteredRecipes,
    editRecipe,
    editRecipe2
  }
})