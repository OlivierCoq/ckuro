<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-11/12 h-4/5 lg:h-3/5 flex flex-col items-center justify-center bg-white/20 rounded-lg">
      <div class="w-full h-4/5 lg:h-3/5 p-4 flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold text-white matrix mb-10">
          Confirm your email
        </h1>
        <p class="text-xl text-white text-center mb-10">
          We've sent you an email with a confirmation link. Please click the link to confirm your email.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>

  const route = useRoute()
  console.log(route, route.query)

  const state = reactive({
    email: route.query.email,
    token: route.query.token,
    destination: route.query.destination
  })

  onMounted(()=> {
    if (!state.email || !state.token || !state.destination) {
      router.push('/')
    } else {
      $fetch('/api/user/confirm', {
        method: 'POST',
        body: JSON.stringify({
          email: state.email,
          token: state.token,
          destination: state.destination
        })
      })
    }
  })  

</script>