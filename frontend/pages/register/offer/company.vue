<template>
  <div class="container">
     <sidebar :labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich biete','state':positions.team}]" class="sidebar" />
    <h1>Dein Unternehmen</h1>
    <p>Erzähle uns mehr über dein Unternehmen</p>
    <Company :flow="flow" class="company-form" />
  </div>
</template>

<script>
import sidebar from "@/components/sidebars/sidebar_login.vue";
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
      flow: '',
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
  created(){
    console.log(this.$route.path)
    if(this.$route.path == "/register/offer/company"){
      this.flow = "offer"
    }else if(this.$route.path == "/register/search/company"){
      this.flow = "search"
    }
  }
};
</script>

<style lang="scss" scoped>
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

  .company-form {
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

    .company-form {
      width: 100%;
    }
  }
}
</style>
