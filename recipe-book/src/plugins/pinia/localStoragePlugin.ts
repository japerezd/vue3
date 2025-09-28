import type { PiniaPluginContext } from "pinia";

const localStoragePlugin = (context: PiniaPluginContext) => {
  const {store} = context;

  // store.$id is the name we give to our Pinia Store (using defineStore)
  const storedState = localStorage.getItem(store.$id)
  
  if (storedState) {
    // If we got something from localStorage, we update hydrate the store (state)
    store.$patch(JSON.parse(storedState))
  }

  store.$subscribe((mutation, state) => {
    // It triggers every time the store changes
    localStorage.setItem(store.$id, JSON.stringify(state))
  })
}

export default localStoragePlugin;