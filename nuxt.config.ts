// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: true,
  devtools: { enabled: false },
  css: [
    "~/assets/assets/style/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  runtimeConfig: {
    public: {
      NUXT_STRAPI_URL: process.env.STRAPI_URL,
    },
  },
});
