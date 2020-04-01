<template>
  <div class="container">
     <sidebarLogin v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />
    <h1>Persönliche Daten</h1>
    <p>Wir benötigen ein paar Informationen, um loszulegen</p>
    <profile route="/register/offer/validate" class="profile-form" />
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import sidebarLogin from "@/components/sidebar_login.vue";
import profile from "@/components/user-form.vue";
// import Checkmark from '@/components/checkmark.vue'

export default {
  head() {
    return {
      title: "Register - User",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  data(){
    return{
      positions:{
        profile:{
          editing:true,
          passed:false,
        },
        company:{
          editing:false,
          passed:false,

        },
        team:{
          editing:false,
          passed: false,
        },
      }
    }
  },
  layout: "register",
  components: {
    sidebarLogin,
    profile
    // Checkmark
  }
};
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 1fr 1fr 10fr;
  height: 100vh;
  padding: 0;

  .sidebar {
    grid-column: 1;
    grid-row: 1 / span 3;
  }

  h1 {
    grid-column: 2;
    grid-row: 1;
    justify-self: left;
    margin: 50px 0 0 10px;
  }

  p {
    grid-column: 2;
    grid-row: 2;
    margin-left: 10px;
  }

  .profile-form {
    grid-column: 2;
    grid-row: 3;
    margin-right: 10px;
  }
}

@media only screen and (max-width: 950px) {
  .container {
    grid-template-columns: 0fr 1fr;
    width: 100vw;
    padding: 50px 20px;

    p, h1 {
      width: 100%;
      text-align: center;
      margin: 0;
    }

    .sidebar {
      display: none;
    }

    .profile-form {
      width: 100%;
    }
  }
}
</style>

