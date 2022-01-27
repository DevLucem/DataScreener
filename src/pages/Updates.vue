<template>

  <div class="text-white my-12 mx-2 md:mx-8">

    <h1 class="text-4xl font-bold text-center md:text-left">Data Screener <span class="text-xl font-normal text-gray font-bold"> / Updates</span> </h1>

    <div class="grid grid-cols-5 my-16 mx-4">
      <div class="bg-fore rounded mr-2 md:mr-8 p-4 rounded-xl col-span-2 md:col-span-1">Symbol</div>
      <div class="bg-fore rounded p-4 rounded-xl col-span-3 md:col-span-4">Recent Update</div>
    </div>

    <div class="grid grid-cols-5 mb-4 mx-4" v-for="d in data">
      <div class="mr-2 md:mr-8 border border-gray p-4 rounded-2xl truncate col-span-2 md:col-span-1">{{ d.symbol }}</div>
      <div class="border border-gray p-4 rounded-2xl truncate col-span-3 md:col-span-4">{{ d.last }}</div>
    </div>

  </div>

</template>

<script>
export default {
  name: "Updates",
  props: ['data']
}
</script>

<style scoped>

</style>