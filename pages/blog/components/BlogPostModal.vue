<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/70 bg-opacity-90 flex flex-col items-start z-50 fade-in overflow-y-scroll"
  >
    <div class="w-full p-4 flex flex-row items-end justify-end">
      <font-awesome-icon
        :icon="['fas', 'times']"
        class="mx-3 cursor-pointer text-xl text-white"
        @click="close_blog_modal"
      />
    </div>
    <div class="w-full h-[95vh] flex flex-col items-center justify-start">
      <div
        class="w-11/12 h-full bg-white rounded-lg flex flex-col items-center justify-s"
      >
        <div
          class="w-full h-1/2 flex flex-col items-start justify-center bg-start bg-cover bg-no-repeat"
          :style="`background-image: url('${props.post.hero_image.url}');`"
        >
          <!-- <img
            :src="post.hero_image.url"
            alt="post image"
            class="w-full h-full object-cover rounded-t-lg"
          /> -->
        </div>
        <div class="w-full h-1/2 p-4 flex flex-col items-start justify-start">
          <div class="w-full flex flex-row justify-between">
            <h1 class="text-2xl font-bold text-gray-800 matrix mb-10">
              {{ post.title }}
            </h1>
          </div>
          <div class="w-full lg:w-3/4 post-body pe-8 overflow-y-scroll">
            <vue-markdown :source="post.body" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// components
import VueMarkdown from "vue-markdown-render";

// Emit methods
const emits = defineEmits(["close"]);
const close_blog_modal = () => {
  console.log("close blog modal");
  emits("close");
};
</script>
<style lang="scss">
.post-body {
  div {
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1rem;
    }
  }
}
</style>
