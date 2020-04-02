<template>
  <div class="container">
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
    CompanyCard
  },
  data() {
    return {
      tags: [
        {val:'Distanz in km'},
        {val:'Körperliche Arbeit'},
        {val:'Anzahl Leih-Mitarbeiter'},
        {val:'Führerschein'},
        {val:'Auto'},
        {val:'Fahrrad'},
        {val:'Vollzeit'}
      ]
    }
  },


  asyncData({ params, app }) {
    // console.log("asycData");
    return app.$axios.get(`${process.env.db}/matches`)
      .then((response)=>{
        // console.log("reponse match: ",response);
        const bestmatches = response.data.sort((a, b) => (a.matching > b.matching) ? -1 : 1).slice(0,3);
        const lessmatches = response.data.sort((a, b) => (a.matching > b.matching) ? -1 : 1).slice(3,6);

        return {bestmatches:bestmatches,lessmatches:lessmatches }
      })
      .catch((err)=>{
        console.log("Err fetching match: ",err)
      });
  }

};
</script>

<style scoped lang="scss">

</style>
