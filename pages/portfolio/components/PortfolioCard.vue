<template>
  <div
    class="bg-cover bg-no-repeat p-2 h-full w-full"
    :style="`background-image: url(${props.project.images[0]?.url})`"
  >
    <div
      class="bg-black bg-opacity-10 hover:bg-opacity-50 p-4 h-full flex flex-col justify-center cursor-pointer"
      @click="open_modal"
    >
      <h3 class="text-white text-lg font-bold matrix">
        {{ props.project.title }}
      </h3>
      <p class="text-white text-sm">{{ props.project.description }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  modal: {
    open: false,
  },
});

// set up list of emit events:
const emits = defineEmits(["previous", "next", "close", "open", "select"]);

// emit events:
const select_previous = () => {
  emits("previous");
};
const select_next = () => {
  emits("next");
};
const open_modal = () => {
  emits("open", props.project);
};
const close_modal = () => {
  state.modal.open = !state.modal.open;
  emits("close");
};
</script>
<style lang="scss"></style>
