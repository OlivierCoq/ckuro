<template>
  <div class="ctr-comment_section w-full h-full rounded-md p-4 flex flex-col justify-start" :class="props.dark ? 'dark' : ''">
    <div v-if="!props.threads.length" class="font-thin text-sm mb-2">Kinda empty here. Log in and get the party started!</div>

    <div v-if="!state.form" class="w-full mb-10">
      <textarea type="text" class="w-full h-1/2 border-thin border-zinc-200 p-1" v-model="state.new_comment.comments[0].body" :placeholder="authStore.user ? 'comment' : 'log in before commenting'" />
      <button 
        class="w-full h-[32px] mt-2 bg-primary_accent text-white" 
        :disabled="!authStore.user"
        :class="!authStore.user || !state.new_comment.comments[0].body.length ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
        @click="post_comment"
      >
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button> 
      <p v-if="!authStore.user" class="font-thin cursor-pointer mt-2 mb-4">
        <span @click="toggle_login" class="hover:font-bold">Login</span> /
        <span @click="toggle_register" class="hover:font-bold">Register</span>
      </p>
      <p v-if="authStore.user && !authStore.user.confirmed" class="font-thin cursor-pointer mt-2 mb-4">
       <span v-if="state.error" class="text-blue-500 text-xs font-normal">{{ state.error }}</span>
      </p>
    </div>
    
    <AuthBox v-else :mode="state.mode" @toggleself="state.form = false" :comments="true" />



    <div class="w-full min-h-[15rem] mt-10 mb-3 overflow-y-scroll">
      <Thread v-for="(thread, a) in state.threads" :key="a" :thread="thread" :dark="props.dark" />
    </div>
    
  </div>
</template>
<script setup lang="ts">

import { defineProps, reactive, watch, onMounted, nextTick } from 'vue';
import qs from 'qs';

const config = useRuntimeConfig();
const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
  threads: {
    type: Array,
    required: true,
  },
  dark: {
    type: Boolean,
    default: true,
  },
  targetType: {
    type: String,
    required: true
  }
});

// Components
import Thread from './Thread.vue';
import AuthBox from '../AuthBox.vue';

// Stores
const authStore = useAuthStore();
const route = useRouter();

// State
const state = reactive({
  new_comment: {
    blog_posts: props.target,
    comments: [{
      commenter: authStore.user,
      body: "",
      replies: [],
      visible: true
    }]
  },
  threads: null,
  credentials: {
    username: "",
    email: "",
    password: "",
    login_username: "",
  },
  logged_in: false,
  logging_in: false,
  valid: {
    login_username: false,
    username: false,
    email: false,
    password: false,
    new_comment: false,
  },
  form: false,
  mode: "none",
  error: authStore?.error,
  success: authStore?.success
});


const get_comments = (target: String) => {

  let filters = {}
  filters[props.targetType] = props.target.id;
  
  $fetch(`${config.public.NUXT_STRAPI_URL}/api/comment-threads?${qs.stringify({
    filters: filters,
    populate: [
      "comments",
      "comments.commenter",
      "comments.replies",
      "comments.replies.user",
    ],
    sort: "createdAt:desc",
  })}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    state.threads = response.data;
  });

};
onMounted(()=> {
  get_comments(props.targetType);
})

// login
const toggle_login = () => {
  state.form = true;
  state.login_mode = true;
  state.register_mode = false;
  state.error = false;
  state.success = false;


  state.mode = 'login'
};

// register
const toggle_register = () => {
  state.form = true;
  state.register_mode = true;
  state.login_mode = false;
  state.error = false;
  state.success = false;

  state.mode = 'register'
};



// post comment
const post_comment = () => {
   
  if(state.new_comment.comments[0].body.length) {
    console.log("posting comment", state.new_comment);
    /* 
       Posting a comment is actually adding a new thread. 

       - update Strapi post.comment_threads with the new thread
    */
    

    nextTick(() => {
      if(!authStore.user.confirmed) {
          state.error = "Woah, woah, woah! You need to confirm your account before you can comment. Check your email for the confirmation."
          console.log("user not confirmed", authStore.user);
        }
        else {
          $fetch(`${config.public.NUXT_STRAPI_URL}/api/comment-threads`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authStore.token}`
            },
            body: JSON.stringify(state.new_comment),
          }).then((response) => {
              console.log("response", response);
              const clone = JSON.parse(JSON.stringify(state.new_comment));
              state.threads.unshift(clone)
              state.new_comment.comments[0].body = "";
          });
        }
    });


  }
  else {
    console.log("invalid comment", state.valid.new_comment);
  }
};

watch(() => authStore.success, (success) => {
  if(success) {
    state.success = success;
    state.form = false;
    state.error = false;
  }
});
watch(() => authStore.user, (user) => {
  if(user) {
    state.logged_in = true;
    state.form = false;
    state.error = false;
    state.new_comment.comments[0].commenter = user;
  }
});
watch(() => authStore.error, (error) => {
  if(error) {
    state.error = 'Invalid email or password';
  }
});

// Watch for changes in the email and password fields:
watch([
    () => state.credentials.login_username, 
    () => state.credentials.email, 
    () => state.credentials.password, 
    () => state.credentials.username
  ], 
    ([login_username, email, password, username]) => {
  state.valid.email = validate_email(email);
  state.valid.password = validate_password(password);
  state.valid.username = validate_username(username);
  state.valid.login_username = validate_login_username(login_username);
});
</script>
<style lang="scss"></style>
 