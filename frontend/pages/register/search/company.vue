<template>
  <div class="container"> 
    <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />
    <Company />
  </div>
</template>

<script>
import sidebar from "@/components/sidebar_login.vue";
import Company from "@/components/company-form.vue";

export default {
  head() {
    return {
      title: "Register - Company",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
 layout: "default",
  components: {
    sidebar,
    Company
  },
   data(){
    return {
      positions:{
        profile:{
          editing:false,
          passed:true,
        },
        company:{
          editing:true,
          passed:false,

        },
        team:{
          editing:false,
          passed: false,
        },
      }
    }
  }
};
</script>

<style>
@media only screen and (max-width: 1115px) {
  .sidebar {
    display: none;
  }
}
</style>
