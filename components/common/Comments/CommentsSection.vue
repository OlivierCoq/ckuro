<template>
  <div class="w-full h-full rounded-md p-4 flex flex-col justify-start">
    <div v-if="!props.threads.length" class="font-thin text-sm mb-2">Kinda empty here. Log in and get the party started!</div>

    <div v-if="!state.form" class="w-full min-h-[8rem] mb-8 pb-8">
      <textarea type="text" class="w-full h-full border-thin border-zinc-200 p-1" v-model="state.new_comment" :placeholder="state.logged_in ? 'comment' : 'log in before commenting'" />
      <button 
        class="w-full h-[32px] m-0 bg-primary_accent text-white" 
        :disabled="!state.logged_in"
        :class="!state.logged_in ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
      >
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
      </button> 
      <p v-if="!authStore.user" class="font-bold cursor-pointer my-2">
        <span @click="toggle_login">Login</span> /
        <span @click="toggle_register">Register</span>
      </p>
    </div>

    <div v-else class="w-full min-h-[10rem] mb-8 justify-center">
    <!-- login/register form:-->
      <div class="w-full flex flex-col items-center justify-center pe-10">
        <input v-if="state.register_mode" type="text" v-model="state.credentials.username" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="username" />
        <input type="text" v-model="state.credentials.email" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="email" />
        <input type="password" v-model="state.credentials.password" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="password" />
        <div class="w-full flex flex-row content-center justify-start">
          <button 
            v-if="state.login_mode"
            class="h-[32px] me-2 px-4 bg-primary_accent text-white" 
            :class="!state.valid.email ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
            :disabled="!state.valid.email || !state.valid.password" 
            @click="login"
          >Login</button>
          <button 
            v-if="state.register_mode"
            class="h-[32px] me-2 px-4 bg-secondary_accent text-white" 
            :class="(!state.valid.email || !state.valid.password || !state.valid.username) ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
            :disabled="!state.valid.email || !state.valid.password || !state.valid.username" 
            @click="register"
          >Register</button>
        </div>
        <div class="w-full flex flex-row justify-start text-start">
          <small v-if="state.error?.length" class="text-xs text-red-500 mt-2">
            <em>{{ state.error }}</em>
          </small>
          <small v-if="state.success?.length" class="text-xs text-green-500 mt-2">
            <em>{{ state.success }}</em>
          </small>
          <small v-else class="text-xs text-neutral-500 mt-2">
            <em>Passwords must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character</em>
          </small>
        </div>
        <div class="w-full flex flex-row justify-start content-start">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="text-xl text-neutral-800 cursor-pointer mt-2" @click="state.form = false" />
        </div>
      </div>
    </div>

    <div class="w-full min-h-[15rem] mt-6 mb-3 overflow-y-scroll">
      <Thread v-for="(thread, a) in props.threads" :key="a" :thread="thread" />
    </div>
    <!-- <Thread v-for="(thread, a) in props.threads" :key="a" :thread="thread" /> -->
  </div>
</template>
<script setup lang="ts">

import { defineProps, reactive, watch } from 'vue';
const props = defineProps({
  threads: {
    type: Array,
    required: true,
  },
});

import Thread from './Thread.vue';

const authStore = useAuthStore();
const route = useRouter()

console.log('route', route.currentRoute.value);

const state = reactive({
  new_comment: "",
  credentials: {
    username: "",
    email: "",
    password: "",
  },
  logged_in: false,
  logging_in: false,
  valid: {
    username: false,
    email: false,
    password: false,
  },
  form: false,
  login_mode: false,
  register_mode: false,
  error: authStore?.error,
  success: authStore?.success,
});

// validate password. Must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
const validate_password = (password: String) => {
  const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return password_regex.test(password);
};

// validate email
const validate_email = (email: String) => {
  let valid = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  console.log("valid email", valid?.length);
  return valid?.length > 0 ? true : false;
};

// validate username
const validate_username = (username: String) => {
  return username.length > 2;
};

// login
const toggle_login = () => {
  state.form = true;
  state.login_mode = true;
  state.register_mode = false;
};
const login = () => {
  console.log("logging in");
};

// register
const toggle_register = () => {
  state.form = true;
  state.register_mode = true;
  state.login_mode = false;
};
const register = () => {
  if(state.valid.email && state.valid.password) {
    console.log("registering");
     authStore.register(state.credentials.email, state.credentials.password, route.currentRoute.value.path);
  }
 else {
    console.log("invalid email or password", state.valid.email, state.valid.password);
  
 }
};

// Watch for changes in the email and password fields:
watch([() => state.credentials.email, () => state.credentials.password, () => state.credentials.username], ([email, password, username]) => {
  state.valid.email = validate_email(email);
  state.valid.password = validate_password(password);
  state.valid.username = validate_username(username);
});
</script>
<style lang="scss"></style>
 