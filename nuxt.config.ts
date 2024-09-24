// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: true,
  devtools: { enabled: false },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "https://res.cloudinary.com/dgmz3uymj/image/upload/v1725422153/apple_touch_icon_346566063c.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "https://res.cloudinary.com/dgmz3uymj/image/upload/v1725422153/favicon_32x32_815c32f1f4.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "https://res.cloudinary.com/dgmz3uymj/image/upload/v1725422153/favicon_16x16_ea71b6e181.png",
        },
        {
          rel: "manifest",
          href: "https://res.cloudinary.com/dgmz3uymj/raw/upload/v1725422153/site_12707fde25.webmanifest",
        },
        {
          rel: "stylesheet",
          href: "https://vjs.zencdn.net/7.2.3/video-js.css",
        },
      ],
      script: [
        {
          src: "https://app.ecwid.com/script.js?104674311&data_platform=code&data_date=2024-06-08",
          dataCfasync: false,
        },
        {
          src: "https://app.ecwid.com/script.js?104674311&data_platform=code&data_date=2024-08-07",
          dataCfasync: false,
        },
        {
          src: "https://app.ecwid.com/script.js?104674311&data_platform=code&data_date=2024-08-07",
          dataCfasync: false,
        },
      ],
    },
  },
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
  hls: {
    fallbackIfUnsupported: false,
    hlsTime: 3,
  },
  runtimeConfig: {
    public: {
      NUXT_STRAPI_URL: process.env.STRAPI_URL,
    },
  },
});
