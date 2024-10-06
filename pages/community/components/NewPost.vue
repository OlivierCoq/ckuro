<template>
  <div class="new-post w-full">
    <div class="flex flex-col">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <input type="text" v-model="state.new_post.title" placeholder="Title" class="w-full h-1/2 border-thin border-zinc-200 p-1" />
      </div>
      <div class="w-full flex flex-col lg:flex-row">
        <div class="w-full min-h-[400px] lg:w-1/2 border-thin border-zinc-200 p-1 mt-4 bg-white me-4">
          <textarea type="text" class="w-full min-h-[400px] p-1" v-model="state.new_post.body" :placeholder="authStore.user ? 'post' : 'log in before posting'" />
        </div>
        <!-- upload images -->
        <div class="w-full lg:w-1/2 mt-4">
          <div class="w-full h-[200px] border-thin border-zinc-200 p-1">
            <p class="text-neutral-800 font-thin">Upload images</p>
            <input type="file" multiple @change="uploadPics" />
          </div>
          <div class="w-full h-[200px] border-thin border-zinc-200 p-1 mt-4">
            <input type="text" v-model="state.new_post.external_links" placeholder="External links" class="w-full h-full bg-transparent text-white font-thin search" />
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
      post_reactions: [],
      user: authStore.user
    },
    valid: {
      title: false,
      body: false
    },
    error: null,
    mounted: false
  });

  // Components


  const editor = ref(null)
  onMounted(() => {
    editor.value = new Editor({
      extensions: [
        StarterKit
      ],
      content: state.new_post.body
    })
  })

  onBeforeUnmount(() => {
    editor.value.destroy()
  })
  
  // Emits
  const emit = defineEmits(['newpost']);

  // Methods
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