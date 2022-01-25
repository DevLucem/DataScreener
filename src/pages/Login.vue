<template>
  <div class="card flex flex-col items-center rounded">
    <div class="text-primary text-5xl font-bold mt-12">Login</div>
    <div id="authentication"></div>
  </div>
</template>

<script>
import * as firebaseui from "firebaseui";
import 'firebaseui/dist/firebaseui.css'
let ui = null;
export default {
  name: "Login",
  created() {
    this.FIREBASE.auth().onAuthStateChanged( user => {
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
  }
}
</script>
