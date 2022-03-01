<template>
  <div class="text-white mx-8 pt-12 relative">

    <h1 class="text-4xl font-bold text-center md:text-left">Data Screener <span class="text-xl font-normal text-gray font-bold"> / Home</span> </h1>

    <div class="mt-16">
      <h1 class="tag text-center">Webhook: <span class="select-all italic text-gray">{{getWH()}}</span></h1>
    </div>


    <div class="mt-16 w-full">
      <h2 class="button-dull max-w-lg">Conditions</h2>

      <div class="flex mt-12 flex-wrap space-y-4">
        <div class="flex -my-6">
          <button class="button flex-1" @click="indicators.length<1?window.alert('There is no data to filter'):condition=true;newFilter=true;">Add</button>
        </div>

        <div class="rounded rounded-lg border border-gray p-4 mx-4 max-w-lg w-64" v-for="c in conditions" draggable="true" v-on:dragstart="adding=c">
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

    <div class="mt-24 w-full opacity-80">
      <h2 v-on:drop="FILTERS.doc(dragging).update({disabled: true}); dragging=null" ondragover="return false" class="button-dull max-w-lg">Filters</h2>
      <div class="flex mt-12 space-y-4">
        <div class="flex -my-6">
          <button class="button flex-1" @click="condition=false;newFilter=true">Add</button>
        </div>

        <div class="rounded rounded-lg border border-gray p-4 mx-4 max-w-lg w-64" v-for="f in filters.filter( fil => fil.disabled)"
             draggable="true" v-on:dragstart="dragging=f.id" v-on:drop="addCondition(f)" ondragover="return false">
          <div class="flex justify-between">
            <h3 class="overflow-x-auto">{{f.title}} {{f.id}}</h3>
            <div class="relative group">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <ul class="overflow-x-auto absolute ml-3 -mt-2 gradient p-2 rounded-b-xl rounded-r-xl invisible group-hover:visible">
                <li @click="edit=f;newFilter=true;">Edit</li>
                <li @click="removeFilter(f.id)">Delete</li>
                <li @click="FILTERS.doc(dragging).update({disabled: false});">Active</li>
              </ul>
            </div>
          </div>

          <ul class="bg-fore rounded-xl mt-2 w-full">
            <li class="flex items-center justify-between mx-2 mt-1" v-for="(c, i) in f.conditions">
              <div>
                {{c.name}}
              </div>
              <button class="icon w-6 h-6 my-1" @click="updateConditions(f, i)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          </ul>

          <div>{{f.symbols}}</div>
        </div>

      </div>
    </div>


    <div class="mt-24 w-full space-y-4">
      <h2 v-on:drop="FILTERS.doc(dragging).update({disabled: false}); dragging=null" ondragover="return false" class="button-dull max-w-lg">Active</h2>

      <div class="rounded rounded-lg border border-gray p-4 mx-4 max-w-lg w-64" v-for="f in filters.filter( fil => !fil.disabled)"
           draggable="true" v-on:dragstart="dragging=f.id" v-on:drop="addCondition(f)" ondragover="return false">
        <div class="flex justify-between">
          <h3 class="overflow-x-auto">{{f.title}}</h3>
          <div class="relative group">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <ul class="overflow-x-auto absolute ml-3 -mt-2 gradient p-2 rounded-b-xl rounded-r-xl invisible group-hover:visible">
              <li @click="edit=f;newFilter=true;">Edit</li>
              <li @click="removeFilter(f.id)">Delete</li>
              <li @click="FILTERS.doc(dragging).update({disabled: true});">Disable</li>
            </ul>
          </div>
        </div>

        <ul class="bg-fore rounded-xl mt-2 w-full">
          <li class="flex items-center justify-between mx-2 mt-1" v-for="c in f.conditions">
            <div>
              {{c.name}}
            </div>
            <button class="icon w-6 h-6 my-1" @click="FILTERS.doc(f.id).update({conditions: FIELD_VALUE.arrayRemove(c)})">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        </ul>

        <div>{{f.symbols}}</div>
      </div>
    </div>


    <div class="absolute top-0 w-full bg-back -mt-24 md:mt-0" v-if="newFilter">
      <Filter :edit="edit" :condition="condition" v-on:close="newFilter=false; edit=null; condition=false" :user="user" :data="data" :timeframes="timeframes" :indicators="indicators"/>
    </div>

  </div>
</template>

<script>
import Filter from "../components/Filter.vue";
export default {
  name: "Home",
  components: {Filter},
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
    addCondition(filter){
      if (this.adding){
        this.filter = filter;
        this.filter.conditions.push(this.adding)
        this.scanFilter()
        console.log('new symbols', this.filter.symbols)
        this.FILTERS.doc(filter.id).update({
          conditions: this.FIELD_VALUE.arrayUnion(this.adding),
          symbols: this.filter.symbols
        }).then(()=>this.adding=null)
      }

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