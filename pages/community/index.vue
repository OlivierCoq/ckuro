<template>
  <div class="w-full absolute z-20 h-[80vh] mx-auto p-10">
    <div class="container mx-auto py-10 lg:ps-20 text-center">
      <a
        href="/"
        class="text-white neon-flicker matrix text-6xl font-thin fade-in ms-[-15rem]"
        >cKuro</a
      >
    </div>
    <div
      class="main-ctr mx-auto w-full h-full lg:px-20 flex flex-col lg:flex-row items-start justify-start"
    >
      <div class="w-full lg:w-[655px] h-full flex flex-col lg:flex-row me-5">
        <div class="ctr-main h-full shadow-xl me-5">
          <!-- Meat + Potatoes -->
          <div
            class="w-full h-full flex flex-col justify-start items-start align-start py-4"
          >
            <!-- Search -->
            <div class="flex flex-row w-full mb-4 px-4">
              <div class="w-[90%] h-[40px] border-thin border-light p-2 me-2">
                <input
                  type="text"
                  class="w-full h-full bg-transparent text-white font-thin search"
                  placeholder="Search community..."
                  v-model="communityStore.search.query"
                  @keydown="communityStore.doSearch"
                  @keydown.backspace="communityStore.clearSearch"
                />
              </div>
              <button
                class="border-thin border-light w-[10%] font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="communityStore.doSearch"
              >
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass']"
                  color="#8d8484"
                />
              </button>
            </div>

             <!-- New Post button, and logged in user -->
            <div id="top_panel" class="w-full h-[40px] flex flex-row justify-between items-start mb-4 px-4">
              <button
                class="border-thin border-light w-[33%] h-full font-thin flex flex-col justify-center align-center items-center hover:curser-pointer"
                @click="state.new_post_modal = true"
              >
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  color="#8d8484"
                />
              </button>

              <!-- New post modal -->
              <div v-if="state.new_post_modal" id="new_post_modal" class="w-full h-full overflow-scroll fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
                <div class="w-[90vw] min-h-[60vh] bg-zinc-800/80 rounded-md shadow-xl flex flex-col justify-start items-start">
                  <div class="w-full h-[5%] flex flex-row justify-end p-3 dark:text-white">
                    <font-awesome-icon
                      :icon="['fas', 'times']"
                      class="mx-3 cursor-pointer text-xl text-neutral-900"
                      color="#fff"
                      @click="state.new_post_modal = false"
                    /> 
                  </div>
                  <div class="w-full h-[95%] px-4 flex flex-col justify-start items-start">
                    <h2 class="my-2 text-2xl font-thin matrix text-start">New Post</h2>
                    <NewPost @newpost="refreshPosts" />
                  </div>
                </div>
              </div>

              <div v-if="authStore.user" class="w-[50%] flex flex-col justify-end items-end text-end">
                <p class="text-white text-md font-thin">
                  Logged in: <span class="font-bold">{{ authStore.user.username }}</span>
                </p>
                <p class="text-white text-md cursor-pointer" @click="authStore.logOut">Logout</p>
              </div>
              <div v-else class="w-[33%] flex flex-col justify-end items-end text-end">
                <p class="text-white text-md font-thin cursor-pointer">
                 <span class="hover:font-bold" @click="toggle_login">Login</span> /
                 <span class="hover:font-bold" @click="toggle_register">Register</span> to post
                </p>

                <!-- Login modal: -->
                <div v-if="state.login_modal" id="auth_modal" class="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
                  <div class="w-[400px] h-[400px] bg-white rounded-md shadow-xl flex flex-col justify-between items-center">
                    <div class="w-full h-[10%] flex flex-row justify-end p-3">
                      <font-awesome-icon
                        :icon="['fas', 'times']"
                        class="mx-3 cursor-pointer text-xl text-neutral-900"
                        @click="state.login_modal = false"
                      /> 
                    </div>

                    <div class="w-full h-[90%] px-4 flex flex-col justify-center items-center">
                      <h2 class="my-2 text-2xl font-thin matrix">Let's get it</h2>
                        <!-- Fucking kill me then: -->
                      <AuthBox v-if="state.mode == 'login'" :mode="state.mode" @togglelogin="toggle_login" @toggleregister="toggle_register" @login="state.login_modal = false" />
                      <AuthBox v-else :mode="state.mode" @togglelogin="toggle_login" @toggleregister="toggle_register" @register="state.login_modal = false" />
                      <div class="w-full mt-4">
                        <p v-if="state.mode == 'login'" class="text-neutral-500 text-sm font-thin text-center">
                          Don't have an account? <span class="text-primary-500 cursor-pointer font-bold" @click="toggle_register">Register</span>
                        </p>
                        <p v-else class="text-neutral-500 text-sm font-thin text-center">
                          Already have an account? <span class="text-primary-500 cursor-pointer font-bold" @click="toggle_login">Login</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>
            
            <!-- Posts -->
            <div class="flex-1 w-[95%] mx-auto flex flex-col overflow-y-scroll mt-2">
              <Post v-for="post in state.posts" :key="post.id" :post="post" />
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
        <!-- Links, filters, and more here -->
        <div
          class="w-full flex flex-col h-[70%] overflow-y-scroll align-start rounded-sm shadow-xl relative"
        >
          <h2
            class="text-white text-md font-thin matrix  cursor-pointer"
          >
            Links
          </h2>
          <div class="flex flex-row flex-wrap text-3xl mt-4">
            <a href="https://discord.gg/vDnFquTF" class="cursor-pointer">
              <font-awesome-icon class="me-3" :icon="['fab', 'discord']" color="#8d8484" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// config/setup
const config = useRuntimeConfig();
import qs from "qs";

// Meta
definePageMeta({
  title: "cKuro - Community",
  descripton: "gang gang",
  layout: "community",
});

// Components
import AuthBox from '~/components/common/AuthBox.vue'
import NewPost from './components/NewPost.vue'
import Post from './components/Post.vue'

// Stores
  // I dunno if I wanna use a store, tbh
const communityStore = useCommunityStore();
const authStore = useAuthStore();

// State 
const state = reactive({
  login_modal: false,
  new_post_modal: false,
  mode: 'none',
  posts: []
});

// Methods

  // Login/ Register toggles
const toggle_login = () => {
  state.login_modal = true;
  console.log('toggling login');
  state.mode = 'login';
  
}
const toggle_register = () => {
  state.login_modal = true;
  console.log('toggling register');
  state.mode = 'register';
  
}

// Get posts
const getPosts = () => {
  $fetch(`${config.public.NUXT_STRAPI_URL}/api/community-posts?${qs.stringify(
    {
      populate: [
        'title',
        'user',
        'body',
        'pics',
        'visible',
        'comment_threads',
        'comment_threads.comments',
        'comment_threads.comments.community_posts',
        'post_reactions',
        'external_links'
      ],
      sort: "publishedAt:desc",
  },
  { encodeValuesOnly: true, arrayFormat: "brackets" }
  )}`, {
    method: 'GET'
  }).then((response) => {
    state.posts = response.data;
  }).catch((error) => {
    console.log(error);
  });


}

onMounted(() => {
  getPosts();
  
});

const refreshPosts = () => {
  getPosts();
  nextTick(()=> {
    state.new_post_modal = false
  })
}

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
