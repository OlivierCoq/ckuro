import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// const api_url = 'https://strapi-potr.onrender.com'
const api_url = 'http://localhost:1337'
import qs from "qs";

export const useAuthStore = defineStore({
  id: "authStore",
  state: () => {
    return {
      user: null,
      token: null,
      loading: false,
      error: null,
      success: null
    };
  },
  actions: {
    // User methods:
    async logIn() { }, 
    async logOut() { },
    async register(email, password, route) { 
      this.loading = true;

      /* 
        - create user in Strapi, but with !confirmed, and confirmation code
        - send email with confirmation link
        - user clicks on confirmation link
        - user is redirected to frontend, with confirmation code
        - frontend sends confirmation code to Strapi
        - Strapi confirms user
        - user can now log in
      */

      $fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, route}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }).then((res) => {
        console.log('leeets fucking go', res);
        nextTick(()=> {
          this.success = res.data
        })
        this.loading = false;
        return this.success
      }).catch((err) => {
        console.error(err);
        this.loading = false;
      });
      this.loading = false;
    },
  },
  getters: {},
  persist: {
    enabled: false,
  },
});
