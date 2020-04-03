<template>
  <div class="container">
    <sidebar
      v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':action_name,'state':positions.team}]"
      class="sidebar"
    />

    <auth
      v-bind:start_component="'register'"
      v-bind:target_route="target_route"
      class="flow"
    />
  </div>
</template>

<script>
import sidebar from "@/components/sidebar_login.vue";
import auth from "@/components/auth";

export default {
  head() {
    return {
      title: "Registrieren",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },

  created() {
    this.target_route = this.$route.query.flow === 'demand'
        ? '/register/search/company'
        : '/register/offer/company';

      this.action_name = this.$route.query.flow === 'demand'
        ? 'Ich suche'
        : 'Ich biete';
  },

  data() {
    return {
      action_name: '',
      target_route: '',

      positions: {
        profile: {
          editing: true,
          passed: false
        },
        company: {
          editing: false,
          passed: false
        },
        team: {
          editing: false,
          passed: false
        }
      }
    };
  },

  layout: "register",

  components: {
    sidebar,
    auth
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
