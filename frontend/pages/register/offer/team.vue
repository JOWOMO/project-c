<template>
  <div class="container">
    <sidebar
      v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]"
      class="sidebar"
    />

    <h1>Ich biete</h1>
    <p>Details helfen uns dir Suchvorschäge anzuzeigen</p>

    <team type="offer" class="team-form" />
    <div class="form-group buttons">
      <button @click.prevent="$router.push('/register/company')">Zurück</button>
      <button class="primary" @click.prevent="save">Registrieren</button>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar_login.vue";
import team from "@/components/team-form.vue";

export default {
  head() {
    return {
      title: "Register - Team",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  layout: "default",
  middleware: "authenticated",
  components: {
    sidebar,
    team
  },
  data() {
    return {
      isActive: false,
      valid_skills: false,
      skills: [],
      resources: [],
      type: {
        skill: "skill",
        resource: "resource"
      },
      positions: {
        profile: {
          editing: false,
          passed: true
        },
        company: {
          editing: false,
          passed: true
        },
        team: {
          editing: true,
          passed: false
        }
      }
    };
  },
  methods: {
   addTeam() {
      this.teams.push({
        id: this.teams.length + 1
      })
    }
  },
 
};
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 400px auto;
  grid-auto-rows: min-content;
  height: 100vh;
  padding: 0;

  .sidebar {
    grid-column: 1;
    grid-row: 1 / span 3;
  }

  h1 {
    grid-column: 2;
    justify-self: left;
    margin: 50px 0 0 10px;
  }

  p {
    grid-column: 2;
    margin: 10px 0 10px 10px;
  }

  .team-form {
    grid-column: 2;
    margin: 20px 10px 0 10px;
  }

  .buttons {
    grid-column: 2;
  }
}

@media only screen and (max-width: 950px) {
  .container {
    grid-template-columns: 0fr 1fr;
    width: 100vw;
    padding: 50px 20px;

    p,
    h1 {
      width: 100%;
      text-align: center;
      margin: 0;
    }

    .sidebar {
      display: none;
    }

    .team-form {
      width: 100%;
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
