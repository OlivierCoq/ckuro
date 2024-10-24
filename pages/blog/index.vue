<template>
  <div class="w-full absolute z-20 h-[80vh] mx-auto p-10">
    <div class="container mx-auto py-10 ps-20 text-center">
      <a
        href="/"
        class="text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]"
        >cKuro</a
      >
    </div>
    <div
      class="main-ctr mx-auto h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"
    >
      <div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5">
        <div class="ctr-main h-full shadow-xl me-5">
          <!-- Meat + Potatoes -->
          <div
            class="w-full h-full flex flex-col justify-between items-start align-start py-4"
          >
            <!-- Search -->
            <div class="flex flex-row w-full mb-4 px-4">
              <div class="w-[90%] h-[40px] border-thin border-light p-2 me-2">
                <input
                  type="text"
                  class="w-full h-full bg-transparent text-white font-thin search"
                  placeholder="Search blog..."
                  v-model="state.interface.search.query"
                  @keydown.enter="doSearch"
                />
              </div>
              <button
                v-if="!state.clear"
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="doSearch"
              >
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  color="#8d8484"
                />
              </button>
              <button
                v-else
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="clearSearch"
              >
                <font-awesome-icon :icon="['fas', 'times']" color="#8d8484" />
              </button>
            </div>

            <!-- Blog Posts -->
            <div class="flex-1 w-[95%] mx-auto flex flex-col overflow-y-scroll">
              <PreviewCard
                v-for="post in state.interface.search.results"
                :key="post.id"
                :post="post"
                :store="authStore"
                @select-post="state.select_post = post"
                @closemodal="state.select_post = null"
              />
            </div>

            <div class="navigation w-[95%] h-[40px] bg-zinc-500/30 mx-auto mt-4 flex flex-col justify-center items-center align-center">
              <div class="w-1/2 h-full mx-auto flex flex-row justify-center">
                <button
                  class="w-[50px] h-full border-thin border-light hover:cursor-pointer"
                  @click="prev_page"
                >
                  <font-awesome-icon
                    :icon="['fas', 'chevron-left']"
                    color="#8d8484"
                  />
                </button>
                <button
                  class="w-[50px] h-full border-thin border-light hover:cursor-pointer"
                  @click="next_page"
                  :disabled="
                    state.interface.pagination.page *
                      state.interface.pagination.pageSize >=
                    state.interface.pagination.total
                  "
                >
                  <font-awesome-icon
                    :icon="['fas', 'chevron-right']"
                    color="#8d8484"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-full order-first lg:order-last flex flex-col justify-between"
      >
        <div>
          <TemplateNav />
        </div>
        <!-- Blog tags, authors, and more here -->
        <div
          class="w-full flex flex-col overflow-y-scroll align-start rounded-sm shadow-xl relative"
        >
          <h2
            class="text-white text-md font-thin matrix hover-text-primary_accent cursor-pointer"
          >
            Tags
          </h2>
          <div
            class="w-full min-h-[40px] p-2 bg-zinc-500/30 mx-auto mt-4 flex flex-row flex-wrap"
          >
            <div
              v-for="tag in state.interface.tags"
              :key="tag.id"
              class="h-[40px] hover:cursor-pointer me-3"
              @click="filter_by_tag(tag)"
            >
              <p class="text-white text-sm font-thin matrix">{{ tag.name }}</p>
            </div>
          </div>
        </div>
        <div v-if="state.page_block" id="html_block" class="html_block flex flex-col flex-1 mt-4 p-2 w-[14rem]" v-html="state.page_block"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";
import { nextTick } from "vue";

// Meta
definePageMeta({
  title: "cKuro - Blog",
  descripton: "Captain Kuro's log",
  layout: "blog",
});

// Components
import PreviewCard from "./components/PreviewCard.vue";

// Stores
const blogStore = useBlogStore();
const authStore = useAuthStore();

