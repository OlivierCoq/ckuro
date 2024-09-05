<template>
  <div
    class="h-full overflow-y-scroll grid grid-cols-2 lg:grid-cols-2 gap-2 p-4"
  >
    <PortfolioCard
      v-for="(project, a) in portfolioStore.projects.data"
      :key="a"
      :project="project"
      @open="open_modal(project)"
    />
    <!-- Modal -->
    <div
      v-if="state.modal.open"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-start z-50 fade-in"
    >
      <div class="w-full p-4 flex flex-row items-end justify-end">
        <font-awesome-icon
          :icon="['fas', 'times']"
          class="mx-3 cursor-pointer text-xl text-white"
          @click="state.modal.open = !state.modal.open"
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
          <div class="w-[70%] h-full flex flex-col justify-center items-center">
            <img
              :src="state.target_project.images[0].url"
              class="w-full h-[70vh] object-cover"
            />
          </div>
          <div
            class="w-[30%] h-full flex flex-col justify-start items-start p-4"
          >
            <h1 class="text-5xl text-white mt-20 mb-4">
              {{ state.target_project.title }}
            </h1>
            <p class="text-white">{{ state.target_project.description }}</p>
            <div class="flex flex-row"></div>
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
</template>
<script setup>
const portfolioStore = usePortfolioStore();
portfolioStore.fetchPortfolio();

import PortfolioCard from "./components/PortfolioCard.vue";

const state = reactive({
  target_project: null,
  modal: {
    open: false,
  },
});

const open_modal = (project) => {
  state.target_project = project;
  state.modal.open = true;
};

// methods:
// select next project
const select_next = () => {
  const projects = portfolioStore.projects.data;
  const index = projects.findIndex(
    (project) => project.id === state.target_project.id,
  );
  if (index === projects.length - 1) {
    state.target_project = projects[0];
  } else {
    state.target_project = projects[index + 1];
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
  } else {
    state.target_project = projects[index - 1];
  }
};
// fetch portfolio
</script>
