<template>
    <div class="w-full">

      <div class="w-full min-h-[10rem] mb-8 justify-center">
      <!-- login/register form: login_username-->
        <div v-if="authStore" class="w-full flex flex-col items-center justify-center pe-10">
          <input v-if="state.register_mode" type="text" v-model="state.credentials.username" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="username" />
          <input v-if="state.register_mode" type="text" v-model="state.credentials.email" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="email" />
          <input v-else type="text" v-model="state.credentials.login_username" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" @keydown="clear" placeholder="login email" />   
          <input type="password" v-model="state.credentials.password" class="w-full h-[30px] border-thin border-zinc-200 p-1 mb-2" placeholder="password" />
          <div class="w-full flex flex-row content-center justify-start">
            <button 
              v-if="state.login_mode"
              class="h-[32px] me-2 px-4 bg-primary_accent text-white" 
              :class="!state.valid.login_username || !state.valid.password ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
              :disabled="!state.valid.login_username || !state.valid.password" 
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
          <div v-if="state.register_mode" class="w-full flex flex-row justify-start text-start">
            <small v-if="authStore.error?.length" class="text-xs text-red-500 mt-2">
              <em>{{ authStore.error }}</em>
            </small>
            <small v-if="authStore.success" class="text-xs text-green-500 mt-2">
              <em>{{ authStore.success }}</em>
            </small>
            <small v-else class="text-xs text-neutral-500 mt-2">
              <em>Passwords must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character</em>
            </small>
          </div>
          <div v-if="state.login_mode" class="w-full flex flex-row justify-start text-start">
            <small v-if="state.error" class="text-xs text-red-500 mt-2">
              <em>{{ state.error }}</em>
            </small>
          </div>
          <div v-if="props.comments" class="w-full flex flex-row justify-start content-start">
            <font-awesome-icon :icon="['fas', 'arrow-left']" class="text-xl text-neutral-800 cursor-pointer mt-2" @click="toggle_self" />
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">

  // Props
  const props = defineProps({
    mode: {
      type: String,
      required: true,
    },
    comments: {
      type: Boolean,
      required: false,
    }
  })

  // Stores
  const authStore = useAuthStore();

  const route = useRouter();

  // State
  const state = reactive({
    login_mode: (props.mode === 'login' ? true : false),
    register_mode: (props.mode === 'register' ? true : false),
    form: true,
    credentials: {
      login_username: '',
      username: '',
      email: '',
      password: '',
    },
    valid: {
      login_username: false,
      username: false,
      email: false,
      password: false,
    },
    error: '',
  })

  // Methods

  // clear
const clear = () => {
  state.error = false;
  state.success = false;
  authStore.clear();
};

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

// validate login_username
const validate_login_username = (login_username: String) => {
  return login_username.length > 2;
};


// Emit methods
const emits = defineEmits(["togglelogin", "toggleregister", "toggleself", "login", "register"]); 

// login
const toggle_login = () => {
  state.form = true;
  state.login_mode = true;
  state.register_mode = false;
  state.error = false;
  state.success = false;
  emits("togglelogin");
};
const login = async () => {
  clear();
  if(state.valid.login_username && state.valid.password) {
    authStore.logIn(state.credentials.login_username, state.credentials.password, route.currentRoute.value.path);

    nextTick(async () => {
      state.success = false;
      // clear form:
      state.credentials.email = "";
      state.credentials.password = "";
      state.valid.email = false;
      state.valid.password = false;
      
      emits("login");

    });
    
  }
  else {
    console.log("invalid email or password", state.valid.email, state.valid.password);
  }
};

const toggle_self = () => {
  state.form = false
  emits("toggleself");
}

// register
const toggle_register = () => {
  state.form = true;
  state.register_mode = true;
  state.login_mode = false;
  state.error = false;
  state.success = false;
  emits("toggleregister");
};
const register = () => {
  if(state.valid.email && state.valid.password) {
    console.log("registering");
     authStore.register(state.credentials.username, state.credentials.email, state.credentials.password, route.currentRoute.value.path);
     nextTick(() => {
      //  state.success = false;
       // clear form:
        state.credentials.email = "";
        state.credentials.password = "";
        state.credentials.username = "";
        state.valid.email = false;
        state.valid.password = false;
        state.valid.username = false;
        emits("register");
     });
  }
 else {
    console.log("invalid email or password", state.valid.email, state.valid.password);
  
 }
};

// Watch for changes in authStore.error, authStore.success, and authStore.user:
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