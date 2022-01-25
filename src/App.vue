<template>
  <div v-if="user!==null" class="flex bg-back">
    <div class="flex fixed w-32 text-white h-full">
      <div class="flex-1 flex flex-col m-4 bg-fore rounded-3xl py-8 items-center space-y-12">
        <img class="h-16 m-2" src="./assets/logo.png" alt="Logo">
        <div class="px-4 h-1 w-full">
          <div class="bg-back h-1 w-full"></div>
        </div>
        <router-link to="/home">Home</router-link>
        <router-link to="/data">Data</router-link>
        <router-link to="/updates">Updates</router-link>
        <div class="flex-1 flex items-end">
          <button>Logout</button>
        </div>
      </div>
    </div>
    <router-view class="ml-36 bg-darker flex-1 overflow-x-auto" :user="user" :filters="filters" :edit="filter" :data="data" :timeframes="timeframes" :indicators="indicators" v-on:edit="edit"/>
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
