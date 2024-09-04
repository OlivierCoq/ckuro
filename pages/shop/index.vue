<template>
  <div class="h-full overflow-y-scroll">
    <!-- Store from ecwid goes here -->

    <!--Search-->
    <div class="p-5">
      <div id="my-search-104674311"></div>
    </div>
    <!--Categories-->
    <div class="px-5 pb-5">
      <div id="my-categories-104674311"></div>
    </div>
    <!--Products-->
    <div class="px-5 pb-5">
      <div id="my-store-104674311"></div>
    </div>
  </div>
</template>
<script setup>
// ecWid
// Browser
onMounted(() => {
  xProductBrowser(
    "categoriesPerRow=2",
    "views=grid(20,3) list(60) table(60)",
    "categoryView=grid",
    "searchView=list",
    "id=my-store-104674311",
  );
  // Search
  xSearch("id=my-search-104674311");
  // Categories
  xCategoriesV2("id=my-categories-104674311");
});
</script>
<style lang="scss">
.grid__categories {
  display: none !important;
}
</style>
