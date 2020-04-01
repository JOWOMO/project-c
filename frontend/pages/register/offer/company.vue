<template>
  <div class="container">
     <sidebarLogin v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />
    <h1>Dein Unternehmen</h1>
    <p>Erzähle uns mehr über dein Unternehmen</p>
    <Company class="company-form" />
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar_login.vue";
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
  layout: "register",
  components: {
    Sidebar,
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

<style lang="scss" scoped>
.container {
  padding-top: 50px;
  display: grid;
  grid-template-columns: 400px ;
  grid-template-rows: 1fr 1fr 10fr;

  .sidebar {
    grid-column: 1;
    grid-row: 1;
  }

  h1 {
    grid-column: 2;
    grid-row: 1;
    justify-self: left;
    margin-left: 10px;
  }

  p {
    grid-column: 2;
    grid-row: 2;
    margin-left: 10px;
  }

  .company-form {
    grid-column: 2;
    grid-row: 3;
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

    .company-form {
      width: 100%;
    }
  }
}
</style>
