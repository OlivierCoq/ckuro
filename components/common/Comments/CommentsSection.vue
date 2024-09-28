<template>
  <div class="w-full h-full rounded-md p-4 flex flex-col justify-start">
    <div v-if="!props.threads.length" class="font-thin text-sm mb-2">Kinda empty here. Log in and get the party started!</div>

    <div v-if="!state.logging_in" class="w-full min-h-[8rem] mb-8 pb-8">
      <textarea type="text" class="w-full h-full border-thin border-zinc-200 p-1" v-model="state.new_comment" :placeholder="state.logged_in ? 'comment' : 'log in before commenting'" />
      <button 
        class="w-full h-[32px] m-0 bg-primary_accent text-white" 
        :disabled="!state.logged_in"
        :class="!state.logged_in ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
      >
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button> 
      <p v-if="!authStore.user" class="font-bold cursor-pointer my-2" @click="state.logging_in = true">Login / Register</p>
    </div>

    <div v-else class="w-full min-h-[10rem] mb-8 justify-center">
    <!-- login/register form:-->
      <form class="w-full flex flex-col items-center justify-center pe-10">
        <input type="text" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="username" />
        <input type="password" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="password" />
        <div class="w-full flex flex-row content-center justify-start">
          <button class="h-[32px] me-2 px-4 bg-primary_accent text-white">Login</button>
          <button class="h-[32px] me-2 px-4 bg-secondary_accent text-white">Register</button>
          <p class="font-bold cursor-pointer" @click="state.logging_in = false">Back</p>
        </div>
      </form>
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

const authStore = useAuthStore();

const state = reactive({
  new_comment: "",
  logged_in: false,
  logging_in: false,

});
</script>
<style lang="scss"></style>
 