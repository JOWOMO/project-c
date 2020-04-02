<template>
  <div class="container">
    <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />

    <h1>Ich suche</h1>
    <p>Details helfen uns dir Suchvorschäge anzuzeigen</p>

    <team
      class="team-form"
      v-for="team in teams"
      :key="team.id"
      :id="team.id"
    />

    <button class="add" @click.prevent="addTeam">
      <div class="circle">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.84615 0H9.15385V14H4.84615V0Z" fill="white"/>
          <path d="M1.88295e-07 9.15385L0 4.84615L14 4.84615V9.15385L1.88295e-07 9.15385Z" fill="white"/>
        </svg>
      </div>

      <span>Weiteres Team hinzufügen</span>
    </button>

    <div class="form-group buttons">
      <button @click.prevent="$router.push('/register/company')">Zurück</button>
      <button class="primary" @click.prevent="check_tags">Registrieren</button>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar_login.vue";
import team from '@/components/team-form.vue'

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
  middleware:'authenticated',
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
      teams: [
        {
          id: 1
        }
      ],
       positions:{
        profile:{
          editing:false,
          passed:true,
        },
        company:{
          editing:false,
          passed:true,

        },
        team:{
          editing:true,
          passed: false,
        },
      }
    }

  },
  methods: {
    get_tags: async function() {
      console.log("env: ",process.env.db)
      await this.$axios
        .$get(`${process.env.db}/tags`)
        .then(response => {
          console.log("response db: ", response);
          this.skills = response;
        })
        .catch(err => {
          console.log("error db: ", err);
        });
    },
    get_resources: async function() {
      await this.$axios
        .$get(process.env.db + '/resources')
        .then(response => {
          console.log("response db: ", response);
          this.resources = response;
        })
        .catch(err => {
          console.log("error db: ", err);
        });
    },
    myFilter: function() {
      this.isActive = !this.isActive;
    },
    check_tags: function() {
      // prove if at least one tag is checked
      const tags = this.$store.getters["get_tags"];
      console.log(tags);
      for (var tag in tags) {
        if (tag != null) {
          this.valid_skills = false;
          if (this.$store.state.register_state.user.email == undefined) {
            // user is empty redirect to /register/user
            this.$router.push("/register/user");
          } else if (
            this.$store.state.register_state.company.company_name == undefined
          ) {
            // company is empty redircet to /register/company
            this.$router.push("/register/company");
          } else {
            // everything passt our validation --> sync all data with backend and cognito
            console.log("everything passt our validation");
            this.$store.dispatch("auth/register", {
              email: this.$store.state.register_state.user.email,
              password: this.$store.state.register_state.user.pwd
            });
            this.$router.push("/register/validate");
          }
        }
      }
      console.log(this.valid_skills);
      this.valid_skills = true;
    },
    addTeam() {
      this.teams.push({
        id: this.teams.length + 1
      })
    }
  },
  created() {
    this.$store.commit("update_position", {
      positions: {
        profile: false,
        company: false,
        team: true
      }
    });
    console.log("full log:", this.resources);
    this.get_tags();
    this.get_resources();
  }
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

  .add {
    grid-column: 2;
    display: flex;
    align-items: center;
    width: auto;
    background: none;
    cursor: pointer;

    .circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #25A6DA;

      svg {
        margin-top: 13px;
      }
    }

    span {
      color: #25A6DA;
      font-weight: bold;
      margin-left: 10px;
      display: inline-block;
    }
  }

  .buttons {
    grid-column: 2;
    margin-top: 20px;
    z-index: 1;
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

    .team-form {
      width: 100%;
      margin: 0;
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
