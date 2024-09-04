import { b as useRuntimeConfig } from './server.mjs';
import { reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import qs from 'qs';
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
  __name: "music",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const state = reactive({
      nav_links: []
    });
    fetch(
      `${config.public.NUXT_STRAPI_URL}/api/site-nav?${qs.stringify(
        {
          populate: ["links", "links.imagery"]
        },
        { arrayFormat: "comma" }
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(async (data) => {
      const res = await data.json();
      state.nav_links = res.data.links;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[100vh] w-full relative" }, _attrs))}><canvas id="c" class="w-full h-full absolute z-0"></canvas><div class="w-full h-full absolute z-10 bg-black opacity-[0.5]"></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/music.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=music-DlOo5On1.mjs.map
