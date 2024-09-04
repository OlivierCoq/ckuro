import { b as useRuntimeConfig } from './server.mjs';
import { reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const state = reactive({
      title: "cKuro",
      nav_links: []
    });
    fetch(
      `${config.public.NUXT_STRAPI_URL}/api/site-nav?${qs.stringify(
        {
          populate: ["links"]
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute top-0 left-0 right-0 z-20 flex flex-col justify-center align-middle h-[100vh] w-[100vw]" }, _attrs))}><a href="/" class="text-white matrix text-6xl font-thin fade-in text-center neon-flicker">${ssrInterpolate(unref(state).title)}</a><div class="w-full lg:w-2/3 mx-auto p-4 flex flex-row items-center justify-between pt-20"><!--[-->`);
      ssrRenderList(unref(state).nav_links, (item, a) => {
        _push(`<a${ssrRenderAttr("href", item.link)} class="text-white text-lg font-thin fade-in mx-3 matrix hover-text-primary_accent hover:cursor-pointer">${ssrInterpolate(item.label)}</a>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-j4zsTO8T.mjs.map
