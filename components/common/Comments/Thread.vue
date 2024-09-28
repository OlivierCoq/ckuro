<template>
  <div class="flex flex-col">
    <div v-for="(comment, a) in props.thread.comments" :key="a" class="p-4 flex flex-col shadow-lg mb-4">

      <div class="w-full flex flex-col justify-start content-start">
        <div class="flex flex-row justify-start align-end content-end mb-2">
          <div class="w-[30px] h-[30px] me-2 bg-primary_accent rounded-full flex items-center justify-center">
            <p class="text-white text-sm">{{ first_letter(comment.commenter.username) }}</p>
          </div>
          <p class="text-neutral-500 text-lg">{{ comment.commenter.username }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-xs text-zinc-600" v-html="calculate_time_commented(props.thread.createdAt)"></p>
          <p class="text-neutral-900 text-lg mt-4" v-html="comment.body"></p>
        </div>
      </div>

      <p class="text-sm text-zinc-500 mt-4">Replies ({{ comment.replies.length }})</p>
      <div class="w-full px-4 flex flex-col">
        <div v-for="(reply, b) in comment.replies" :key="b" class="w-full flex flex-row flex-wrap mt-2">
          <p class="text-neutral-600 text-bold text-xs">{{ reply.user.username }}: 
            <span class="text-neutral-500 font-normal text-xs">{{ reply.body }}</span>
          </p>
        </div>
      </div>

      <div class="w-full flex flex-row justify-center items-center mt-4">
        <input type="text" class="w-[80%] h-[30px] border-thin border-zinc-200 p-1" v-model="state.new_comment" :placeholder="state.logged_in ? 'reply' : 'log in before replying'" />
        <button 
          class="w-[20%] h-[32px] m-0 bg-primary_accent text-white" 
          :disabled="!state.logged_in"
          :class="!state.logged_in ? 'cursor-not-allowed opacity-[0.5]' : 'hover:cursor-pointer'"
        >
           <font-awesome-icon :icon="['fas', 'paper-plane']" />
        </button>
      </div>  


    </div>



  </div>
</template>
<script setup>

  const props = defineProps({
    thread: {
      type: Object,
      required: true,
    },
  });

  const state = reactive({
    new_comment: "",
    logged_in: false
  });

  const init_replies = () => {
    
    if(props.thread.comments.length){
      props.thread.comments.forEach((comment) => { 
        if(comment.replies.length){
          comment.replies.forEach((reply) => {
            reply['active'] = false;
          })
          nextTick(()=> {
            comment.replies[0].active = true;
          })
        }
      })
    }
  };
  onMounted(() => {
    init_replies();
  });
  
  const first_letter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const calculate_time_commented = (time) => {
    const now = new Date();
    const comment_time = new Date(time);
    const diff = now - comment_time;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} years ago`;
    } else if (months > 0) {
      return `${months} months ago`;
    } else if (weeks > 0) {
      return `${weeks} weeks ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

</script>
<style lang="scss">
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc; 
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}
</style>