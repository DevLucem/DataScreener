<template>
  <div class="text-white mx-8 pt-12 relative">

    <h1 class="text-4xl font-bold text-center md:text-left">Data Screener <span class="text-xl font-normal text-gray font-bold"> / Home</span> </h1>

    <div class="mt-16">
      <h1 class="tag text-center">Webhook: <span class="select-all italic text-gray">{{getWH()}}</span></h1>
    </div>

    <div class="mt-16 w-full">
      <h2 class="button-dull w-full flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="showConditions=!showConditions">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <span class="mx-auto font-bold text-primary flex-1 cursor-pointer" @click="showConditions=!showConditions">Conditions</span>
        <button @click="indicators.length<1?window.alert('There is no data to filter'):condition=true;newFilter=true;">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
        </button>
      </h2>

      <div class="mt-12 flex flex-wrap" v-if="showConditions">
        <div class="rounded rounded-lg border border-gray p-4 m-2" v-for="c in conditions" draggable="true" v-on:dragstart="adding=c.id" v-on:dragend="adding=null">
          <div class="flex justify-between">
            <h3 class="font-bold overflow-x-auto">{{c.name}}</h3>
            <div class="relative group">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <ul class="overflow-x-auto absolute ml-3 -mt-2 gradient p-2 rounded-b-xl rounded-r-xl invisible group-hover:visible">
                <li @click="condition=true;newFilter=true;edit={conditions: [c]}">Edit</li>
                <li @click="removeCondition(c.id)">Delete</li>
              </ul>
            </div>
          </div>
          <ul class="bg-fore rounded-lg mt-2 w-full">
            <li class="flex items-center justify-between mx-2 text-xs" v-for="r in c.rules">
              <div>
                ({{r.indicator}}{{r.tf}}) {{r.condition}} ({{r.compare}}{{r.value}})
              </div>
              <button class="icon w-4 h-4 my-1" @click="CONDITIONS.doc(c.id).update({rules: FIELD_VALUE.arrayRemove(r)})">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div class="mt-12 w-full opacity-80">

      <div v-on:drop="dragging?FILTERS.doc(dragging).update({disabled: true}):null; dragging=null" ondragover="return false" class="button-dull w-full flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" @click="showFilters=!showFilters">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <span class="mx-auto font-bold text-primary flex-1 cursor-pointer" @click="showFilters=!showFilters">Filters</span>
        <button @click="condition=false;newFilter=true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="flex mt-12 space-y-4" v-if="showFilters">
        <div class="rounded rounded-lg border border-gray p-4 mx-4 max-w-lg" v-for="f in filters.filter( fil => fil.disabled)"
             draggable="true" v-on:dragstart="dragging=f.id">
          <div class="flex justify-between">
            <h3 class="overflow-x-auto">{{f.title}}</h3>
            <div class="relative group">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <ul class="overflow-x-auto absolute ml-3 -mt-2 gradient p-2 rounded-b-xl rounded-r-xl invisible group-hover:visible">
                <li class="hover:bg-fore" @click="edit=f;newFilter=true;">Edit</li>
                <li class="hover:bg-fore" @click="removeFilter(f.id)">Delete</li>
                <li class="hover:bg-fore" @click="FILTERS.doc(dragging).update({disabled: false});">Active</li>
                <li class="hover:bg-fore" @click="filling=!filling">Fill</li>
              </ul>
            </div>
          </div>

          <div class="bg-fore rounded-xl p-2">
            <button class="m-4" v-if="Object.keys(f.conditions).length<1" :class="{'text-primary': adding}"  v-on:drop="addCondition(f.id)" ondragover="return false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </button>
            <Conditions v-for="(c, i) in f.conditions" :cond="i" :condition="c" :conditions="conditions" :filter="f.id" :position="'conditions'" :adding="adding" :fill="filling"/>
          </div>

          <div class="overflow-y-auto max-h-96 mt-4">{{f.symbols}}</div>
        </div>

      </div>
    </div>


    <div class="mt-12 w-full space-y-4">
      <h2 v-on:drop="dragging?FILTERS.doc(dragging).update({disabled: false}):null; dragging=null" ondragover="return false" class="button-dull w-full flex items-center">
        <button @click="refreshFilters()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" v-bind:class="{'animate-spin': loading}" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
        </button>
        <span class="flex-1">Active</span>
      </h2>

      <div class="flex flex-wrap">
        <div class="rounded rounded-lg border border-gray p-4 mx-4 max-w-lg m-2" v-for="f in filters.filter( fil => !fil.disabled)"
             draggable="true" v-on:dragstart="dragging=f.id">
          <div class="flex justify-between">
            <h3 class="overflow-x-auto">{{f.title}}</h3>
            <div class="relative group">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <ul class="overflow-x-auto absolute ml-3 -mt-2 gradient p-2 rounded-b-xl rounded-r-xl invisible group-hover:visible">
                <li class="hover:bg-fore" @click="edit=f;newFilter=true;">Edit</li>
                <li class="hover:bg-fore" @click="removeFilter(f.id)">Delete</li>
                <li class="hover:bg-fore" @click="FILTERS.doc(dragging).update({disabled: true});">Disable</li>
                <li class="hover:bg-fore" @click="filling=!filling">Fill</li>
              </ul>
            </div>
          </div>

          <div class="min-h-24 bg-fore rounded-xl p-2">
            <button class="m-4" v-if="f.conditions.length<1" :class="{'text-primary': adding}"  v-on:drop="addCondition(f.id)" ondragover="return false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </button>
            <Conditions v-for="(c, i) in f.conditions" :cond="i" :condition="c" :conditions="conditions" :filter="f.id" :position="'conditions'" :adding="adding" :fill="filling"/>
          </div>

          <div class="overflow-y-auto max-h-96 mt-4">{{f.symbols}}</div>
        </div>
      </div>
    </div>


    <div class="absolute top-0 w-full bg-back -mt-24 md:mt-0" v-if="newFilter">
      <Filter :edit="edit" :condition="condition" v-on:close="newFilter=false; edit=null; condition=false" :user="user" :data="data" :timeframes="timeframes" :indicators="indicators"/>
    </div>

  </div>
