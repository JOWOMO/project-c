<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <h1>Mein Team</h1>
    <p>
      Diese Skills hat mein Team
      <span>(min. eine Person)</span>
    </p>
    <span id="invalid_tags" v-if="valid_skills">Sie haben noch keine Skills ausgewählt.</span>
    <div class="tag-wrapper">
      <tag v-for="skill in skills" :key="skill.skill" :skill="skill.skill" :type="type.skill" />
    </div>
    <p>Ausserdem kann ich bereitstellen</p>
    <div class="tag-wrapper">
      <tag
        v-for="resource in resources"
        :key="resource.resource"
        :skill="resource.resource"
        :type="type.resource"
      />
    </div>
    <div class="button_wrapper">
      <button class="btn btn-secondary" @click.prevent="$router.push('/register/company')">Zurück</button>
      <button class="btn btn-primary" @click.prevent="check_tags">registrieren</button>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar_login.vue";
import tag from "@/components/tag/tag_skill.vue";

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
  layout: "register",
  components: {
    Sidebar,
    tag
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
      }
    };
  },
  methods: {
    get_tags: async function() {
      await this.$axios
        .$get("http://localhost:5000/tags")
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
        .$get("http://localhost:5000/resources")
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
  overflow-x: hidden;
  height: 100vh;

  h1 {
    position: relative;
    left: 500px;
    top: 70px;
  }

  p {
    color: #00000070;
    font-weight: bold;
    position: relative;
    left: 500px;
    top: 110px;

    span {
      font-weight: normal;
    }
  }
  #invalid_tags {
    color: #00000070;
    font-weight: bold;
    position: relative;
    left: 500px;
    top: 110px;
  }
  .button_wrapper {
    position: relative;
    top: 110px;
    left: 500px;
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
  .tag-wrapper {
    position: relative;
    top: 110px;
    left: 500px;
    padding: 20px;
    width: 60vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 1000px) {
  .sidebar {
    display: none;
  }

  h1 {
    width: 100vw;
    left: 0 !important;
    text-align: center;
    padding: 0 10px 0 10px;
  }

  p {
    width: 100vw;
    left: 0 !important;
    text-align: center;
    padding: 0 10px 0 10px;
  }

  .tag-wrapper {
    width: 100vw !important;
    left: 0 !important;
    text-align: center;
    padding: 0 10px 0 10px;
    justify-content: center;
  }
}
</style>
