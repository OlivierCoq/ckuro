<template>
  <div :id="`post-${props.post.id}`" class="w-full min-h-[90px] pt-4 px-4 pb-8 flex flex-col justify-start place-items-start align-start mb-4 bg-zinc-500/30 cursor-pointer">

     <div id="top_panel" class="w-full flex flex-row p-2 justify-start">
      <div v-if="props.post.user" class="w-[30px] h-[30px] me-2 bg-primary_accent rounded-full flex items-center justify-center">
        <p class="text-white text-sm matrix">{{ first_letter(props.post?.user?.username) }}</p>
      </div>
      <div class="flex flex-col">
        <p class="text-white text-lg">{{ props.post?.user?.username }}</p>
        <p class="text-white text-xs" v-html="calculate_time_posted(props.post.createdAt)"></p>
      </div>
     </div>

     <div id="post_body" class="w-full mt-2">
      <h2 class="text-2xl font-bold text-white matrix">
        {{ props.post.title }}
      </h2>
      <div v-if="props.post.body" class="body pt-4 text-white">
        <VueMarkdown :source="props.post.body" />
      </div>
     </div>

  </div>
</template>
<script setup>

  // props
  const props = defineProps({
    post: {
      type: Object,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    }
  });

  // state
  const state = reactive({
  });

  // components
  import VueMarkdown from "vue-markdown-render";

  // methods
    const first_letter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const calculate_time_posted = (time) => {
    const now = new Date();
    const comment_time = new Date(time);
    const diff = now - comment_time;
    const seconds = Math.floor(diff / 1000) ? Math.floor(diff / 1000) : 0;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} years ago`;
    } else if (months > 0) {
      return `${months} months ago`;
    } else if (weeks > 0) {
      return `${weeks} weeks ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };




</script>
<style lang="scss"></style>