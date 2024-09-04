import { b as useRuntimeConfig } from './server.mjs';
import { reactive, resolveComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import '@fortawesome/free-regular-svg-icons';

const _sfc_main = {
  __name: "RatingSystem",
  __ssrInlineRender: true,
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const props = __props;
    const state = reactive({
      stars: {
        one_star: props.track.ratings.one_star,
        two_stars: props.track.ratings.two_stars,
        three_stars: props.track.ratings.three_stars,
        four_stars: props.track.ratings.four_stars,
        five_stars: props.track.ratings.five_stars
      },
      selected_rating: 0,
      rated: false,
      rating: 0,
      average: props.track.ratings.average_rating,
      sum_of_ratings: 0,
      num_votes: props.track.ratings.num_votes
    });
    const num_of_ratings = () => {
      state.num_votes = state.stars.one_star + state.stars.two_stars + state.stars.three_stars + state.stars.four_stars + state.stars.five_stars;
      return state.num_votes;
    };
    const sum_of_ratings = () => {
      state.sum_of_ratings = state.stars.one_star + state.stars.two_stars * 2 + state.stars.three_stars * 3 + state.stars.four_stars * 4 + state.stars.five_stars * 5;
      return state.sum_of_ratings;
    };
    const calculate_average = () => {
      state.average = sum_of_ratings() / num_of_ratings();
      return state.average;
    };
    const select_rating = (rating) => {
      state.selected_rating = rating;
      state.rated = true;
      state.rating = rating;
      $fetch(`${config.public.NUXT_STRAPI_URL}/api/tracks/${props.track.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          data: {
            ratings: {
              one_star: rating === 1 ? state.stars.one_star + 1 : state.stars.one_star,
              two_stars: rating === 2 ? state.stars.two_stars + 1 : state.stars.two_stars,
              three_stars: rating === 3 ? state.stars.three_stars + 1 : state.stars.three_stars,
              four_stars: rating === 4 ? state.stars.four_stars + 1 : state.stars.four_stars,
              five_stars: rating === 5 ? state.stars.five_stars + 1 : state.stars.five_stars,
              total: props.track.ratings.total + 1,
              average_rating: calculate_average(),
              num_votes: props.track.ratings.num_votes + 1
            }
          }
        })
      }).then((result) => {
        console.log("rating result: ", result);
      }).catch((err) => {
        console.log(err);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      if (!unref(state).rated) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-row justify-start items-center align-center text-xs" }, _attrs))}><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            class: ["me-2 cursor-pointer hover:text-yellow-400", [
              {
                "text-yellow-400": i <= unref(state).selected_rating,
                "text-gray-400": i > unref(state).selected_rating,
                "text-yellow-400": i <= unref(state).average
              }
            ]],
            icon: [`${i <= unref(state).selected_rating ? "fas" : "far"}`, "star"],
            color: "#8d8484",
            key: i,
            onClick: ($event) => select_rating(i)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex flex-row justify-start items-center align-center text-xs" }, _attrs))}><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            class: ["me-2 cursor-pointer hover:text-yellow-400", i <= unref(state).rating ? "text-yellow-400" : "text-gray-400"],
            icon: [`${i <= unref(state).selected_rating ? "fas" : "far"}`, "star"],
            color: "#8d8484",
            key: i,
            onClick: ($event) => select_rating(i)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/music/components/RatingSystem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=RatingSystem-BQ9Gy9xH.mjs.map
