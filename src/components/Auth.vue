<template>
  <div class="h-screen bg-back w-full flex flex-col justify-center items-center">

    <img class="m-4 rounded-full p-4 w-24 h-24 bg-fore" src="../assets/logo.png" alt="Logo">
    <h1 class="title">Data Screener</h1>

    <div class="card m-12 py-12 px-24">
      <h2 class="text-center text-2xl mb-4 font-bold">LOG IN</h2>
      <button v-if="loading" class="button px-4">Loading...</button>
      <div id="authentication"></div>
    </div>
  </div>
</template>


<script>
import * as firebaseui from "firebaseui";
import 'firebaseui/dist/firebaseui.css'
let ui = null;
export default {
  name: "Intro",
  data(){
    return {
      loading: true
    }
  },
  created() {
    this.FIREBASE.auth().onAuthStateChanged( user => {
      this.loading = false;
      if (user) this.$router.push('/screen')
    })
  },
  mounted() {
    this.FIREBASE.auth().onAuthStateChanged( user => {
      if (!user) {
        if (!ui) ui = new firebaseui.auth.AuthUI(this.FIREBASE.auth());
        ui.start('#authentication', {
          signInOptions: [
            {
              provider: this.FIREBASE.auth.PhoneAuthProvider.PROVIDER_ID,
              defaultCountry: 'KE'
            }
          ],
          callbacks: {
            signInSuccessWithAuthResult() {
              window.location.reload()
            }, signInFailure() {
              window.location.reload()
            }
          },
          tosUrl: window.location.origin + '/about',
          privacyPolicyUrl: window.location.origin + '/about',
        });
        this.status = '';
      }
    });
  },
  unmounted() {
    if (ui){
      ui.delete()
    }
  },

}
</script>

<style>
.firebaseui-title {
  @apply hidden;
}
.firebaseui-phone-number, .firebaseui-id-country-selector-code, .firebaseui-input, .firebaseui-label{
  @apply text-white !important;
}
.firebaseui-button{
  @apply rounded-xl !important;
}
</style>