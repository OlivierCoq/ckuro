import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const api_url = 'https://strapi-potr.onrender.com'
// const api_url = 'http://localhost:1337'
import qs from "qs";

export const usePortfolioStore = defineStore({
  id: "portfolioStore",
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
      projects: [],
      comp_key: 0
    };
  },
  actions: {
    // API methods:
    async fetchPortfolio() {
      console.log('fetching portfolio')
      this.projects = await fetch(`${api_url}/api/art-projects?${qs.stringify(
        {
          populate: [
            "title",
            "release_date",
            "description",
            "images",
            "videos",
          ],
        },
        { arrayFormat: "comma" },
      )}`)
        .then(res => res.json())
      .catch(err => console.error(err))
      nextTick(() => {
        this.search.results = this.projects.data
      })
    },
    // User methods:
    async doSearch() {
      this.search.loading = true
      this.search.results = this.projects.data.filter(project => {
        return project.title.toLowerCase().includes(this.search.query.toLowerCase())
      })
      this.search.loading = false
    },
    async clearSearch() {
      this.search.query = ""
      this.search.results = this.projects.data
    }
  },
  getters: {},
  persist: {
    enabled: true,
  },
});
