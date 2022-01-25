<template>
  <div class="min-h-screen backy w-full flex flex-col justify-center items-center">
    <h1 class="title">Data Screener</h1>
    <div class="card m-12 py-12 px-24">
      <h2 class="text-center text-2xl mb-4">LOG IN</h2>
      <input type="text" aria-label="none" placeholder="Username" class="input text-lg font-bold my-2">
      <input type="text" aria-label="none" placeholder="Password" class="input text-lg font-bold my-2">
      <div class="flex justify-between mt-2">
        <label class="text-lg">
          <input class="checkbox" type="checkbox" placeholder="Password">
          Remember Me
        </label>
        <button class="link">Forgot?</button>
      </div>
      <router-link to="/screen" class="w-full button" >Login</router-link>
      <p class="text-center mt-4">Dont have an account?</p>
      <button class="link">Register Here</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "Intro"
}
</script>

<style scoped>

</style>