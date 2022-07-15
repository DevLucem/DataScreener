<template>
  <div v-if="user!==null" class="md:flex bg-back">
    <div class="flex fixed w-full md:w-32 text-white md:h-full z-10">
      <div class="w-full flex justify-between md:flex-col m-4 bg-fore rounded-3xl p-4 md:py-8 items-center md:space-y-12">
        <img class="h-12 w-12 md:w-16 md:h-16 md:m-2" src="./assets/logo.png" alt="Logo">
        <div class="px-4 h-1 w-full hidden md:block">
          <div class="bg-back h-1 w-full"></div>
        </div>
        <router-link v-bind:class="{selected: $route.path.includes('home')}" to="/home">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <title>Home Dashboard</title>
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </router-link>
        <router-link v-bind:class="{selected: $route.path.includes('data')}" to="/data">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <title>Analysed Data</title>
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
        </router-link>
        <router-link v-bind:class="{selected: $route.path.includes('updates')}" to="/updates">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <title>Recent Updates</title>
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
        </router-link>
        <div class="md:flex-1 flex items-end">
          <button @click="logout" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <title>Sign Out</title>
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="h-screen pt-24 md:pt-0 md:ml-28 overflow-y-auto w-full">
      <router-view :user="user" :conditions="conditions" :filters="filters" :edit="filter" :data="data" :timeframes="timeframes" :indicators="indicators" v-on:edit="edit"/>
    </div>
  </div>
  <Auth v-else/>
</template>

<script>
import Auth from "./components/Auth.vue";
import Test from "./components/Test.vue";
let listen_data; let listen_filters; let listen_conditions;
export default {
  name: "App",
  components: {Test, Auth},
  data() {return {
      filters: [],
      data: [],
      indicators: [],
      timeframes: [],
      conditions: [],
      filter: null,
      user: null
    }
  },
  created() {
    this.FIREBASE.auth().onAuthStateChanged( user => {
      this.user = user;
      if (user) {
        if (!listen_filters)
          listen_filters = this.FILTERS.where("user", "==", user.uid).onSnapshot( docs => {
            this.filters = []; docs.forEach( doc => {
              this.filters.push(doc.data())
            })
          })
        if (!listen_conditions)
          listen_conditions = this.CONDITIONS.where("user", "==", user.uid).onSnapshot( docs => {
            // console.log(docs.size, 'conditions size', user.uid)
            this.conditions = []; docs.forEach( doc => {
              this.conditions.push(doc.data())
            })
          })
        if (!listen_data)
          listen_data = this.DATA.where("user", "==", user.uid).onSnapshot( docs => {
            this.data = []; this.indicators = []; this.timeframes = [];
            docs.forEach( doc => {
              let data = doc.data();
              Object.keys(data).forEach( key => {
                if (key!=='symbol' && key!=='created' && typeof data[key]==='object'){
                  if ( !(this.indicators.includes(key)) ) this.indicators.push(key);
                  Object.keys(data[key]).forEach( tf => {
                    if ( !(this.timeframes.includes(tf)) ) this.timeframes.push(tf);
                  })
                }
              })
              this.data.push(data);
            })
          })
      }
    })
  },
  methods: {
    edit(e){
      this.filter=e;
      if (e) this.$router.push('/filter')
    },
    logout(){
      this.FIREBASE.auth().signOut().finally(()=>window.location.reload())
    }
  }
}
</script>
