<template>
  <div class="w-full absolute z-20 h-[80vh] mx-auto p-10">
    <div class="container mx-auto py-10 ps-20">
      <a
        href="/"
        class="text-white matrix text-6xl font-thin fade-in text-center"
        >cKuro</a
      >
    </div>
    <div class="container mx-auto h-full px-20 flex items-start justify-start">
      <div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5">
        <div class="ctr-main h-full shadow-xl me-5">
          <!-- Music meat + potatoes -->
        </div>
      </div>
      <TemplateNav :links="state.nav_links" />
      <!-- Artists here -->
    </div>
  </div>
  <!-- Music player: -->
  <div></div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";
definePageMeta({
  title: "cKuro - Music",
  descripton: "Captain Kuro's music n shit",
  layout: "music",
});
const state = reactive({
  nav_links: [],
});

fetch(
  `${config.public.NUXT_STRAPI_URL}/api/site-nav?${qs.stringify(
    {
      populate: ["links", "links.imagery"],
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
