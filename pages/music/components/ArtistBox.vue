<template>
  <div
    class="w-full h-[200px] my-2 p-4 border-thin border-light flex flex-col justify-start align-center items-start"
  >
    <div class="w-[150px] h-[150px] overflow-hidden relative">
      <img
        :src="props.artist.profile_picture?.url"
        :alt="props.artist.name"
        class="w-full absolute top-0 z-0"
      />
      <div
        class="w-full h-full flex bg-black/70 flex-col absolute top-0 z-10 justify-center text-center"
      >
        <h3 class="text-secondary_accent text-lg font-bold matrix">
          {{ props.artist.name }}
        </h3>
      </div>
      <div
        class="w-full h-full bg-black/80 absolute top-0 z-20 cursor-pointer opacity-0 hover:opacity-[1] flex flex-col justify-center text-center"
        @click="state.modal.open = !state.modal.open"
      >
        <h3 class="text-white text-lg font-bold matrix">
          {{ props.artist.name }}
        </h3>
      </div>
    </div>
  </div>
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
    <div class="w-full h-[90vh] flex flex-col p-4 justify-center">
      <div class="container mx-auto flex flex-row">
        <div
          class="w-[150px] h-[150px] bg-cover no-repeat shadow-xl me-4"
          :style="`background-image: url(${props.artist.profile_picture.url})`"
        ></div>
        <div class="flex flex-col justify-center">
          <h3 class="text-white text-8xl font-bold matrix mb-3">
            {{ props.artist.name }}
          </h3>
          <p class="text-white text-lg matrix">
            {{ props.artist.bio }}
          </p>
        </div>
      </div>
      <div
        v-if="props.artist.socials?.length"
        class="container mx-auto flex flex-row justify-start items-start mt-10"
      >
        <div class="flex flex-row">
          <a
            v-for="social in props.artist.socials"
            :key="social.id"
            :href="social.link"
            target="_blank"
            class="mx-3 hover:cursor-pointer"
          >
            <font-awesome-icon
              :icon="['fab', social.platform]"
              class="text-white hover-text-primary_accent text-2xl"
            />
          </a>
        </div>
      </div>
      <div class="container mx-auto p-4 flex flex-col mt-20">
        <h3 class="text-white text-4xl font-bold matrix mb-5">Albums</h3>
        <div class="flex flex-col lg:flex-row full">
          <div class="flex flex-wrap w-1/2">
            <div
              v-for="release in props.artist.albums"
              :key="release.id"
              class="w-[150px] h-[150px] bg-cover no-repeat shadow-xl me-4 mb-4"
              :style="`background-image: url(${release.artwork[0]?.url})`"
              @click="state.modal.focus_album = release"
            ></div>
          </div>
          <!-- details -->
          <div class="flex flex-col w-full lg:w-1/2">
            <div
              v-if="state.modal.focus_album"
              class="w-full h-[150px] bg-cover no-repeat shadow-xl mb-4"
              :style="`background-image: url(${state.modal.focus_album.artwork[0]?.url})`"
            ></div>
            <div
              v-if="state.modal.focus_album"
              class="flex flex-col justify-center items-start"
            >
              <h3 class="text-white">{{ state.modal.focus_album.title }}</h3>
              <p class="text-white">
                <strong>Released:</strong>
                {{ state.modal.focus_album.release_date }}
              </p>
              <!-- <p class="text-white">
                {{ state.modal.focus_album.description }}
              </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  artist: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  modal: {
    open: false,
    focus_album: null,
  },
});
</script>
<style lang="scss"></style>
