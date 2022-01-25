<template>
  <div class="backy">

    <div class="container mx-auto min-h-screen">

      <div class="flex items-center justify-between w-full">
        <h1 class="title">Data Screener</h1>
        <div class="flex space-x-4">
          <router-link to="/filter" class="text-lg gradient rounded-2xl py-2 px-8 my-4 text-center text-white flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filter By</span>
          </router-link>
          <button @click="auth" class="text-lg gradient rounded-2xl py-2 px-8 my-4 text-center text-white flex items-center space-x-4 uppercase">
            {{ authState }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3">

        <div class="card px-4 pt-6 text-white mt-4 mx-1" v-for="filter in filters">
          <div class="flex justify-between border border-gray rounded-xl p-4">
            <h3 class="text-2xl cursor-pointer" @click="$emit('edit', filter)">{{filter.title}}</h3>
            <button @click="removeFilter(filter.id)" class="icon w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <button class="flex w-full text-xl gradient p-4 rounded-2xl my-4" @click="rules[filter.id]=!rules[filter.id]">
            <span class="flex-1">Rules</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul class="list-disc mx-8 my-2" v-if="rules[filter.id]">
            <li v-for="condition in filter.conditions">{{condition.name}}</li>
          </ul>

          <div class="flex my-4 flex-wrap">
            <div v-for="s in filter.symbols.split(' ')">
              <template v-if="s!==''">
                <div class="tag">{{s}}</div>
              </template>
            </div>
          </div>
        </div>
      </div>


      <div class="card p-4 my-8">
        <div class="flex justify-between border border-gray rounded-xl p-4">
          <h3 class="text-2xl">Symbols</h3>
          <button class="rounded-full bg-gray w-8 h-8 flex justify-center items-center text-lighter" @click="rules.symbols=!rules.symbols">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div class="flex flex-wrap mt-4" v-if="rules.symbols">
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

      <div class="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-8">

        <div class="card p-4 flex-1">
          <div class="flex justify-between border border-gray rounded-xl p-4">
            <h3 class="text-2xl">Indicators</h3>
            <button class="rounded-full bg-gray w-8 h-8 flex justify-center items-center text-lighter" @click="rules.indicators=!rules.indicators">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div class="flex mt-4 flex-wrap" v-if="rules.indicators">
            <div class="rounded-xl text-xl flex flex-row text-white bg-back px-4 m-1" v-for="i in indicators">
              {{i}}
              <button class="ml-2 hover:text-white" @click="removeIndicator(i)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>


        <div class="card p-4 flex-1">
          <div class="flex justify-between border border-gray rounded-xl p-4">
            <h3 class="text-2xl">Timeframes</h3>
            <button class="rounded-full bg-gray w-8 h-8 flex justify-center items-center" @click="rules.timeframes=!rules.timeframes">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div class="flex mt-4 flex-wrap" v-if="rules.timeframes">
            <div class="rounded-xl text-xl flex flex-row text-white bg-back px-4 m-1" v-for="t in timeframes">
              {{t}}
              <button class="ml-2 hover:text-white" @click="removeTimeframe(t)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="current" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-32 text-white overflow-x-auto">
        <table class="w-full max-w-full border-separate">
          <thead>
          <tr>
            <th v-for="title in ['Symbol', 'Recent Update']">{{title}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="d in data">
            <td v-for="v in ['symbol', 'last']">
              <div class="m-4 border border-gray p-4 rounded-2xl">
                {{d[v]}}
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Screen",
  props: ['filters', 'data', 'symbols', 'timeframes', 'indicators'],
  data(){
    return {
      authState: "login",
      rules: {}
    }
  },
  created() {
    this.FIREBASE.auth().onAuthStateChanged(user => {
      this.authState = user?"logout":"login"
    })
  },
  methods: {
    removeFilter(filter){this.FILTERS.doc(filter).delete()},
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
    auth(){
      this.FIREBASE.auth().currentUser?this.FIREBASE.auth().signOut().finally(()=>window.location,reload()):this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>