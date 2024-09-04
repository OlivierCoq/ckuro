import { f as useRoute, b as useRuntimeConfig } from './server.mjs';
import { reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import qs from 'qs';

const _sfc_main = {
  __name: "Nav",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      required: false
    }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const props = __props;
    const route = useRoute();
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "site_nav",
        class: "w-full mb-5 flex flex-row items-start justify-start align-start rounded-sm shadow-xl"
      }, _attrs))}>`);
      if (props.links) {
        _push(`<div class="w-full p-4 flex flex-col"><!--[-->`);
        ssrRenderList(props.links, (item, a) => {
          _push(`<div class="flex flex-row"><div class="w-1/3 p-4"><a${ssrRenderAttr("href", item.link)} class="${ssrRenderClass([{ "text-primary_accent": unref(route).path === item.link }, "text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase"])}">${ssrInterpolate(item.label)}</a></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(state).nav_links) {
        _push(`<div class="w-full p-4 flex flex-col"><!--[-->`);
        ssrRenderList(unref(state).nav_links, (item, a) => {
          _push(`<div class="flex flex-row"><div class="w-1/3 p-4"><a${ssrRenderAttr("href", item.link)} class="${ssrRenderClass([{ "text-primary_accent": unref(route).path === item.link }, "text-white text-xl font-thin matrix hover-text-primary_accent cursor-pointer uppercase"])}">${ssrInterpolate(item.label)}</a></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/template/Nav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Nav-jBzLuCfj.mjs.map
