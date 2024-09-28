<template>
  <div class="w-full h-full rounded-md p-4 flex flex-col overflow-y-scroll">
    <div v-if="!props.threads.length" class="font-thin text-sm">Kinda empty here. Log in and get the party started!</div>
    <Thread v-for="(thread, a) in props.threads" :key="a" :thread="thread" />
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
</script>
<style lang="scss"></style>
 