</template>

<script>
import Filter from "../components/Filter.vue";
import Conditions from "../components/Conditions.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {Conditions, Filter},
  props: ['indicators', 'timeframes', 'data', 'user', 'filters', 'conditions'],
  data(){
    return {
      newFilter: false,
      condition: false,
      conditionEdit: null,
      dragging: "",
      adding: null,
      edit: null,
      filter: null,
      showConditions: false,
      showFilters: false,
      filling: true,
      loading: false,
    }
  },
  methods: {
    removeFilter(filter) {
      this.FILTERS.doc(filter).delete()
    },
    removeCondition(condition) {
      this.CONDITIONS.doc(condition).delete()
    },
    getWH(){
      return window.location.origin + "/" + this.user.uid;
    },
    refreshFilters(){
      this.loading = true;
      axios.post("/refresh").finally(() => this.loading = false)
    },
    addCondition(filter){
      if (!this.adding) return;
      let path = "conditions." + this.adding;
      this.FILTERS.doc(filter).update({[path]: null})
    },
    updateConditions(filter, index){
      this.filter = filter;
      let c = this.filter.conditions[index]
      this.filter.conditions.splice(index, 1);
      this.scanFilter();
      console.log('new symbols', this.filter.symbols)
      this.FILTERS.doc(filter.id).update({
            conditions: this.FIELD_VALUE.arrayRemove(c),
            symbols: this.filter.symbols
      })
    },
    filtered(symbol){
      const compare = (a, operator, b) => {
        switch (operator){
          case '<': { return a < b; }
          case '>': { return a > b; }
          case '>=': { return a >= b; }
          case '<=': { return a <= b; }
          case '==': { return a === b; }
          case '===': { return a === b; }
          default: return false
        }
      };
      const scanCond = (cond) => {
        let met = !cond.any;
        cond.rules.forEach( (rule) => {
          if (!cond.any){
            if (rule.compare==='value' || (rule.compare in symbol && rule.value in symbol[rule.compare]))
              met = met && compare(symbol[rule.indicator][rule.tf], rule.condition, parseFloat(rule.compare==='value' ? rule.value : symbol[rule.compare][rule.value]))
            else met = false
          }else{
            if (rule.compare==='value' || (rule.compare in symbol && rule.value in symbol[rule.compare]) )
              met = met || compare(symbol[rule.indicator][rule.tf], rule.condition, parseFloat(rule.compare==='value' ? rule.value : symbol[rule.compare][rule.value]))
          }
        })
        return met;
      }
      let meet = !this.filter.any;
      this.filter.conditions.forEach( cond => {
        if (!cond.disabled){
          console.log('scanning', cond.name)
          if (!this.filter.any) meet = meet && scanCond(cond);
          else meet = meet || scanCond(cond);
        }
      })
      // console.log(symbol.symbol, meet)
      return meet;
    },
    scanFilter(){
      this.filter.symbols = "";
      if (this.filter.conditions.length<=0) return;
      this.data.forEach(symbol => {
        if (this.filtered(symbol))
          this.filter.symbols += ' ' + symbol.symbol;
      })
      console.log(this.filter)
    },
  }
}
</script>>