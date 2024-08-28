<template>
  <div class="w-full absolute z-20 h-[80vh] mx-auto p-10">
    <div class="container mx-auto py-10 ps-20 text-center">
      <a
        href="/"
        class="text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]"
        >cKuro</a
      >
    </div>
    <div class="main-ctr mx-auto h-full px-20 flex items-start justify-start">
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
                class="w-full min-h-[40px] flex flex-col justify-start items-start align-start"
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
                    :class="genre.active ? 'bg-zinc-800' : 'bg-zinc-700'"
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
                    :class="{ 'bg-zinc-800': artist.active }"
                    @click="musicStore.doFilter(artist)"
                  >
                    <p class="text-white font-thin">{{ artist.label }}</p>
                  </div>
                </div>
                <!-- clear  -->
                <div
                  v-if="musicStore.search.filters.length > 0"
                  class="filter-box h-[30px] px-2 py-1 cursor-pointer rounded-md me-2 flex flex-row justify-center items-center ms-2"
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
                <div class="w-[40%] text-gray-400 font-thin">Artist</div>
                <div class="w-[10%] text-gray-400 font-thin">
                  <!-- <font-awesome-icon :icon="['fas', 'clock']" color="#8d8484" /> -->
                </div>
              </div>
              <div v-if="musicStore.search.results" class="w-[95%] mx-auto">
                <TrackBox
                  v-for="(track, index) in musicStore.search.results"
                  :key="index"
                  :track="track"
                  :index="index"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TemplateNav :links="state.nav_links" />
      <!-- Artists here -->
    </div>
  </div>
  <!-- Music player: -->
  <div
    v-if="musicStore.player.track"
    id="music_player"
    class="music-player h-[5em] absolute bottom-0 w-full bg-black z-20 left-0"
  >
    <div class="w-full h-full flex flex-row justifty-start items-start">
      <div class="w-[20%] h-full flex flex-col px-5">
        <img
          :src="musicStore.player.track.single_cover.url"
          :alt="musicStore.player.track.title"
          class="w-[150px] mt-[-7rem]"
        />
        <p class="text-white font-thin matrix text-sm">
          {{ musicStore.player.track.title }}
        </p>
        <!-- <small class="text-white font-thin text-xs">{{ musicStore.player.track.album.title }}</small> -->
      </div>
      <div class="w-[60%]">
        <audio
          id="audio_player"
          :key="state.comp_key"
          controls
          controlsList="nodownload"
          autoplay
          oncontextmenu="return false;"
          style="display: none"
        >
          <source :src="musicStore.player.track.audio_file" type="audio/mpeg" />
        </audio>
        <div class="flex flex-col w-full mt-2">
          <div
            class="h-[3rem] flex flex-row text-white justify-center items-center"
          >
            <font-awesome-icon
              :icon="['fas', 'backward-step']"
              class="mx-3 cursor-pointer text-xl"
              @click="musicStore.select_previous"
            />
            <font-awesome-icon
              v-if="!musicStore.player.playing"
              :icon="['fas', 'play']"
              class="mx-3 cursor-pointer text-xl"
              @click="musicStore.play(musicStore.player.track)"
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'pause']"
              class="mx-3 cursor-pointer text-xl"
              @click="musicStore.pause(musicStore.player.track)"
            />
            <font-awesome-icon
              :icon="['fas', 'forward-step']"
              class="mx-3 cursor-pointer text-xl"
              @click="musicStore.select_next"
            />
          </div>
          <div
            class="h-[2rem] w-full flex flex-row items-center justify-center"
          >
            <div
              class="w-[10%] h-[15px] mb-[1rem] flex flex-col justify-center align-center items-end px-3"
            >
              <p v-if="musicStore.player.track" class="text-white">
                {{ musicStore.player.elapsed }}
              </p>
            </div>
            <div
              id="timeline"
              class="w-[80%] h-[5px] mb-[1rem] bg-neutral-900 mx-auto cursor-pointer"
              @click="musicStore.scrub($event)"
            >
              <div
                v-if="musicStore.player.track"
                class="scrubber h-[5px] bg-primary_accent hover:cursor-pointer"
                :style="{ width: `${musicStore.player.track_time}%` }"
              ></div>
            </div>
            <div
              class="w-[10%] h-[15px] mb-[1rem] flex flex-col justify-center align-center items-start px-3"
            >
              <p v-if="musicStore.player.track" class="text-white">
                {{ musicStore.player.duration }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[20%] h-full">
        <div class="h-full w-full flex flex-row items-center justify-start">
          <font-awesome-icon
            :icon="[
              'fas',
              `${musicStore.player.mute ? 'volume-mute' : 'volume-up'}`,
            ]"
            class="text-white mx-3 cursor-pointer"
            @click="musicStore.mute_track"
          />

          <div
            id="volume_adjuster"
            class="w-[60%] h-[5px] bg-neutral-900 cursor-pointer"
            @click="musicStore.adjust_volume"
          >
            <div
              class="scrubber h-[5px] bg-primary_accent hover:cursor-pointer"
              :style="{ width: `${musicStore.player.volume * 100}%` }"
            ></div>
          </div>
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
  title: "cKuro - Music",
  descripton: "Captain Kuro's music n shit",
  layout: "music",
});

// Components
import TrackBox from "./components/TrackBox.vue";

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
