<template>
  <div class="w-full absolute z-20 h-[80vh] mx-auto p-10">
    <div class="container mx-auto py-10 ps-20">
      <a
        href="/"
        class="text-white matrix text-6xl font-thin fade-in text-center"
        >cKuro</a
      >
    </div>
    <div class="container mx-auto h-full px-20 flex items-start justify-start">
      <div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5">
        <div class="ctr-main h-full shadow-xl me-5">
          <!-- Music meat + potatoes -->
        </div>
      </div>
      <TemplateNav :links="state.nav_links" />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  title: "cKuro - Music",
  descripton: "Captain Kuro's music n shit",
  layout: "musi",
});
</script>
