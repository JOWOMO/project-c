<template>
  <div class="container">
      <sidebar v-bind:labels="[{'label':'Persönliche Daten','state':positions.profile},{'label':'Dein Unternehmen','state':positions.company},{'label':'Ich suche','state':positions.team}]" class="sidebar" />
    <h1>Finde Personal-Partner</h1>
    <p>in der Nähe von <span>60223 Köln</span></p>

    <div class="tags">
      <div class="tag" v-for="tag in tags" :key="tag.val">
        <p>{{ tag.val }}</p>
        <img src="/icons/dropdown.svg" alt="">
      </div>
    </div>

    <div class="wrapper">
      <div class="save">
        <img src="/icons/heart.svg" alt="">
        <p>suche Speichern</p>
      </div>

      <div class="radio">
        <button>Karte</button>
        <button>Kacheln</button>
      </div>
    </div>

    <div class="subheading">
      <img src="/icons/star.svg" alt="">
      <h2>Beste Matches</h2>
    </div>

    <CompanyCard
      v-for="match in bestmatches"
      :key="match.name"
      :name="match.name"
      :workers="match.workers"
      :img="match.img"
      :distance="match.distance"
      :requirements="match.requirements"
      :matching="match.matching"
      :link="match.link"
    ></CompanyCard>

    <h2>Diese Partner könnten dich auch interessieren</h2>
    <CompanyCard
      v-for="match in lessmatches"
      :key="match.name"
      :name="match.name"
      :workers="match.workers"
      :img="match.img"
      :distance="match.distance"
      :requirements="match.requirements"
      :matching="match.matching"
      :link="match.link"
    ></CompanyCard>
  </div>
</template>

<script>
import CompanyCard from "@/components/company_card.vue";
import sidebar from "@/components/sidebars/sidebar_dashboard.vue"
export default {
  head() {
    return {
      title: "Dein Dashboard",
      meta: [
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  middleware:'authenticated',
  components: {
    CompanyCard,
    sidebar
  },
  data() {
    return {
      bestmatches:[],
      lessmatches:[],
      tags: [
        {val:'Distanz in km'},
        {val:'Körperliche Arbeit'},
        {val:'Anzahl Leih-Mitarbeiter'},
        {val:'Führerschein'},
        {val:'Auto'},
        {val:'Fahrrad'},
        {val:'Vollzeit'}
      ],
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


 async fetch(){
    console.log("fetching");
    this.$axios.get("http://localhost:4000/matches")
      .then((response)=>{
        console.log("reponse match: ",response);
        this.bestmatches = response.data.sort((a, b) => (a.matching > b.matching) ? -1 : 1).slice(0,3);
        this.lessmatches = response.data.sort((a, b) => (a.matching > b.matching) ? -1 : 1).slice(3,6);
        console.log("bestmatches: ", this.bestmatches)
        console.log("lessmatches",this.lessmatches)
      })
      .catch((err)=>{
        console.log("Err fetching match: ",err)
      });
  },
  fetchOnServer:false,

};
</script>

<style scoped lang="scss">
  .container{
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
  }
</style>
