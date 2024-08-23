<template>
  <div
    class="absolute top-0 left-0 right-0 z-20 flex flex-col justify-center align-middle h-[100vh] w-[100vw]"
  >
    <a
      href="/"
      class="text-white matrix text-6xl font-thin fade-in text-center neon-flicker"
      >{{ state.title }}</a
    >
    <div
      class="w-full lg:w-2/3 mx-auto p-4 flex flex-row items-center justify-between pt-20"
    >
      <a
        v-for="(item, a) in state.nav_links"
        :key="a"
        :href="item.link"
        class="text-white text-lg font-thin fade-in mx-3 matrix hover-text-primary_accent hover:cursor-pointer"
        >{{ item.label }}</a
      >
    </div>
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";

// Default
definePageMeta({
  title: "Home",
  descripton: "cKuro Home",
  layout: "home",
});

const state = reactive({
  title: "cKuro",
  nav_links: [],
});

fetch(
  `${config.public.NUXT_STRAPI_URL}/api/site-nav?${qs.stringify(
    {
      populate: ["links"],
    },
    { arrayFormat: "comma" },
  )}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },
).then(async (data) => {
  const res = await data.json();
  // console.log("fuuuuuuuuck", res.data);
  state.nav_links = res.data.links;
});
</script>
