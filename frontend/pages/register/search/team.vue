<template>
  <div class="container">
   <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />
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
import sidebar from "@/components/sidebar_login.vue";
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
  layout: "default",
  middleware:'authenticated',
  components: {
    sidebar,
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
    };
  },
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
