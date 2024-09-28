<template>
  <div class="w-full h-full rounded-md p-4 flex flex-col justify-start">
    <div v-if="!props.threads.length" class="font-thin text-sm">Kinda empty here. Log in and get the party started!</div>
    <div class="w-full min-h-[10rem] bg-red-400 mb-6">
      <input type="text" class="w-full h-full border-thin border-zinc-200 p-1" v-model="state.new_comment" :placeholder="state.logged_in ? 'comment' : 'log in before commenting'" />
      <button 
        class="w-full h-[32px] m-0 bg-primary_accent text-white" 
        :disabled="!state.logged_in"
        :class="!state.logged_in ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
      >
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button> 
    </div>
    <div class="w-full min-h-[15rem] mt-6 mb-3 overflow-y-scroll">
      <Thread v-for="(thread, a) in props.threads" :key="a" :thread="thread" />
    </div>
    <!-- <Thread v-for="(thread, a) in props.threads" :key="a" :thread="thread" /> -->
  </div>
</template>
<script setup>
const props = defineProps({
  threads: {
    type: Array,
    required: true,
  },
});

import Thread from './Thread.vue';

const state = reactive({
  new_comment: "",
  logged_in: false
});
</script>
<style lang="scss"></style>
 