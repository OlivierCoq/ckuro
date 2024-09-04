import { u as useMusicStore } from './music-ikm3rf6v.mjs';
import { resolveComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "MusicPlayer",
  __ssrInlineRender: true,
  setup(__props) {
    const musicStore = useMusicStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      if (unref(musicStore).player.track) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          id: "music_player",
          class: "music-player h-[5em] bottom-0 w-full bg-black z-20 left-0 fixed"
        }, _attrs))}><div class="w-full h-full flex flex-row justifty-start items-start"><div class="w-[20%] h-full flex flex-col px-5"><img${ssrRenderAttr("src", unref(musicStore).player.track.single_cover.url)}${ssrRenderAttr("alt", unref(musicStore).player.track.title)} class="w-[150px] mt-[-7rem]"><p class="text-white font-thin matrix text-sm">${ssrInterpolate(unref(musicStore).player.track.title)}</p></div><div class="w-[60%]"><audio id="audio_player" controls controlsList="nodownload" autoplay oncontextmenu="return false;" style="${ssrRenderStyle({ "display": "none" })}"><source${ssrRenderAttr("src", unref(musicStore).player.track.audio_file)} type="audio/mpeg"></audio><div class="flex flex-col w-full mt-2"><div class="h-[3rem] flex flex-row text-white justify-center items-center">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "backward-step"],
          class: "mx-3 cursor-pointer text-lg",
          onClick: unref(musicStore).select_previous
        }, null, _parent));
        if (!unref(musicStore).player.playing) {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            icon: ["fas", "play"],
            class: "mx-3 cursor-pointer text-3xl",
            onClick: ($event) => unref(musicStore).play(unref(musicStore).player.track)
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            icon: ["fas", "pause"],
            class: "mx-3 cursor-pointer text-3xl",
            onClick: ($event) => unref(musicStore).pause(unref(musicStore).player.track)
          }, null, _parent));
        }
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "forward-step"],
          class: "mx-3 cursor-pointer text-lg",
          onClick: unref(musicStore).select_next
        }, null, _parent));
        _push(`</div><div class="h-[2rem] w-full flex flex-row items-center justify-center"><div class="w-[10%] h-[15px] mb-[1rem] flex flex-col justify-center align-center items-end px-3">`);
        if (unref(musicStore).player.track) {
          _push(`<p class="text-white">${ssrInterpolate(unref(musicStore).player.elapsed)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div id="timeline" class="w-[80%] h-[5px] mb-[1rem] bg-neutral-900 mx-auto cursor-pointer">`);
        if (unref(musicStore).player.track) {
          _push(`<div class="scrubber h-[5px] bg-primary_accent hover:cursor-pointer" style="${ssrRenderStyle({ width: `${unref(musicStore).player.track_time}%` })}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-[10%] h-[15px] mb-[1rem] flex flex-col justify-center align-center items-start px-3">`);
        if (unref(musicStore).player.track) {
          _push(`<p class="text-white">${ssrInterpolate(unref(musicStore).player.duration)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="w-[20%] h-full"><div class="h-full w-full flex flex-row items-center justify-start">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: [
            "fas",
            `${unref(musicStore).player.mute ? "volume-mute" : "volume-up"}`
          ],
          class: "text-white mx-3 cursor-pointer",
          onClick: unref(musicStore).mute_track
        }, null, _parent));
        _push(`<div id="volume_adjuster" class="w-[60%] h-[5px] bg-neutral-900 cursor-pointer"><div class="scrubber h-[5px] bg-primary_accent hover:cursor-pointer" style="${ssrRenderStyle({ width: `${unref(musicStore).player.volume * 100}%` })}"></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/music/components/MusicPlayer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=MusicPlayer-DXp-LnTL.mjs.map
