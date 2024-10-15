<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-11/12 h-4/5 lg:h-3/5 flex flex-col items-center justify-center bg-white/20 rounded-lg">
      <div class="w-full h-4/5 lg:h-3/5 p-4 flex flex-col items-center justify-center">
        <div v-if="state.error.length > 1" class="w-full flex flex-row justify-center">
          <h1 class="text-2xl font-bold text-white matrix mb-10">
            {{ state.error }}
          </h1>
        </div>
        <h1 v-else class="text-2xl font-bold text-white matrix mb-10">
          Email confirmed. Redirecting...
        </h1>
      </div>
    </div>
  </div>
</template>
<script setup>

  const route = useRoute()
  const authStore = useAuthStore()
  console.log(route, route.query)

  const state = reactive({
    email: route.query.email,
    token: route.query.token,
    destination: route.query.destination,
    error: ''
  })

  onMounted(()=> {
    if (!state.email?.length || !state.token?.length || !state.destination?.length) {
      state.error = 'Invalid confirmation link'
      
    } else {
      $fetch('/api/user/confirm', {
        method: 'POST',
        body: JSON.stringify({
          email: state.email,
          token: state.token,
          destination: state.destination
        })
      }).then((res) => {
        if (res.status === 200) {
          // log  user in:
          console.log('res.data', res)
          authStore.forceLogin(res)
        } else {
          console.log('res', res)
          state.error = 'Invalid confirmation link'
        }
      })
    }
  })  

</script>