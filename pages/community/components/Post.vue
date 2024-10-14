<template>
  <div :id="`post-${props.post.id}`" class="w-[98%]  pt-4 px-4 pb-8 flex flex-col justify-start place-items-start align-start mb-4 bg-zinc-500/30 cursor-pointer">

     <div id="top_panel" class="w-full flex flex-row p-2 justify-start">
      <div v-if="props.post.user" class="w-[30px] h-[30px] me-2 bg-primary_accent rounded-full flex items-center justify-center">
        <p class="text-white text-sm matrix">{{ first_letter(props.post?.user?.username) }}</p>
      </div>
      <div class="flex flex-col">
        <p class="text-white text-lg">{{ props.post?.user?.username }}</p>
        <p class="text-white text-xs" v-html="calculate_time_posted(props.post.createdAt)"></p>
      </div>
     </div>

     <div id="post_body" class="w-full mt-2">
      <!-- title -->
      <h2 class="text-2xl font-bold text-white matrix">
        {{ props.post.title }}
      </h2>
      <!-- body -->
      <div v-if="props.post.body" class="post-body pt-4 text-white">
        <!-- <VueMarkdown :source="props.post.body" /> -->
         <div v-html="props.post.body"></div>
      </div>
         <!-- Pics -->
      <div v-if="props.post.pics" class="w-full mt-4 flex flex-col">
       
        <div v-if="props.post.pics.length > 1" class="w-full">
          <button id="prev" class="w-[50px] h-full border-thin border-light hover:cursor-pointer">
            <font-awesome-icon :icon="['fas', 'chevron-left']" color="#8d8484" />
          </button>
          <button id="next" class="w-[50px] h-full border-thin border-light hover:cursor-pointer">
            <font-awesome-icon :icon="['fas', 'chevron-right']" color="#8d8484" />
          </button>
        </div>
        <div id="post_pics" class="w-full h-[300px] flex flex-row justify-start items-start">

          <div v-for="(pic, a) in props.post.pics" :key="a" 
            class="w-[300px] h-[300px] bg-center bg-cover bg-no-repeat" 
            :style="`background-image: url('${pic.url}');`" 
            @click="state.target_img = pic.url"
          ></div>
        </div>
        <!-- image modal: -->
        <div v-if="state.target_img" id="img_modal" class="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
          <div class="w-[90vw] h-[90vh] bg-white/20 rounded-md shadow-xl flex flex-col justify-between items-center">
            <div class="w-full h-[10%] flex flex-row justify-end p-3">
              <font-awesome-icon :icon="['fas', 'times']" class="mx-3 cursor-pointer text-xl text-white" @click="state.target_img = false" />
            </div>
            <div class="w-full h-[90%] px-4 flex flex-col justify-center items-center">
              <img :src="state.target_img" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      <!-- External links -->
      <div v-if="props.post.external_links.length" class="w-full flex flex-col my-4">
        <h3 class="text-white matrix lowercase">External Links</h3>
        <ul>
          <li v-for="(item, b) in props.post.external_links" :key="b">
            <a :href="item.link" class="text-white text-md ms-5 hover-text-primary_accent ">
              {{ item.text }}
              <!-- font awesome external link: -->
              <span class="text-xs">
                <font-awesome-icon :icon="['fas', 'external-link-alt']" />
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Likes/Dislikes -->
      <div class="w-full border-b-2 border-light mt-8 pb-4">
        <div class="w-[70px] mt-4 flex flex-row justify-start">
          <div class="w-[50%] flex flex-row justify-start items-center me-3">
            <button 
              class="w-[30px] h-[30px] text-white hover-text-primary_accent" 
              :class="state.liked ? 'text-primary_accent' : ''" 
              :disabled="state.liked || !authStore.user"
              @click="upvote_post">
              <font-awesome-icon :icon="['fas', 'thumbs-up']" />
            </button>
            <p class="text-white text-md ms-2 font-thin">{{ props.post.post_reactions.upvotes }}</p>
          </div>
          <div class="w-[50%] flex flex-row justify-end items-center">
            <button 
              class="w-[30px] h-[30px] bg-danger_accent text-white hover-text-primary_accent" 
              :class="state.disliked ? 'text-primary_accent' : ''" 
              :disabled="state.disliked || !authStore.user"
              @click="downvote_post">
              <font-awesome-icon :icon="['fas', 'thumbs-down']" />
            </button>
            <p class="text-white text-md ms-2 font-thin">{{ props.post.post_reactions.downvotes }}</p>
          </div>
        </div>
      </div>


      <!-- Comments -->
      <div class="mt-4 w-full">
        <button class="text-white text-md font-thin cursor-pointer hover-text-primary_accent" :class="state.show_comments ? 'text-primary_accent' : ''" @click="state.show_comments = !state.show_comments">
          Comments ({{ props.post.comment_threads.length }})
        </button>
        <div v-show="state.show_comments" class="fade-in">
          <CommentsSection :target="props.post" :threads="props.post.comment_threads" :dark="true" :target-type="'community_posts'" />
        </div>  
      </div>
     </div>

  </div>
