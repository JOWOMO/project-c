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
};
</script>

<style scoped lang="scss">

</style>
