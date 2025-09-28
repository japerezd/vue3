<template>
  <div>
    Recipe {{  $route.params.id  }}
  </div>
  <nav>
    <ul>
      <li>
        <RouterLink :to="{ name: 'recipe', params: { id: 1 } }">Recipe 1</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'recipe', params: { id: 2 } }">Recipe 2</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';


const route = useRoute();
console.log(route.params.id)

// watch waits for a ref value or a getter
// pass a function that returns something -> getter
// immediate: to make it work when component is created/mounted
watch(() => route.params.id, () => console.log('Fetching data inside watch'), { immediate: true })
</script>