<template>
  <div
    id="site_nav"
    class="w-full mb-5 flex flex-row items-start justify-start align-start rounded-sm shadow-xl"
  >
    <div v-if="props.links" class="w-full p-4 flex flex-col">
      <div v-for="(item, a) in props.links" :key="a" class="flex flex-row">
        <div class="w-1/3 p-4">
          <a
            :href="item.link"
            class="text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase"
            :class="{ 'text-primary_accent': route.path === item.link }"
            >{{ item.label }}</a
          >
        </div>
      </div>
    </div>
    <div v-else-if="state.nav_links" class="w-full p-4 flex flex-col">
      <div v-for="(item, a) in state.nav_links" :key="a" class="flex flex-row">
        <div class="w-1/3 p-4">
          <a
            :href="item.link"
            class="text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase"
            :class="{ 'text-primary_accent': route.path === item.link }"
            >{{ item.label }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";
// props:
const props = defineProps({
  links: {
    type: Array,
    required: false,
  },
});

const route = useRoute();

const state = reactive({
  nav_links: [],
});

// Sitenav
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
<style lang="scss">
#site_nav {
  border: 1px solid #8d8484;
}
</style>
