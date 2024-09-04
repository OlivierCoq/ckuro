import { u as useMusicStore } from './music-ikm3rf6v.mjs';
import { reactive, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import _sfc_main$1 from './RatingSystem-BQ9Gy9xH.mjs';
import './server.mjs';
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
import 'qs';

const _sfc_main = {
  __name: "TrackBox",
  __ssrInlineRender: true,
  props: {
    track: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const musicStore = useMusicStore();
    reactive({
      init: false,
      selected: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-[50px] my-2 p-2 border-thin border-light flex flex-row justify-start align-center items-center" }, _attrs))}><div class="w-[10%] text-gray-100 font-thin ps-2">`);
      if (unref(musicStore).player.track == props.track && unref(musicStore).player.playing) {
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "pause"],
          color: "#8d8484",
          class: "me-3 hover:cursor-pointer",
          onClick: ($event) => unref(musicStore).pause(props.track, props.index)
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "play"],
          color: "8d8484",
          class: [
            "me-3 hover:cursor-pointer",
            unref(musicStore).player.track == props.track ? "text-primary_accent" : "text-white"
          ],
          onClick: ($event) => unref(musicStore).play(props.track, props.index)
        }, null, _parent));
      }
      _push(`</div><div class="w-[40%] text-gray-100 font-thin"><span>${ssrInterpolate(props.track.title)}</span></div><div class="w-[25%] text-gray-100 font-thin"><!--[-->`);
      ssrRenderList(props.track.music_artists, (artist) => {
        _push(`<span>${ssrInterpolate(artist.name)}</span>`);
      });
      _push(`<!--]--></div><div class="w-[25%] font-thin">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        track: props.track
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/music/components/TrackBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TrackBox-BQgPHskX.mjs.map
