import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const api_url = 'https://strapi-potr.onrender.com'
// const api_url = 'http://localhost:1337'
import qs from "qs";

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => {
    return {
      user: null,
      token: null,
      loading: false,
      error: null
    };
  },
  actions: {
    // User methods:
    async logIn() { }
  },
  getters: {},
  persist: {
    enabled: true,
  },
});
