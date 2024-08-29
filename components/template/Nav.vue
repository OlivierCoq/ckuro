<template>
  <div
    id="site_nav"
    class="w-full mb-5 flex flex-row items-start justify-start align-start rounded-sm shadow-xl"
  >
    <div class="w-full p-4 flex flex-col">
      <div v-for="(item, a) in props.links" :key="a" class="flex flex-row">
        <div class="w-1/3 p-4">
          <a
            :href="item.link"
            class="text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase"
            >{{ item.label }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// props:
const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});
</script>
<style lang="scss">
#site_nav {
  border: 1px solid #8d8484;
}
</style>