</template>
<script setup>

  // Config
  const config = useRuntimeConfig();

  // Store
  const authStore = useAuthStore();

  // props
  const props = defineProps({
    post: {
      type: Object,
      required: true,
    }
  });

  // state
  const state = reactive({
    mounted: false,
    target_img: false,
    target_video: false,
    show_comments: false,
    liked: false,
    disliked: false
  });

  // components
  import VueMarkdown from "vue-markdown-render";
  import { tns } from "tiny-slider/src/tiny-slider";
  import CommentsSection from '~/components/common/Comments/CommentsSection.vue';


  // methods
    const first_letter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const calculate_time_posted = (time) => {
    const now = new Date();
    const comment_time = new Date(time);
    const diff = now - comment_time;
    const seconds = Math.floor(diff / 1000) ? Math.floor(diff / 1000) : 0;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  onMounted(() => {
    state.mounted = true;
    let slider = tns({
      container: "#post_pics",
      items: 1,
      slideBy: "page",
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayHoverPause: true,
      controls: true,
      prevButton: "#prev",
      nextButton: "#next",
      nav: true,
      autoplayTimeout: 5000,
    });

    if(authStore.user) {
          // check if user has already liked this post:
      if(authStore?.user?.upvoted_community_posts !== null && authStore?.user?.upvoted_community_posts.data?.includes(props.post.id)) {
        state.liked = true;
      }
      // check if user has already disliked this post:
      if(authStore?.user?.downvoted_community_posts?.data?.includes(props.post.id)) {
        state.disliked = true;
      }
    }
  })

  const upvote_post = () => {
    console.log('liked. Woohoo! 🎉');
    state.disliked = false;


    const no_dupe = () => {
      return authStore.user.upvoted_community_posts === null ? true : !authStore.user.upvoted_community_posts.data.includes(props.post.id);
    };

    authStore.user.upvoted_community_posts = authStore.user.upvoted_community_posts === null ? 
      { "data": [props.post.id] } : 
      { "data": no_dupe() ? [...authStore.user.upvoted_community_posts.data, props.post.id] : authStore.user.upvoted_community_posts.data };


      // If post is NOT in users downvoted array:
    if(authStore.user.downvoted_community_posts !== null && !authStore.user.downvoted_community_posts.data.includes(props.post.id)) {
      nextTick(()=> {
        // update user in Strapi:
        $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${authStore.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({
   
              upvoted_community_posts: authStore.user.upvoted_community_posts
            
          })
        }).then((response) => {
          // console.log('upvote response', response);
          state.liked = true;

          props.post.post_reactions.number_of_votes += 1;
          props.post.post_reactions.upvotes += 1;

          // Update post in Strapi:
          $fetch(`${config.public.NUXT_STRAPI_URL}/api/community-posts/${props.post.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify({
              post_reactions: {
                number_of_votes: props.post.post_reactions.number_of_votes,
                upvotes: props.post.post_reactions.upvotes
              }
            })
          }).then((response) => {
            // console.log('post update response', response);
          }).catch((error) => { console.log(error); })

        }).catch((error) => { console.log(error); })


      })
    } else {
      // remove post from downvoted array:
      authStore.user.downvoted_community_posts.data = authStore.user.downvoted_community_posts.data.filter((id) => id !== props.post.id);

      nextTick(()=> {
        // update user in Strapi:
        $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${authStore.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({
              upvoted_community_posts: authStore.user.upvoted_community_posts,
              downvoted_community_posts: authStore.user.downvoted_community_posts
          })
        }).then((response) => {
          console.log('upvote response', response);
          state.liked = true;

          props.post.post_reactions.upvotes += 1;

          props.post.post_reactions.number_of_votes += 1;
          props.post.post_reactions.downvotes -= 1;

          // Update post in Strapi:
          $fetch(`${config.public.NUXT_STRAPI_URL}/api/community-posts/${props.post.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify({
              post_reactions: {
                number_of_votes: props.post.post_reactions.number_of_votes,
                downvotes: props.post.post_reactions.downvotes,
                upvotes: props.post.post_reactions.upvotes
              }
            })
          }).then((response) => {
            console.log('post update response', response);
          }).catch((error) => { console.log(error); })

        }).catch((error) => { console.log(error); })
      })
    }
  };

  const downvote_post = () => {
    console.log('disliked, sorry 😢');
    state.liked = false;

    const no_dupe = () => {
      return authStore.user.downvoted_community_posts === null ? true : !authStore.user.downvoted_community_posts.data.includes(props.post.id);
    }

    authStore.user.downvoted_community_posts = authStore.user.downvoted_community_posts === null ? 
      { "data": [props.post.id] } : 
      { "data": no_dupe() ? [...authStore.user.downvoted_community_posts.data, props.post.id] : authStore.user.downvoted_community_posts.data };

    // If post is NOT in users uppvoted array:
    if(authStore.user.upvoted_community_posts !== null && !authStore.user.upvoted_community_posts.data.includes(props.post.id)) { 

    
      nextTick(()=> {
        // update user in Strapi:
        $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${authStore.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({
              downvoted_community_posts: authStore.user.downvoted_community_posts
          })
        }).then((response) => {
          // console.log('downvote response', response);
          state.disliked = true;

          props.post.post_reactions.number_of_votes += 1;
          props.post.post_reactions.downvotes += 1;

          // Update post in Strapi:
          $fetch(`${config.public.NUXT_STRAPI_URL}/api/community-posts/${props.post.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify({
              post_reactions: {
                number_of_votes: props.post.post_reactions.number_of_votes,
                downvotes: props.post.post_reactions.downvotes
              }
            })
          }).then((response) => {
            // console.log('post update response', response);
          }).catch((error) => { console.log(error); })

        }).catch((error) => {
          console.log(error);
        })
      })

    } else {

      // remove post from upvoted array:
      authStore.user.upvoted_community_posts.data = authStore.user.upvoted_community_posts.data.filter((id) => id !== props.post.id);

      nextTick(()=> {
        // update user in Strapi:
        $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${authStore.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({
              upvoted_community_posts: authStore.user.upvoted_community_posts,
              downvoted_community_posts: authStore.user.downvoted_community_posts
          })
        }).then((response) => {
          // console.log('downvote response', response);
          state.disliked = true;

          props.post.post_reactions.upvotes -= 1;

          props.post.post_reactions.number_of_votes += 1;
          props.post.post_reactions.downvotes += 1;

          // Update post in Strapi:
          $fetch(`${config.public.NUXT_STRAPI_URL}/api/community-posts/${props.post.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify({
              post_reactions: {
                number_of_votes: props.post.post_reactions.number_of_votes,
                downvotes: props.post.post_reactions.downvotes,
                upvotes: props.post.post_reactions.upvotes
              }
            })
          }).then((response) => {
            // console.log('post update response', response);
          }).catch((error) => { console.log(error); })

        }).catch((error) => {
          console.log(error);
        })
      })
    }
    
  };

</script>
<style lang="scss">

  .tns-controls {
    button {
      margin-right: 1rem;
      color: white;
    }
  }
  #post_body {
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    h4 { font-size: 1rem; }
    h5 { font-size: 0.875rem; }
    h6 { font-size: 0.75rem; }

  }
</style>