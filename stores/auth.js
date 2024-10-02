import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


const config = useRuntimeConfig();
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
    async logIn(identifier, password) {
  
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }).then((res) => {
        console.log('user', res);
        this.user = res.user;
        this.token = res.jwt;
        this.error = false;
      }).catch((err) => {
        this.error = err;
        console.error(err);
      })
  
  }, 
    async forceLogin(data) { 
      console.log('force login', data);
      this.user = data.user;
      nextTick(() => {
        // rediret to data.body.destination:
        window.location.href = data.body.destination;
      });
    },
    async clear() {
      this.error = null;
      this.success = null;
      // console.log('clearing');
      // console.log(this.error);
      // console.log(this.success);
    },
    async logOut() { },
    async register(username, email, password, route) { 
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
        body: JSON.stringify({ username, email, password, route}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }).then((res) => {
        console.log('leeets fucking go', res);
        nextTick(()=> {
          this.success = res.data
          this.loading = false;
          return this.success
        })
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
