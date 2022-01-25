<template>
  <div class="text-white m-8">

    <h1 class="text-4xl font-bold">Data Screener <span class="text-lg font-normal"> / Data</span> </h1>

    <div class="flex space-x-4">
      <button class="button">Symbols</button>
      <button class="button">Indicators</button>
      <button class="button">Timeframes</button>
      <div class="flex-1 flex justify-end">
        <input type="text" placeholder="search">
        <button>Search</button>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div class="tag flex flex-row" v-for="s in data">
        {{s.symbol}}
        <button class="ml-2 hover:text-white" @click="removeSymbol(s.symbol)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Data",
  props: ['data', 'indicators', 'timeframes'],
}
</script>

<style scoped>

</style>