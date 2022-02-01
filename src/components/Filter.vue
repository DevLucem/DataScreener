<template>

  <div class="min-h-screen flex flex-col items-center justify-center bg-back">

    <div class="card p-4 max-w-lg m-12">
      <div class="flex justify-between items-center border border-gray rounded-xl p-4">
        <h3 class="text-2xl mr-8">New {{condition?'Condition':'Filter'}}</h3>
        <div>
          <button class="uppercase border border-gray rounded-xl text-lg p-2 mx-2" @click="$emit('close')">Cancel</button>
          <button class="uppercase rounded-xl text-lg py-2 px-4 mx-2 gradient" @click="save()">Save</button>
        </div>
      </div>

      <div class="flex flex-col mt-12 mx-6" v-if="!condition">
        <input type="text" aria-label="none" placeholder="Title" class="flex-1 input" v-model="filter.title">
        <input type="text" aria-label="none" placeholder="Telegram Alert" class="mt-4 flex-none input" v-model="filter.alert">
      </div>

      <input v-if="condition && filter.conditions.length<1" placeholder="Condition Name" aria-label="none" class="input w-full mt-4" type="text" v-model="rule.name"/>

      <div v-for="(cond, x) in filter.conditions" class="w-full bg-back rounded-xl mt-4 p-4" v-bind:class="{'opacity-30': filter.conditions[x].disabled}">

        <div class="flex justify-between">
          <input aria-label="none" placeholder="Condition Name" class="input text-primary" v-model="filter.conditions[x].name"/>
          <div class="flex">
            <button v-if="!condition" class="icon w-8 h-8 mr-4" @click="addRule(false, x)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="icon w-8 h-8" @click="addRule(true, x)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <ul class="bg-fore rounded-xl mt-2 w-full" v-bind:class="{'hidden': filter.conditions[x].disabled}" v-on:drop="drop(x)" ondragover="return false">
          <li class="flex justify-between mx-2" draggable="true" v-for="(r, i) in cond.rules" v-on:dragstart="hoveringOverBasket={condition:x, rule:i}">
            <div>
              ({{r.indicator}}{{r.tf}}) {{r.condition}} ({{r.compare}}{{r.value}})
            </div>
            <button class="icon w-6 h-6 my-1" @click="addRule(true, x, i)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>
        </ul>

        <div class="flex justify-between mt-4">
          <label class="uppe ml-2">
            <input type="checkbox" class="checkbox w-5 h-5" v-model="filter.conditions[x].any">
            Match Any Rule?
          </label>
          <label class="uppe ml-2" v-if="!condition">
            Disabled
            <input type="checkbox" class="checkbox w-5 h-5" v-model="filter.conditions[x].disabled">
          </label>
        </div>
      </div>

      <div class="mt-8" v-if="condition">

        <div class="mt-4 flex space-x-8">
          <div class="flex-1 flex items-center">
            <label for="indicator" class="text-white mr-4 flex-1">Indicator</label>
            <select class="select flex-1" aria-label="none" name="Select" id="indicator" v-model="rule.indicator">
              <option v-for="option in indicators" :key="option" :value="option">{{option}}</option>
            </select>
          </div>
          <div class="flex-1 flex items-center">
            <label for="timeframe" class="text-white mr-4 flex-1">Timeframe</label>
            <select class="select flex-1" aria-label="none" name="Select" id="timeframe" v-model="rule.tf">
              <option v-for="option in timeframes" :key="option" :value="option">{{option}}</option>
            </select>
          </div>
        </div>

        <div class="flex mt-4 space-x-8">
          <div class="flex-1 flex items-center">
            <label for="condition" class="text-white mr-4 flex-1">Condition</label>
            <select class="select flex-1" aria-label="none" name="Select" id="condition" v-model="rule.condition">
              <option v-for="option in ['>', '<', '==', '>=', '<=']" :key="option" :value="option">{{option}}</option>
            </select>
          </div>
          <div class="flex-1 flex items-center">
            <label for="compare" class="text-white mr-4 flex-1">Compare</label>
            <select class="select flex-1" aria-label="none" name="Select" id="compare" v-model="rule.compare">
              <option value="value">Value</option>
              <option v-for="option in indicators" :key="option" :value="option">{{option}}</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <div v-if="rule.compare!=='value'">
            <div>
              <label for="timeframe1" class="text-white mr-4">Timeframe</label>
              <select class="select" aria-label="none" name="Select" id="timeframe1" v-model="rule.value">
                <option v-for="option in timeframes" :key="option" :value="option">{{option}}</option>
              </select>
            </div>
          </div>
          <input v-else placeholder="value" aria-label="none" class="input" type="text" v-model="rule.value">
          <button class="bg-accent flex-1 ml-8 rounded-xl" @click="addRule()">Add</button>
        </div>
      </div>

      <label class="mt-4 mx-6 flex justify-between items-center" v-if="!condition">
        <span>Match any of the grouped rules?</span>
        <input class="checkbox h-5 w-5" type="checkbox" v-model="filter.any">
      </label>

      <div v-if="!condition" class="mt-4 mx-6">Alert Message</div>
      <textarea v-if="!condition" name="Message" class="input mx-6" placeholder="Custom Message" aria-label="none" rows="2" v-model="filter.message"></textarea>

      <div class="flex mt-4 flex-wrap">
        <div v-for="s in filter.symbols.split(' ')">
          <template v-if="s!==''">
            <div class="tag">{{s}}</div>
          </template>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "Filter",
  props: ['indicators', 'timeframes', 'data', 'edit', 'user', 'condition'],
  data(){return {
    rule: {
      compare: "value",
      name: ""
    },
    filter: {
      title: "My Filter",
      conditions: [],
      symbols: "",
      message: "{{symbol}}\n"
    },
    hoveringOverBasket: {}
  }},
  created() {
    if (this.edit){
      this.filter = this.edit;
      this.$emit('edit', null);
      this.rule.name = "";
    }
  },

  methods: {
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
      this.rule = {};
      console.log(this.filter)
    },
    addRule(remove=false, cond=-1, pos=-1){
      if (remove){
        if (pos<0) this.filter.conditions.splice(cond, 1)
        else {
          let condition = this.filter.conditions[cond];
          this.filter.conditions.splice(cond, 1);
          condition.rules.splice(pos, 1);
          this.filter.conditions.push(condition);
        }
      }else{
        if (cond>=0){
          this.filter.conditions.push(this.filter.conditions[cond]);
        }else if (pos<0) {
          let verify = true;
          ['indicator', 'tf', 'condition', 'compare', 'value'].forEach(v => verify = verify && v in this.rule && this.rule[v] !== '')
          if (!verify) return;
          let condition = this.rule.name ? {name: this.rule.name, rules: []} : this.filter.conditions.pop()
          // this.rule.name = ""; todo removed not to reset
          condition.rules.push(this.rule)
          this.filter.conditions.push(condition)
        }else this.filter.symbols = "";
      }
      this.scanFilter();
    },
    clear(){
      this.filter = {
        title: "Title",
        conditions: [],
        symbols: ""
      }
      this.rule = {}
    },
    save(){
      if ( this.condition ? this.filter.conditions.length>0 : this.filter.title!==""){
        if (!this.filter.id && !this.condition) {
          this.filter.id = this.FILTERS.doc().id;
          this.filter.created = this.FIELD_VALUE.serverTimestamp();
          this.filter.user = this.user.uid;
        }
        let condition = {};
        if (this.condition){
          condition = this.filter.conditions[0];
          condition.id = this.CONDITIONS.doc().id;
          condition.created = this.FIELD_VALUE.serverTimestamp();
          condition.user = this.user.uid;
        }
        (this.condition ? this.CONDITIONS.doc(condition.id).set(condition) : this.FILTERS.doc(this.filter.id).set(this.filter)).then( () => this.$emit("close") )
            .catch(e => window.alert(e))
      }
    },
    drop(conditionIndex) {
      const [item] = this.filter.conditions[this.hoveringOverBasket.condition].rules.splice(this.hoveringOverBasket.rule, 1);
      this.filter.conditions[conditionIndex].rules.push(item);
      this.scanFilter();
    }
  }
}
</script>

<style scoped>

</style>