<template>
  <div class="w-full absolute z-20 h-[80vh] mx-auto p-10">
    <div class="container mx-auto py-10 ps-20 text-center">
      <a
        href="/"
        class="text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]"
        >cKuro</a
      >
    </div>
    <div
      class="main-ctr mx-auto h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"
    >
      <div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5">
        <div class="ctr-main h-full shadow-xl me-5">
          <!-- Meat + Potatoes -->
          <div
            class="w-full h-full flex flex-col justify-start items-start align-start py-4"
          >
            <!-- Search -->
            <div class="flex flex-row w-full mb-4 px-4">
              <div class="w-[90%] h-[40px] border-thin border-light p-2 me-2">
                <input
                  type="text"
                  class="w-full h-full bg-transparent text-white font-thin search"
                  placeholder="Search community..."
                  v-model="communityStore.search.query"
                  @keydown="communityStore.doSearch"
                  @keydown.backspace="communityStore.clearSearch"
                />
              </div>
              <button
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="communityStore.doSearch"
              >
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  color="#8d8484"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-full order-first lg:order-last flex flex-col justify-between"
      >
        <div>
          <TemplateNav />
        </div>
        <!-- Links, filters, and more here -->
        <div
          class="w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"
        >
          <h2
            class="text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"
          >
            Links
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";

// Meta
definePageMeta({
  title: "cKuro - Community",
  descripton: "gang",
  layout: "community",
});

// Components

// Stores
const communityStore = useCommunityStore();

// State
const state = reactive({
  nav_links: [],
  posts: [],
  interface: {
    tags: [],
    authors: [],
  },
});
</script>
<style lang="scss">
.border-thin {
  border: 1px solid;
}
.border-light {
  border-color: #8d8484;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: #cb7372 !important;
}
</style>
