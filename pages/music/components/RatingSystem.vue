<template>
  <div
    class="w-full flex flex-row justify-start items-center align-center text-xs"
  >
    <font-awesome-icon
      v-for="i in 5"
      class="me-2 cursor-pointer hover:text-yellow-500"
      :icon="['far', 'star']"
      :color="'#8d8484'"
      :key="i"
      @click="select_rating(i)"
    />
  </div>
</template>
<script setup>
// Config
const config = useRuntimeConfig();

const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  stars: {
    1: props.track.ratings.one_star,
    2: props.track.ratings.two_stars,
    3: props.track.ratings.three_stars,
    4: props.track.ratings.four_stars,
    5: props.track.ratings.five_stars,
  },
  selected_rating: 0,
  rated: false,
  rating: 0,
  average: props.track.ratings.average_rating,
  total: 0,
  num_votes: props.track.ratings.num_votes,
});

const calculate_average = () => {
  for (let i = 1; i <= 5; i++) {
    state.total += state.stars[i] * i;
  }
  nextTick(() => {
    state.average = state.total / props.track.ratings.total;
  });
};

const calculate_total = () => {
  state.stars.total =
    state.stars.one_star +
    state.stars.two_stars +
    state.stars.three_stars +
    state.stars.four_stars +
    state.stars.five_stars;
};

onMounted(() => {
  calculate_average();
});

const select_rating = (rating) => {
  console.log("rating: ", rating);

  state.selected_rating = rating;
  state.rated = true;
  state.rating = rating;
  // update db via API call:
  // console.log("wtf? ", config.public.NUXT_STRAPI_URL);
  $fetch(`${config.public.NUXT_STRAPI_URL}/api/tracks/${props.track.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        ratings: {
          one_star: rating === 1 ? state.stars[1] + 1 : state.stars[1],
          two_stars: rating === 2 ? state.stars[2] + 1 : state.stars[2],
          three_stars: rating === 3 ? state.stars[3] + 1 : state.stars[3],
          four_stars: rating === 4 ? state.stars[4] + 1 : state.stars[4],
          five_stars: rating === 5 ? state.stars[5] + 1 : state.stars[5],
          total: props.track.ratings.total + 1,
          average_rating: state.average,
          num_votes: props.track.ratings.num_votes + 1,
        },
      },
    }),
  })
    .then((result) => {
      console.log("rating result: ", result);
      // if (result.ok) {
      //   calculate_average();
      // }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<style lang="scss"></style>
