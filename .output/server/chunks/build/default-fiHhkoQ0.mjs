import { _ as _sfc_main$1 } from './Nav-jBzLuCfj.mjs';
import { b as useRuntimeConfig } from './server.mjs';
import { reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "default",
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
      const _component_TemplateNav = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[100vh] w-full relative" }, _attrs))}><canvas id="c" class="w-full h-full absolute z-0"></canvas><div class="w-full h-full absolute z-10 bg-black opacity-[0.5]"></div><div class="w-full absolute z-20 h-[80vh] mx-auto p-10"><div class="container mx-auto py-10 ps-20 text-center"><a href="/" class="text-white matrix neon-flicker text-6xl font-thin fade-in ms-[-15rem]">cKuro</a></div><div class="main-ctr mx-auto h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"><div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5 mb-5"><div class="ctr-main h-full shadow-xl me-5 rounded-sm">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><div class="w-full lg:w-1/4 order-first lg:order-last">`);
      _push(ssrRenderComponent(_component_TemplateNav, {
        links: state.nav_links
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-fiHhkoQ0.mjs.map
