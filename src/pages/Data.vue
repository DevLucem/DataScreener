<template>
  <div class="text-white my-12 md:mx-8">

    <h1 class="text-4xl font-bold text-center md:text-left">Data Screener <span class="text-xl font-normal text-gray font-bold"> / Data</span> </h1>

    <div class="flex p-4 mt-8 justify-center md:justify-start">
      <button class="m-2" v-bind:class="{ button: selected===0, 'button-dull': selected!==0}" @click="selected=0; searched=''">Symbols</button>
      <button class="m-2" v-bind:class="{ button: selected===1, 'button-dull': selected!==1}" @click="selected=1; searched=''">Indicators</button>
      <button class="m-2" v-bind:class="{ button: selected===2, 'button-dull': selected!==2}" @click="selected=2; searched=''">Timeframes</button>
      <div class="flex-1 flex justify-end items-center p-4">
        <input aria-label="none" class="input min-w-[32px] w-1/2 mx-2 border-0 hidden md:inline-block" type="text" placeholder="Search" v-model="searched">
      </div>
    </div>

    <div class="flex md:hidden -mt-6 mb-6 mx-4">
      <input aria-label="none" class="input flex-1 mx-2 border-0" type="text" placeholder="Search" v-model="searched">
    </div>

    <div class="flex flex-wrap" v-if="selected===0">
      <div class="tag flex flex-row" v-for="s in filterData(data, 'symbol')">
        {{s.symbol}}
        <button class="ml-2 hover:text-white" @click="removeSymbol(s.symbol)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex flex-wrap" v-if="selected===1">
      <div class="tag flex flex-row" v-for="i in filterData(indicators)">
        {{i}}
        <button class="ml-2 hover:text-white" @click="removeIndicator(i)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex flex-wrap" v-if="selected===2">
      <div class="tag flex flex-row" v-for="tf in filterData(timeframes)">
        {{tf}}
        <button class="ml-2 hover:text-white" @click="removeTimeframe(tf)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="js">
export default {
  name: "Data",
  props: ['data', 'indicators', 'timeframes'],
  data(){
    return{
      selected: 0,
      searched: "",
    }
  },
  methods: {
    filterData(d, v=null){return d.filter(x => (v? x.symbol: x).toLowerCase().includes(this.searched.toLowerCase()))},
    removeSymbol(symbol){this.DATA.doc(symbol).delete()},
    removeIndicator(indicator){
      let batch = this.FIRESTORE.batch();
      this.data.forEach( s => {
        if (typeof s==='object'){
          if (indicator in s) {
            s[indicator] = this.FIELD_VALUE.delete()
            delete s['indicators'];
            batch.update(this.DATA.doc(s.symbol), s);
          }
        }
      });
      batch.commit().catch(e => console.log(e))
    },
    removeTimeframe(timeframe){
      let batch = this.FIRESTORE.batch()
      this.data.forEach( s => {
        Object.keys(s).forEach(k => {
          let d = s[k];
          if (typeof d==='object'){
            if (timeframe in d) {
              delete s[k][timeframe];
              batch.update(this.DATA.doc(s.symbol), s);
            }
          }
        })
      });
      batch.commit().catch(e => console.log(e))
    },
  }
}
</script>

<style scoped>

</style>