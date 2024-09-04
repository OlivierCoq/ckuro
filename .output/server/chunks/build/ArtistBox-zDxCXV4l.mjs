import { reactive, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ArtistBox",
  __ssrInlineRender: true,
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      modal: {
        open: false,
        focus_album: null
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<!--[--><div class="w-full h-[200px] my-2 p-4 border-thin border-light flex flex-col justify-start align-center items-start"><div class="w-[150px] h-[150px] overflow-hidden relative"><img${ssrRenderAttr("src", (_a = props.artist.profile_picture) == null ? void 0 : _a.url)}${ssrRenderAttr("alt", props.artist.name)} class="w-full absolute top-0 z-0"><div class="w-full h-full flex bg-black/70 flex-col absolute top-0 z-10 justify-center text-center"><h3 class="text-secondary_accent text-lg font-bold matrix">${ssrInterpolate(props.artist.name)}</h3></div><div class="w-full h-full bg-black/80 absolute top-0 z-20 cursor-pointer opacity-0 hover:opacity-[1] flex flex-col justify-center text-center"><h3 class="text-white text-lg font-bold matrix">${ssrInterpolate(props.artist.name)}</h3></div></div></div>`);
      if (unref(state).modal.open) {
        _push(`<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-start z-50 fade-in"><div class="w-full p-4 flex flex-row items-end justify-end">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "times"],
          class: "mx-3 cursor-pointer text-xl text-white",
          onClick: ($event) => unref(state).modal.open = !unref(state).modal.open
        }, null, _parent));
        _push(`</div><div class="w-full h-[90vh] flex flex-col p-4 justify-center"><div class="container mx-auto flex flex-row"><div class="w-[150px] h-[150px] bg-cover no-repeat shadow-xl me-4" style="${ssrRenderStyle(`background-image: url(${props.artist.profile_picture.url})`)}"></div><div class="flex flex-col justify-center"><h3 class="text-white text-8xl font-bold matrix mb-3">${ssrInterpolate(props.artist.name)}</h3><p class="text-white text-lg matrix">${ssrInterpolate(props.artist.bio)}</p></div></div>`);
        if ((_b = props.artist.socials) == null ? void 0 : _b.length) {
          _push(`<div class="container mx-auto flex flex-row justify-start items-start mt-10"><div class="flex flex-row"><!--[-->`);
          ssrRenderList(props.artist.socials, (social) => {
            _push(`<a${ssrRenderAttr("href", social.link)} target="_blank" class="mx-3 hover:cursor-pointer">`);
            _push(ssrRenderComponent(_component_font_awesome_icon, {
              icon: ["fab", social.platform],
              class: "text-white hover-text-primary_accent text-2xl"
            }, null, _parent));
            _push(`</a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="container mx-auto p-4 flex flex-col mt-20"><h3 class="text-white text-4xl font-bold matrix mb-5">Albums</h3><div class="flex flex-col lg:flex-row full"><div class="flex flex-wrap w-1/2"><!--[-->`);
        ssrRenderList(props.artist.albums, (release) => {
          var _a2;
          _push(`<div class="w-[150px] h-[150px] bg-cover no-repeat shadow-xl me-4 mb-4" style="${ssrRenderStyle(`background-image: url(${(_a2 = release.artwork[0]) == null ? void 0 : _a2.url})`)}"></div>`);
        });
        _push(`<!--]--></div><div class="flex flex-col w-full lg:w-1/2">`);
        if (unref(state).modal.focus_album) {
          _push(`<div class="w-full h-[150px] bg-cover no-repeat shadow-xl mb-4" style="${ssrRenderStyle(`background-image: url(${(_c = unref(state).modal.focus_album.artwork[0]) == null ? void 0 : _c.url})`)}"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(state).modal.focus_album) {
          _push(`<div class="flex flex-col justify-center items-start"><h3 class="text-white">${ssrInterpolate(unref(state).modal.focus_album.title)}</h3><p class="text-white"><strong>Released:</strong> ${ssrInterpolate(unref(state).modal.focus_album.release_date)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/music/components/ArtistBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ArtistBox-zDxCXV4l.mjs.map
