<template>
  <div
    class="w-full h-[50px] my-2 p-2 border-thin border-light flex flex-row justify-start align-center items-center"
  >
    <div class="w-[10%] text-gray-100 font-thin ps-2">
      <font-awesome-icon
        :icon="['fas', 'pause']"
        color="#8d8484"
        class="me-3 hover:cursor-pointer"
        v-if="
          musicStore.player.track == props.track && musicStore.player.playing
        "
        @click="musicStore.pause(props.track, props.index)"
      />
      <font-awesome-icon
        v-else
        :icon="['fas', 'play']"
        color="8d8484"
        class="me-3 hover:cursor-pointer"
        :class="
          musicStore.player.track == props.track
            ? 'text-primary_accent'
            : 'text-white'
        "
        @click="musicStore.play(props.track, props.index)"
      />
    </div>
    <div class="w-[40%] text-gray-100 font-thin">
      <span>{{ props.track.title }}</span>
    </div>
    <div class="w-[15%] text-gray-100 font-thin">
      <p
        v-for="(artist, a) in props.track.music_artists"
        :key="a"
        class="text-xs"
      >
        {{ artist.name }}
        <span
          v-if="
            props.track.music_artists.length > 1 &&
            a == props.track.music_artists.length - 2
          "
          >,
        </span>
      </p>
    </div>
    <div class="w-[20%] text-gray-100 font-thin">
      <span class="text-xs">{{ props.track.album.title }}</span>
    </div>
    <div class="w-[25%]  font-thin">
      <RatingSystem :track="props.track" />
    </div>
    <!-- <div class="w-[15%] text-gray-100 font-thin">
      <span>{{ props.track.duration }}</span>
    </div> -->
  </div>
</template>
<script setup>
const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const musicStore = useMusicStore();

import RatingSystem from "./RatingSystem.vue";

const state = reactive({
  init: false,
  selected: false,
});
</script>
<style lang="scss">
.border-thin {
  border: 1px solid;
}
.border-light {
  border-color: #8d8484;
}
.player-gray {
  color: #8d8484;
}
</style>
