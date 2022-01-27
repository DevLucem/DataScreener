<template>
  <div class="text-white mx-8 pt-12 relative">

    <h1 class="text-4xl font-bold text-center md:text-left">Data Screener <span class="text-xl font-normal text-gray font-bold"> / Home</span> </h1>

    <div class="mt-16 w-full">
      <h2 class="button-dull max-w-lg">Filters</h2>

      <div class="flex mt-12">
        <div class="flex -my-6">
          <button class="button flex-1" @click="newFilter=true">Add</button>
        </div>

        <div class="rounded rounded-lg border border-gray p-4 mx-4 max-w-lg" v-for="f in filters">
          <div class="flex justify-between">
            <h3>{{f.title}}</h3>
            <button @click="removeFilter(f.id)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div>{{f.symbols}}</div>
        </div>

      </div>
    </div>

    <div class="absolute top-0 w-full bg-back" v-if="newFilter">
      <Filter v-on:close="newFilter=false" :user="user" :data="data" :timeframes="timeframes" :indicators="indicators"/>
    </div>

  </div>
</template>

<script>
import Filter from "./Filter.vue";
export default {
  name: "Home",
  components: {Filter},
  props: ['indicators', 'timeframes', 'data', 'edit', 'user', 'filters'],
  data(){
    return {
      newFilter: false
    }
  },
  methods: {
    removeFilter(filter) {
      this.FILTERS.doc(filter).delete()
    },
  }
}
</script>>