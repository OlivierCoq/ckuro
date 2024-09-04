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
          <!-- Music meat + potatoes -->
          <div
            class="w-full h-full flex flex-col justify-start items-start align-start py-4"
          >
            <!-- Search -->
            <div class="flex flex-row w-full mb-4 px-4">
              <div class="w-[90%] h-[40px] border-thin border-light p-2 me-2">
                <input
                  type="text"
                  class="w-full h-full bg-transparent text-white font-thin search"
                  placeholder="Search for music..."
                  v-model="musicStore.search.query"
                  @keydown="musicStore.doSearch"
                  @keydown.backspace="musicStore.clearSearch"
                />
              </div>
              <button
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="musicStore.doSearch"
              >
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  color="#8d8484"
                />
              </button>
            </div>

            <!-- Music list -->
            <div
              class="w-full h-full flex flex-col justify-start items-start align-start"
            >
              <!-- Filters: -->
              <div
                class="w-full h-[120px] flex flex-col justify-start items-start align-start"
              >
                <div
                  v-if="musicStore.interface"
                  class="w-full flex flex-wrap justify-start items-start align-start px-4 mb-4"
                >
                  <p class="text-white font-bold me-3">genres:</p>
                  <div
                    v-for="(genre, index) in musicStore.interface.data.genres"
                    :key="index"
                    class="filter-box h-[40px] px-2 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center"
                    :class="{ 'bg-primary_accent': genre.active }"
                    @click="musicStore.doFilter(genre)"
                  >
                    <p class="text-white font-thin">{{ genre.label }}</p>
                  </div>
                </div>
                <div
                  v-if="musicStore.interface"
                  class="w-full flex flex-wrap justify-start items-start align-start px-4 mb-4"
                >
                  <p class="text-white font-bold me-2">artists:</p>
                  <div
                    v-for="(artist, index) in musicStore.interface.data.artists"
                    :key="index"
                    class="filter-box h-[40px] px-2 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center"
                    :class="{ 'bg-primary_accent': artist.active }"
                    @click="musicStore.doFilter(artist)"
                  >
                    <p class="text-white font-thin">{{ artist.label }}</p>
                  </div>
                </div>
                <!-- clear  -->
                <div
                  v-if="musicStore.search.filters.length > 0"
                  class="filter-box h-[30px] px-2 py-1 cursor-pointer rounded-md me-2 flex flex-row justify-center items-center ms-2 z-20"
                  @click="musicStore.clearFilters"
                >
                  <p class="text-white font-thin me-2">clear</p>
                  <font-awesome-icon :icon="['fas', 'times']" color="#8d8484" />
                </div>
              </div>
              <!-- Headers -->
              <div
                class="w-full h-[40px] flex flex-row justify-start items-center align-center mx-4 py-4"
              >
                <div class="w-[10%] text-gray-400 font-thin ps-4"></div>
                <div class="w-[40%] text-gray-400 font-thin">Title</div>
                <div class="w-[25%] text-gray-400 font-thin">Artist</div>
                <div class="w-[25%] text-gray-400 font-thin">
                  <font-awesome-icon :icon="['fas', 'star']" color="#8d8484" />
                </div>
                <!-- <div class="w-[15%] text-gray-400 font-thin">
                  <font-awesome-icon :icon="['fas', 'clock']" color="#8d8484" />
                </div> -->
              </div>
              <div
                v-if="musicStore.search.results"
                class="w-[95%] mx-auto h-[75%] overflow-y-scroll relative"
              >
                <TrackBox
                  v-for="(track, index) in musicStore.search.results"
                  :key="index"
                  :track="track"
                  :index="index"
                />
                <font-awesome-icon
                  v-if="musicStore.search?.results?.length > 12"
                  :icon="['fas', 'arrow-down']"
                  class="mx-3 text-xl text-white sticky z-20 bottom-0 left-[95%] right-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-full order-first lg:order-last flex flex-col justify-between"
      >
        <div class="h-[30%]">
          <TemplateNav :links="state.nav_links" />
        </div>
        <!-- Artists here -->
        <div
          class="w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"
        >
          <h2
            class="text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"
          >
            Artists
          </h2>
          <ArtistBox
            v-for="(artist, a) in musicStore.artists.data"
            :key="a"
            :artist="artist"
          />
          <font-awesome-icon
            v-if="musicStore.artists?.data?.length > 3"
            :icon="['fas', 'arrow-down']"
            class="mx-3 cursor-pointer text-xl text-white sticky z-20 bottom-0 right-0"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- Music player: -->
  <MusicPlayer v-if="musicStore.player.track" />
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";

// Meta
definePageMeta({
  title: "cKuro - Music",
  descripton: "Captain Kuro's music n shit",
  layout: "music",
});

// Components
import TrackBox from "./components/TrackBox.vue";
import ArtistBox from "./components/ArtistBox.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

// Stores
const musicStore = useMusicStore();
// Init music:
musicStore.init_music();

// State
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
