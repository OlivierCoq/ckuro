<template>
  <div
    v-if="!state.rated"
    class="w-full flex flex-row justify-start items-center align-center text-xs"
  >
    <font-awesome-icon
      v-for="i in 5"
      class="me-2 cursor-pointer hover:text-yellow-400"
      :class="[
        {
          'text-yellow-400':
            i <= state.selected_rating ||
            i <= state.hover ||
            i <= state.average,
          'text-gray-400': i > state.selected_rating,
        },
      ]"
      :icon="[`${i <= state.selected_rating ? 'fas' : 'far'}`, 'star']"
      :color="'#8d8484'"
      :key="i"
      @click="select_rating(i)"
      @mouseover="star_hover(i)"
      @mouseleave="star_hover(0)"
    />
  </div>
  <div
    v-else
    class="w-full flex flex-row justify-start items-center align-center text-xs"
  >
    <font-awesome-icon
      v-for="i in 5"
      class="me-2 cursor-pointer hover:text-yellow-400"
      :class="i <= state.rating ? 'text-yellow-400' : 'text-gray-400'"
      :icon="[`${i <= state.selected_rating ? 'fas' : 'far'}`, 'star']"
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
    one_star: props.track.ratings.one_star,
    two_stars: props.track.ratings.two_stars,
    three_stars: props.track.ratings.three_stars,
    four_stars: props.track.ratings.four_stars,
    five_stars: props.track.ratings.five_stars,
  },
  selected_rating: 0,
  rated: false,
  rating: 0,
  average: props.track.ratings.average_rating,
  sum_of_ratings: 0,
  num_votes: props.track.ratings.num_votes,
  hover: 0,
});

const num_of_ratings = () => {
  state.num_votes =
    state.stars.one_star +
    state.stars.two_stars +
    state.stars.three_stars +
    state.stars.four_stars +
    state.stars.five_stars;

  return state.num_votes;
};

const sum_of_ratings = () => {
  state.sum_of_ratings =
    state.stars.one_star +
    state.stars.two_stars * 2 +
    state.stars.three_stars * 3 +
    state.stars.four_stars * 4 +
    state.stars.five_stars * 5;

  return state.sum_of_ratings;
};

const calculate_average = () => {
  // Average Rating = (Sum of Ratings) / (Number of Ratings)
  state.average = sum_of_ratings() / num_of_ratings();
  // console.log("calculating average: ", state.average);
  return state.average;
};

const star_hover = (rating) => {
  state.hover = rating;
};

onMounted(() => {
  calculate_average();
});

const select_rating = (rating) => {
  // console.log("rating: ", rating);

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
          one_star:
            rating === 1 ? state.stars.one_star + 1 : state.stars.one_star,
          two_stars:
            rating === 2 ? state.stars.two_stars + 1 : state.stars.two_stars,
          three_stars:
            rating === 3
              ? state.stars.three_stars + 1
              : state.stars.three_stars,
          four_stars:
            rating === 4 ? state.stars.four_stars + 1 : state.stars.four_stars,
          five_stars:
            rating === 5 ? state.stars.five_stars + 1 : state.stars.five_stars,
          total: props.track.ratings.total + 1,
          average_rating: calculate_average(),
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
