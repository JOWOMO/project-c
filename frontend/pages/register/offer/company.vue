<template>
  <div class="container">
     <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich biete','state':positions.team}]" class="sidebar" />
    <h1>Dein Unternehmen</h1>
    <p>Erzähle uns mehr über dein Unternehmen</p>
    <Company class="company-form" />
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
  middleware:'authenticated',
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
  },
};
</script>

<style lang="scss" scoped>

</style>
