<template>
  <div>Add Form</div>
  <form @submit.prevent="updateRecipe">
    <div>
      <input type="text" placeholder="Recipe name" v-model="name" required />
    </div>
    <div>
      <textarea placeholder="Recipe description" v-model="description" required></textarea>
    </div>
    <button type="submit">Save</button>
  </form>
</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useRecipeStore();
const name = ref('');
const description = ref('');
const router = useRouter();
const route = useRoute()

const fetchRecipe = () => {
  const id = route.params.id as string;
  const recipe = store.getRecipeById(id);
  if (recipe) {
    name.value = recipe.name
    description.value = recipe.description
  } else {
    router.push({ name: 'not-found'})
  }
}

onMounted(fetchRecipe)

const updateRecipe = () => {
  const id = route.params.id as string
  store.editRecipe2({ name: name.value, description: description.value, id });

  router.push({
    name: 'recipe',
    params: {
      id,
    },
  });
};

</script>
