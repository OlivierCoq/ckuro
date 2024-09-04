import { _ as _sfc_main$1 } from './Nav-jBzLuCfj.mjs';
import { reactive, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { d as createPinia, e as defineStore } from './server.mjs';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import 'qs';
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
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import '@fortawesome/free-regular-svg-icons';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const useBlogStore = defineStore({
  id: "blogStore",
  state: () => {
    return {
      search: {
        query: "",
        results: [],
        filters: [],
        loading: false,
        error: null
      },
      interface: null,
      filters: [],
      active_filters: [],
      filter_key: 0,
      filter_option_key: 0,
      posts: [],
      comp_key: 0
    };
  },
  actions: {
    // API methods:
    // User methods:
    async doSearch() {
    }
  },
  getters: {},
  persist: {
    enabled: true
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const blogStore = useBlogStore();
    reactive({
      nav_links: [],
      posts: [],
      interface: {
        tags: [],
        authors: []
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_TemplateNav = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full absolute z-20 h-[80vh] mx-auto p-10" }, _attrs))}><div class="container mx-auto py-10 ps-20 text-center"><a href="/" class="text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]">cKuro</a></div><div class="main-ctr mx-auto h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"><div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5"><div class="ctr-main h-full shadow-xl me-5"><div class="w-full h-full flex flex-col justify-start items-start align-start py-4"><div class="flex flex-row w-full mb-4 px-4"><div class="w-[90%] h-[40px] border-thin border-light p-2 me-2"><input type="text" class="w-full h-full bg-transparent text-white font-thin search" placeholder="Search blog..."${ssrRenderAttr("value", unref(blogStore).search.query)}></div><button class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "magnifying-glass"],
        color: "#8d8484"
      }, null, _parent));
      _push(`</button></div></div></div></div><div class="w-full h-full order-first lg:order-last flex flex-col justify-between"><div>`);
      _push(ssrRenderComponent(_component_TemplateNav, null, null, _parent));
      _push(`</div><div class="w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"><h2 class="text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"> Tags </h2></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C97Br8_0.mjs.map
