import { _ as _sfc_main$4 } from './Nav-jBzLuCfj.mjs';
import { resolveComponent, unref, useSSRContext } from 'vue';
import { u as useMusicStore } from './music-ikm3rf6v.mjs';
import { ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import _sfc_main$1 from './TrackBox-BQgPHskX.mjs';
import _sfc_main$2 from './ArtistBox-zDxCXV4l.mjs';
import _sfc_main$3 from './MusicPlayer-DXp-LnTL.mjs';
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
import './RatingSystem-BQ9Gy9xH.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const musicStore = useMusicStore();
    musicStore.init_music();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_TemplateNav = _sfc_main$4;
      _push(`<!--[--><div class="w-full absolute z-20 h-[80vh] mx-auto p-10"><div class="container mx-auto py-10 ps-20 text-center"><a href="/" class="text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]">cKuro</a></div><div class="main-ctr mx-auto h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"><div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5"><div class="ctr-main h-full shadow-xl me-5"><div class="w-full h-full flex flex-col justify-start items-start align-start py-4"><div class="flex flex-row w-full mb-4 px-4"><div class="w-[90%] h-[40px] border-thin border-light p-2 me-2"><input type="text" class="w-full h-full bg-transparent text-white font-thin search" placeholder="Search for music..."${ssrRenderAttr("value", unref(musicStore).search.query)}></div><button class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "magnifying-glass"],
        color: "#8d8484"
      }, null, _parent));
      _push(`</button></div><div class="w-full h-full flex flex-col justify-start items-start align-start"><div class="w-full h-[120px] flex flex-col justify-start items-start align-start">`);
      if (unref(musicStore).interface) {
        _push(`<div class="w-full flex flex-wrap justify-start items-start align-start px-4 mb-4"><p class="text-white font-bold me-3">genres:</p><!--[-->`);
        ssrRenderList(unref(musicStore).interface.data.genres, (genre, index) => {
          _push(`<div class="${ssrRenderClass([{ "bg-primary_accent": genre.active }, "filter-box h-[40px] px-2 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center"])}"><p class="text-white font-thin">${ssrInterpolate(genre.label)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(musicStore).interface) {
        _push(`<div class="w-full flex flex-wrap justify-start items-start align-start px-4 mb-4"><p class="text-white font-bold me-2">artists:</p><!--[-->`);
        ssrRenderList(unref(musicStore).interface.data.artists, (artist, index) => {
          _push(`<div class="${ssrRenderClass([{ "bg-primary_accent": artist.active }, "filter-box h-[40px] px-2 py-1 bg-zinc-700 hover:bg-zinc-800 cursor-pointer rounded-md me-2 flex flex-col justify-center items-center"])}"><p class="text-white font-thin">${ssrInterpolate(artist.label)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(musicStore).search.filters.length > 0) {
        _push(`<div class="filter-box h-[30px] px-2 py-1 cursor-pointer rounded-md me-2 flex flex-row justify-center items-center ms-2 z-20"><p class="text-white font-thin me-2">clear</p>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "times"],
          color: "#8d8484"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full h-[40px] flex flex-row justify-start items-center align-center mx-4 py-4"><div class="w-[10%] text-gray-400 font-thin ps-4"></div><div class="w-[40%] text-gray-400 font-thin">Title</div><div class="w-[25%] text-gray-400 font-thin">Artist</div><div class="w-[25%] text-gray-400 font-thin">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "star"],
        color: "#8d8484"
      }, null, _parent));
      _push(`</div></div>`);
      if (unref(musicStore).search.results) {
        _push(`<div class="w-[95%] mx-auto h-[75%] overflow-y-scroll relative"><!--[-->`);
        ssrRenderList(unref(musicStore).search.results, (track, index) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: index,
            track,
            index
          }, null, _parent));
        });
        _push(`<!--]-->`);
        if (((_b = (_a = unref(musicStore).search) == null ? void 0 : _a.results) == null ? void 0 : _b.length) > 12) {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            icon: ["fas", "arrow-down"],
            class: "mx-3 text-xl text-white sticky z-20 bottom-0 left-[95%] right-0"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="w-full h-full order-first lg:order-last flex flex-col justify-between mb-4"><div>`);
      _push(ssrRenderComponent(_component_TemplateNav, null, null, _parent));
      _push(`</div><div class="w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"><h2 class="text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"> Artists </h2><!--[-->`);
      ssrRenderList(unref(musicStore).artists.data, (artist, a) => {
        _push(ssrRenderComponent(_sfc_main$2, {
          key: a,
          artist
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (((_d = (_c = unref(musicStore).artists) == null ? void 0 : _c.data) == null ? void 0 : _d.length) > 3) {
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "arrow-down"],
          class: "mx-3 cursor-pointer text-xl text-white sticky z-20 bottom-0 right-0"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      if (unref(musicStore).player.track) {
        _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/music/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-govGSW2C.mjs.map
