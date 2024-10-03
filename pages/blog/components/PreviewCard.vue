<template>
  <div
    class="w-full h-[750px] pt-4 px-4 pb-8 flex flex-col justify-start place-items-start align-start mb-4 bg-zinc-500/30 cursor-pointer"
  >
    <div
      class="h-[300px] w-full mx-auto bg-start bg-cover bg-no-repeat mb-5"
      :style="`background-image: url('${props.post.hero_image.url}');`"
      @click="select"
    ></div>
    <h2 class="text-2xl font-bold text-white matrix" @click="select">
      {{ props.post.title }}
    </h2>
    <p
      class="text-white text-lg mt-2 font-thin"
      v-html="create_excerpt(props.post.body)"
      @click="select"
    ></p>
    <BlogPostModal
      v-if="state.showBlogPostModal"
      :post="props.post"
      :store="props.store"
      @close="close_modal"
    />
  </div>
</template>
<script setup>
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

const state = reactive({
  showBlogPostModal: false,
});



// Components
import BlogPostModal from "./BlogPostModal.vue";

const create_excerpt = (content) => {
  const excerpt = `${content.replace(/<[^>]+>/g, "").substring(0, 100)}...`;
  return excerpt;
};

const emits = defineEmits(["selectPost", "closemodal"]);
const select = () => {
  state.showBlogPostModal = true;
  emits("selectPost");
};
const close_modal = () => {
  state.showBlogPostModal = false;
  emits("closemodal");
};
</script>
