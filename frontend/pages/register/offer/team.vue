<template>
  <div class="container">
    <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />

    <h1>Dein Unternehmen</h1>
    <p>Erzähl uns mehr über dein Team</p>

    <team type="offer" class="team-form" />
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
  grid-template-rows: 1fr 1fr 10fr;
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
    margin-left: 10px;
  }

  .team-form {
    grid-column: 2;
    margin-right: 10px;
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
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
