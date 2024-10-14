<template>
  <div class="new-post w-full">
    <div class="flex flex-col overflow-y-scroll">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <input type="text" v-model="state.new_post.title" placeholder="Title" class="w-full h-1/2 border-thin border-zinc-200 p-1" />
      </div>
      <div class="w-full flex flex-col lg:flex-row">
        <div class="w-full min-h-[400px] lg:w-1/2 border-thin border-zinc-200 p-1 mt-4  me-4">
          <!-- <textarea type="text" class="w-full min-h-[400px] p-1" v-model="state.new_post.body" :placeholder="authStore.user ? 'post' : 'log in before posting'" /> -->
           <Editor v-model="state.new_post.body" editorStyle="height: 500px;" />
        </div>
        
        <div class="w-full lg:w-1/2 mt-4">
          <!-- upload images -->
          <div class="w-full min-h-[200px] border-thin border-zinc-200 p-4">
            <p class="text-neutral-800 font-thin">Upload images</p>
            <input type="file" multiple @change="uploadPics" />
            <FileUpload name="pics[]" url="/api/upload" @upload="uploadPics($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                <template #empty>
                    <span>Drag and drop files to here, and then click the Upload button.</span>
                </template>
            </FileUpload>
          </div>

          <!-- external links -->
          <div class="w-full min-h-[200px] border-thin border-zinc-200 p-4 mt-4 flex flex-col">
            <div class="w-full">
              <button class="w-full h-[32px] bg-secondary_accent text-white" @click="state.adding_link = true">Add External Link</button>
              <div v-show="state.adding_link" class="w-full mt-2 fade-in">
                <input type="text" v-model="state.new_external_link.text" placeholder="Text" class="w-full h-[32px] border-thin border-zinc-200 p-1" />
                <input type="text" v-model="state.new_external_link.link" placeholder="Link" class="w-full h-[32px] border-thin border-zinc-200 p-1" />
                <button class="w-full h-[32px] bg-primary_accent text-white" @click="addExternalLink">Add</button>
              </div>
            </div>

            <div class="w-full flex flex-col mt-4">
              <div v-for="(item, a) in state.new_post.external_links" :key="a" class="w-full p-2 flex flex-row justify-between">
                <a :href="item.link" class="text-white text-md hover-text-primary_accent">{{ item.text }}  <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" /></a>
                <button class="w-[30px] h-[30px] bg-danger_accent text-white" @click="state.new_post.external_links.splice(a, 1)">
                  <font-awesome-icon :icon="['fas', 'times']" />
                </button>
              </div>
            </div>

          </div>  

        </div>
      </div>
      <div class="mt-4 w-1/2 lg:w-[200px]">
        <button 
          @click="submitPost" 
          class="w-full h-[32px] mt-2 bg-primary_accent text-white"
          :class="!state.valid.title || !state.valid.body ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
          :disabled="!state.valid.title || !state.valid.body">Submit</button>
      </div>
    </div>
  </div>
</template>
<script setup>

  // Config
  const config = useRuntimeConfig();

  // Props
  const props = defineProps({
  });

    // Stores
  const authStore = useAuthStore();

  // State
  const state = reactive({
    new_post: {
      title: '',
      body: '',
      pics: [],
      external_links: [],
      visible: true,
      comment_threads: [],
      post_reactions: {
        upvotes: 0,
        downvotes: 0,
        number_of_votes: 0,
        vote: 0
      },
      user: authStore.user
    },
    new_external_link: {
      text: '',
      link: ''
    },
    adding_link: false,
    valid: {
      title: false,
      body: false
    },
    error: null,
    mounted: false
  });

  // Components

import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';

  
  // Emits
  const emit = defineEmits(['newpost']);

  // Methods
  const uploadPics = (event) => {
    console.log('event', event.files);

    // Upload files to Strapi:
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i]);
    }
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      },
      body: formData
    }).then((response) => {
      console.log('response', response);
      state.new_post.pics = response;
    }).catch((error) => {
      console.log(error);
    });
  }

  const addExternalLink = () => {
    const cloned_link = JSON.parse(JSON.stringify(state.new_external_link));
    state.new_post.external_links.push(cloned_link);
    state.new_external_link = {
      text: '',
      link: ''
    }
    state.adding_link = false;
  }
  const submitPost = () => {
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/community-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(state.new_post)
    }).then((response) => {
      console.log('response', response);
      emit('newpost');
    }).catch((error) => {
      console.log(error);
    })
  }

  
  const validate_title = (title) => {
    return title.length > 0
  }

  // Watchers for title AND body:
  watch([() => state.new_post.title, () => state.new_post.body], ([title, body]) => {
    state.valid.title = validate_title(title);
    state.valid.body = body.length > 0;
  });

  
</script>
<style lang="scss"></style>