// State
const state = reactive({
  nav_links: [],
  posts: [],
  target_post: null,
  total_posts: null,
  clear: false,
  interface: {
    search: {
      query: "",
      results: [],
    },
    tags: [],
    authors: [],
    filters: {
      title: {
        $containsi: '',
      },
    },
    pagination: {
      page: 1,
      pageSize: 2,
      total: 0,
    },
  },
  page_block: null,
});

// Methods
const fetch_tags = async () => {
  $fetch(`${config.public.NUXT_STRAPI_URL}/api/blog-tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    state.interface.tags = response.data;
  });
};

// Fetch posts
const init = async () => {
  state.interface.filters.title.$containsi = state.interface.search.query;
  $fetch(`${config.public.NUXT_STRAPI_URL}/api/blog-posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    state.interface.pagination.total = response.data.length;
    fetch_posts();
    fetch_tags();
    fetch_page_block();
  });
};
init();
const fetch_posts = async () => {
  //Calculate total posts:

  $fetch(
    `${config.public.NUXT_STRAPI_URL}/api/blog-posts?${qs.stringify(
      {
        filters: state.interface.filters,
        populate: [
          "title",
          "hero_image",
          "body",
          "blog_tags",
          "comment_threads",
          "comment_threads.blog_posts",
          "comment_threads.comments",
          "comment_threads.comments.commenter",
          "comment_threads.comments.body",
          "comment_threads.comments.replies",
          "comment_threads.comments.replies.user",
          "comment_threads.comments.replies.body",
          "comment_threads.comments.replies.target",
        ],
        pagination: state.interface.pagination,
        sort: "publishedAt:desc",
      },
      { encodeValuesOnly: true, arrayFormat: "brackets" },
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((response) => {
    state.posts = response.data;
    state.interface.search.results = response.data;
    
  });
};

const fetch_page_block = async () => {
  
  $fetch(`${config.public.NUXT_STRAPI_URL}/api/pages?${qs.stringify({
    populate: '*',
    filters: {
      title: 'Blog',
    },
  })}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    state.page_block = response.data[0]?.html
    nextTick(() => {
      executeScripts();
    })
  });
};

const next_page = () => {
  state.interface.pagination.page += 1;
  fetch_posts();
};

const prev_page = () => {
  state.interface.pagination.page -= 1;
  fetch_posts();
};

const doSearch = () => {
  // state.interface.search.results = state.posts.filter((post) =>
  //   post.title
  //     .toLowerCase()
  //     .includes(state.interface.search.query.toLowerCase()),
  // );
  state.interface.filters.title.$containsi = state.interface.search.query;
  state.interface.pagination = {
    page: 1,
  };
  nextTick(()=> {
    fetch_posts();
    state.clear = true;
  })
};

const clearSearch = () => {
  state.interface.search.query = "";
  state.interface.filters.title.$containsi = "";
  state.interface.filters.blog_tags = {};
  state.interface.pagination = {
    page: 1,
    pageSize: 2,
    total: 0,
  };
  nextTick(() => {
    fetch_posts();
    state.clear = false;
  })
};

const filter_by_tag = (tag) => {
  state.interface.filters.blog_tags = {
    id: tag.id,
  };
  doSearch();
};

const executeScripts = () => {
  console.log('executing scripts');
  const ctr_html_block = document.getElementById('html_block');
  // console.log(ctr_html_block);

  // Find all script tags:
  const scripts = ctr_html_block?.querySelectorAll('script');
  // console.log(scripts?.length);

  if(scripts?.length ) {
    for(const script of scripts) {
      const newScript = document.createElement('script');
      newScript.type = script.type ? script.type : 'text/javascript';
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.innerHTML = script.innerHTML;
      }
      document.head.appendChild(newScript);
      document.head.removeChild(newScript);
    }
  }

};

onMounted(() => {
  executeScripts();
});

// watch(
//   () => store.state.page_block,
//   (newValue) => {
//     if (newValue) {
//       executeScripts();
//     }
//   }
// );

</script>
<style lang="scss">
.border-thin {
  border: 1px solid;
}
.border-light {
  border-color: #8d8484;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: #cb7372 !important;
}
</style>
