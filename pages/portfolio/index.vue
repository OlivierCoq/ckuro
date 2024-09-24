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
                  placeholder="Search portfolio..."
                  v-model="portfolioStore.search.query"
                  @keydown="portfolioStore.doSearch"
                  @keydown.backspace="portfolioStore.doSearch"
                />
              </div>
              <button
                v-if="!portfolioStore.search.query.length"
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="portfolioStore.doSearch"
              >
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  color="#8d8484"
                />
              </button>
              <button
                v-else
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="portfolioStore.clearSearch"
              >
                <font-awesome-icon :icon="['fas', 'times']" color="#8d8484" />
              </button>
            </div>

            <!-- Portfolio -->
            <div
              class="h-full w-full overflow-y-scroll flex flex-row flex-wrap p-4"
            >
              <div
                v-for="(project, a) in portfolioStore.search.results"
                :key="a"
                class="h-[245px] w-full"
              >
                <PortfolioCard
                  :project="project"
                  @click="open_modal(project)"
                  @close="close_modal"
                />
                <!-- Modal -->
                <div
                  v-if="
                    state.modal.open && state.target_project.id === project.id
                  "
                  :id="`main_content_modal-${project.id}}`"
                  class="fixed top-0 left-0 w-full h-full bg-black/40 bg-opacity-90 flex flex-col items-start z-50 fade-in"
                >
                  <div class="w-full p-4 flex flex-row items-end justify-end">
                    <font-awesome-icon
                      :icon="['fas', 'times']"
                      class="mx-3 cursor-pointer text-xl text-white"
                      @click="close_modal"
                    />
                  </div>
                  <div class="w-full h-[90vh] flex flex-row">
                    <div
                      class="h-full w-[15%] flex flex-col justify-center align-center items-center"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'chevron-left']"
                        class="mx-3 cursor-pointer text-3xl text-white"
                        @click="select_previous"
                      />
                    </div>
                    <!-- Main content -->
                    <div class="container mx-auto flex flex-row">
                      <div
                        class="w-[70%] h-full flex flex-col justify-center items-center"
                      >
                        <div class="w-full">
                          <video
                            v-if="state.target_project"
                            ref="video_elem"
                            id="video_elem"
                            class="video-js vjs-default-skin vjs-big-play-centered w-full"
                          ></video>
                          <img
                            v-if="!state.target_project"
                            :src="state.target_project.images[0].url"
                            class="w-full h-[70vh] object-cover"
                          />
                        </div>
                      </div>
                      <div
                        class="w-[30%] h-full flex flex-col justify-start items-start p-4"
                      >
                        <h1 class="text-5xl text-white mt-20 mb-4">
                          {{ state.target_project.title }}
                        </h1>
                        <p class="text-white">
                          {{ state.target_project.description }}
                        </p>
                        <div
                          v-if="state.target_project.videos.length > 1"
                          class="w-full h-full overflow-y-scroll p-4 mt-20"
                        >
                          <div class="grid grid-cols-2 gap-2">
                            <div
                              v-for="(video, b) in state.target_project.videos"
                              :key="b"
                              class="w-full h-[100px] flex flex-col justify-center items-center relative"
                            >
                              <div
                                class="w-full h-full absolute top-0 z-20 cursor-pointer hover:bg-black/80"
                                @click="toggle_target_video(video.link)"
                              ></div>
                              <!-- <video
                                class="w-full h-full object-cover absolute z-10"
                                :src="video.link"
                              >
                                Damn :( Your browser doesn't' support the video
                                tag cuz its lame. Get a new browser.
                              </video> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="h-full w-[15%] flex flex-col justify-center align-center items-center"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'chevron-right']"
                        class="mx-3 cursor-pointer text-3xl text-white"
                        @click="select_next"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
        <!-- Blog tags, authors, and more here -->
        <div
          class="w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"
        >
          <!-- <h2
            class="text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"
          >
            Tags
          </h2> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";
// import Hls from "hls.js";
import videojs from "video.js";
const video_elem = ref(null);

// Meta
definePageMeta({
  title: "cKuro - Portfolio",
  descripton: "The Captain's work",
  layout: "portfolio",
});

// Components
import PortfolioCard from "./components/PortfolioCard.vue";

// Stores
const portfolioStore = usePortfolioStore();
portfolioStore.fetchPortfolio();

// State
const state = reactive({
  target_project: null,
  modal: {
    open: false,
  },
  comp: 0,
  target_video: false,
});

// Methods
//
let player = ref(null);

const load_video = () => {
  const video = video_elem.value;
  console.log("video", video[0].id, state.target_video);
  if (video[0].id) {
    player.value = videojs(video[0].id, {
      controls: true,
      autoplay: true,
      preload: "auto",
      fluid: true,
      sources: [
        {
          src: state.target_video,
          type: "application/x-mpegURL",
        },
      ],
    });
  }
};

const reload_video = () => {
  if (player.value) {
    player.value.dispose();
    player.value = null;
    nextTick(() => {
      load_video();
    });
  } else {
    nextTick(() => {
      load_video();
    });
  }
};

const open_modal = (project) => {
  state.target_project = project;
  state.target_video = project.videos[0]?.link;
  state.modal.open = true;
  nextTick(() => {
    load_video();
  });
};

const close_modal = () => {
  state.modal.open = false;
  state.target_project = null;
  state.target_video = false;
  nextTick(() => {
    if (player.value) {
      player.value.dispose();
      player.value = null;
    }
  });
};

const toggle_target_video = (video) => {
  state.target_video = video;
  state.comp++;
};

// select next project
const select_next = () => {
  state.target_video = false;
  if (player.value) {
    player.value.dispose();
    player.value = null;
  }
  const projects = portfolioStore.projects.data;
  const index = projects.findIndex(
    (project) => project.id === state.target_project.id,
  );
  if (index === projects.length - 1) {
    state.target_project = projects[0];
    state.target_video = projects[0].videos[0]?.link;
    nextTick(() => {
      state.comp++;
      reload_video();
    });
  } else {
    state.target_project = projects[index + 1];
    state.target_video = projects[index + 1].videos[0]?.link;
    state.comp++;
    nextTick(() => {
      reload_video();
    });
  }
};

// select previous project
const select_previous = () => {
  const projects = portfolioStore.projects.data;
  const index = projects.findIndex(
    (project) => project.id === state.target_project.id,
  );
  if (index === 0) {
    state.target_project = projects[projects.length - 1];
    state.target_video = projects[projects.length - 1].videos[0]?.link;
    nextTick(() => {
      state.comp++;
      reload_video();
    });
  } else {
    state.target_project = projects[index - 1];
    state.target_video = projects[index - 1].videos[0]?.link;

    nextTick(() => {
      state.comp++;
      reload_video();
    });
  }
};
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
