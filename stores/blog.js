import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// const api_url = 'https://strapi-potr.onrender.com'
const api_url = 'http://localhost:1337'
import qs from "qs";

export const useBlogStore = defineStore({
  id: "blogStore",
  state: () => {
    return {
      search: {
        query: "",
        results: [],
        filters: [],
        loading: false,
        error: null
      },
      interface: null,
      filters: [],
      active_filters: [],
      filter_key: 0,
      filter_option_key: 0,
      posts: [],
      comp_key: 0
    };
  },
  actions: {
    // API methods:
    // User methods:
    async doSearch() { }
  },
  getters: {},
  persist: {
    enabled: true,
  },
});
