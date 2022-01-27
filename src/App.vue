<template>
  <div v-if="user!==null" class="md:flex bg-back">
    <div class="flex fixed w-full md:w-32 text-white md:h-full">
      <div class="w-full flex justify-between md:flex-col m-4 bg-fore rounded-3xl p-4 md:py-8 items-center md:space-y-12">
        <img class="h-12 w-12 md:w-16 md:h-16 md:m-2" src="./assets/logo.png" alt="Logo">
        <div class="px-4 h-1 w-full hidden md:block">
          <div class="bg-back h-1 w-full"></div>
        </div>
        <router-link v-bind:class="{selected: $route.path.includes('home')}" to="/home">Home</router-link>
        <router-link v-bind:class="{selected: $route.path.includes('data')}" to="/data">Data</router-link>
        <router-link v-bind:class="{selected: $route.path.includes('updates')}" to="/updates">Updates</router-link>
        <div class="md:flex-1 flex items-end">
          <button>Logout</button>
        </div>
      </div>
    </div>
    <div class="h-screen pt-24 md:pt-0 md:ml-28 overflow-y-auto w-full">
      <router-view :user="user" :filters="filters" :edit="filter" :data="data" :timeframes="timeframes" :indicators="indicators" v-on:edit="edit"/>
    </div>
  </div>
  <Auth v-else/>
</template>

<script>
import Auth from "./components/Auth.vue";
let listen_data; let listen_filters;
export default {
  name: "App",
  components: {Auth},
  data() {return {
      filters: [],
      data: [],
      indicators: [],
      timeframes: [],
      filter: null,
      user: null
    }
  },
  created() {
    this.FIREBASE.auth().onAuthStateChanged( user => {
      this.user = user;
      if (user) {
        if (!listen_filters)
          listen_filters = this.FILTERS.where("user_id", "==", user.uid).onSnapshot( docs => {
            console.log(docs.size)
            this.filters = []; docs.forEach( doc => {
              this.filters.push(doc.data())
            })
          })
        if (!listen_data)
          listen_data = this.DATA.onSnapshot( docs => {
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
    }
  }
}
</script>
