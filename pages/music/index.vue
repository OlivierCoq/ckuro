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
                  @keydown.backspace="musicStore.doSearch"
                />
              </div>
              <button
                v-if="!musicStore.search.query.length"
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="musicStore.doSearch"
              >
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  color="#8d8484"
                />
              </button>
              <button
                v-else
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="musicStore.clearSearch"
              >
                <font-awesome-icon :icon="['fas', 'times']" color="#8d8484" />
              </button>
            </div>

            <!-- Music list -->
            <div
              class="w-full h-full flex flex-col justify-start items-start align-start overflow-hidden"
            >
              <!-- Filters: -->
              <div
                class="w-full min-h-[160px] mb-4 flex flex-col justify-start items-start align-start"
              >
                <div
                  class="w-full flex flex-wrap justify-end items-end align-end px-4 mb-4 h-[30px]"
                >
                  <!-- clear Filters -->
                  <div
                    class="filter-box min-h-[40px] px-2 py-1 cursor-pointer rounded-md me-2 flex flex-row justify-center items-center ms-2 z-20"
                    @click="musicStore.clearFilters"
                  >
                    <p
                      v-show="musicStore.search.filters.length > 0"
                      class="text-white font-thin ms-5 me-2"
                    >
                      clear
                    </p>
                    <font-awesome-icon
                      v-show="musicStore.search.filters.length > 0"
                      :icon="['fas', 'times']"
                      color="#8d8484"
                    />
                  </div>
                </div>
                <div
                  v-if="musicStore.interface"
                  class="w-full flex flex-wrap justify-start items-start align-start px-4 mb-4 mt-[-30px]"
                >
                  <p class="text-white font-bold me-3">genres:</p>
                  <div
                    v-for="(genre, index) in musicStore.interface.data.genres"
                    :key="index"
                    class="filter-box h-[30px] px-2 py-1 mb-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center"
                    :class="{ 'bg-primary_accent': genre.active }"
                    @click="musicStore.doFilter(genre)"
                  >
                    <p class="text-white font-thin text-sm">
                      {{ genre.label }}
                    </p>
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
                    class="filter-box h-[30px] px-2 mb-1 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center"
                    :class="{ 'bg-primary_accent': artist.active }"
                    @click="musicStore.doFilter(artist)"
                  >
                    <p class="text-white font-thin text-sm">
                      {{ artist.label }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- Headers -->
              <div
                class="w-full h-[40px] flex flex-row justify-start items-center align-center mx-4 py-4"
              >
                <div class="w-[10%] text-gray-400 font-thin ps-4"></div>
                <div class="w-[30%] text-gray-400 font-thin">
                  <font-awesome-icon class="me-10" :icon="['fas', 'music']" color="#8d8484" />
                </div>
                <div class="w-[15%] text-gray-400 font-thin text-center">
                  <font-awesome-icon class="me-10" :icon="['fas', 'microphone-lines']" color="#8d8484" />
                </div>
                <div class="w-[15%] text-gray-400 font-thin flex flex-row justify-start content-center">
                  <font-awesome-icon class="me-10" :icon="['fas', 'record-vinyl']" color="#8d8484" />
                </div>
                <div class="w-[25%] text-gray-400 font-thin flex flex-row justify-start">
                  <font-awesome-icon class="ms-2" :icon="['fas', 'star']" color="#8d8484" />
                </div>
                <!-- <div class="w-[15%] text-gray-400 font-thin">
                  <font-awesome-icon :icon="['fas', 'clock']" color="#8d8484" />
                </div> -->
              </div>
              <div
                v-if="musicStore.search.results.length"
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
              <p
                v-else-if="
                  musicStore.search?.filters.length &&
                  !musicStore.search.results.length
                "
                class="text-white font-thin text-center px-5"
              >
                No tracks found
              </p>
              <p
                v-if="
                  musicStore.search.query.length &&
                  !musicStore.search.results.length
                "
                class="text-white font-thin text-center px-5"
              >
                No tracks found for "{{ musicStore.search.query }}"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-full order-first lg:order-last flex flex-col justify-between mb-4"
      >
        <div>
          <TemplateNav />
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
