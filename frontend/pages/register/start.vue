<template>
  <div class="container">
    <sidebar
      v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':action_name,'state':positions.team}]"
      class="sidebar"
    />

    <auth
      v-bind:start_component="'register'"
      v-bind:target_route="target_route"
    />
  </div>
</template>

<script>
import sidebar from "@/components/sidebars/sidebar_login.vue";
import auth from "@/components/auth";

export default {
  head() {
    return {
      title: "Registrieren",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "Um diese Plattform nutzen zu können musst du dich anmelden. Du kannst deine Teams hinzufügen und an andere Ausleihen oder selbst nach Aushilfe suchen." }
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

</style>
