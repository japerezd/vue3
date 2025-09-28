<template>
  <div>Add Form</div>
  <form @submit.prevent="saveRecipe">
    <div>
      <input type="text" placeholder="Recipe name" v-model="name" required />
    </div>
    <div>
      <textarea placeholder="Recipe description" v-model="description" required></textarea>
    </div>
    <button type="submit">{{ buttonName }}</button>
  </form>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useRecipeStore();
const name = ref('');
const description = ref('');
const router = useRouter();
const route = useRoute();

const isNewRecipe = route.name === 'add-recipe';
const buttonName = isNewRecipe ? 'Add' : 'Edit'

const editRecipe = () => {
  const id = route.params.id as string;
  const recipe = store.editRecipe(id, { name: name.value, description: description.value });
  redirectToRecipe(recipe.id);
};

const redirectToRecipe = (id: string) => {
  router.push({
    name: 'recipe',
    params: {
      id,
    },
  });
};

// TODO: Get recipe by id and then show it to edit it
const addRecipe = () => {
  const recipe = store.addRecipe({ name: name.value, description: description.value });

  redirectToRecipe(recipe.id);
};

const saveRecipe = () => {
  if (isNewRecipe) {
    addRecipe();
  } else {
    editRecipe();
  }
};
</script>
