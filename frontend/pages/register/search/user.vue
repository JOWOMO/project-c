<template>
  <div class="container">
    <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />
    <profile route="/register/search/validate" />
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import sidebar from "@/components/sidebar_login.vue";
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
    sidebar,
    profile
    // Checkmark
  }
};
</script>

<style scoped lang="scss">
.container {
  overflow-x: hidden;
  height: 100vh;

  h1 {
    position: relative;
    left: 500px; // min 400px
    top: 70px;
  }

  form {
    position: relative;
    left: 500px; // min 400px
    top: 120px;
    overflow: hidden;

    .form-group {
      margin: 20px;

      label {
        font-weight: bold;
        font-size: 18px;
        display: block;
      }

      input {
        width: 400px;
        height: 40px;
        border: 1px solid grey;
        border-radius: 5px;
        background-color: #00000007;
        padding-left: 10px;
        font-size: 14px;
        outline: none;
        margin-top: 10px;
      }

      .btn {
        width: 130px;
        height: 40px;
        border-radius: 20px;
        outline: none;
        border: none;
        font-size: 16px;
        margin: 30px 30px 0 30px;
      }

      .btn-secondary {
        color: grey;
        position: relative;
        bottom: 30px;
        left: 0;
        width: 80px;
      }

      .btn-primary {
        background: deepskyblue;
        color: #fff;
        position: relative;
        bottom: 30px;
        right: -200px;
      }
    }
  }
}

@media only screen and (max-width: 1115px) {
  .sidebar {
    display: none;
  }
}
</style>

