<template>
  <div class="container">
    <sidebar v-bind:model="model" />
   
    
    <h1>Finde Personal-Partner</h1>
    <div class="distance">
      <span>{{ location }}</span>
      <div class="form-group half-width dropdown" id="dropdown">
        <div class="select-box">
          <div class="options-container" ref="optionsContainer" :class="{active: isActive}">
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="five" />
              <label for="five">5km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="ten" />
              <label for="ten">10km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="fifteen" />
              <label for="fifteen">15km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="twenty" />
              <label for="twenty">20km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="thirty" />
              <label for="thirty">30km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="fourty" />
              <label for="fourty">40km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="fift" />
              <label for="fift">50km +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="isActive = !isActive">Entfernung</div>
          <button @click="print">{{ model }}</button>
        </div>
      </div>
    </div>

    <div class="radio">
      <button>Kacheln</button>
      <button>Karte</button>
    </div>
    
    <!-- <div class="matches">
      <companyCard
        v-for="match in model.demands[0]"
        :key="match.name"
        :company_name="match.name"
        
      /> 
    </div> -->

    <!-- <div class="subheading">
      <img src="/icons/star.svg" alt="">
      <h2>Beste Matches</h2>
    </div>

    <div class="companyCards">
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
        class="companyCard"
      ></CompanyCard>
    </div>

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
    ></CompanyCard>-->
  </div>
</template>

<script>
import companyCard from "@/components/company-card.vue";
import sidebar from "@/components/sidebars/sidebar_dashboard.vue";
import getDemands from "@/apollo/queries/demands";
import demandMatches from "@/apollo/queries/demand_matches";
import getSkills from "@/apollo/queries/skills";

export default {
  head() {
    return {
      title: "Dein Dashboard",
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  },
  middleware: "authenticated",
  components: {
    companyCard,
    sidebar
  },
  data() {
    return {
      isActive: false,
      location: "601234 Köln",
      bestmatches: [],
      lessmatches: [],
      domands:[]
    };
  },
   methods:{
     print(){
       console.log(this.model)
     }
   },
  
   async fetch() {
     try{
       await this.$apollo.query({query:getDemands})

     }catch(err){
       
     }
   }
   
};
</script>

<style scoped lang="scss">
@import "~assets/global.scss";

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

  .distance {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    align-items: flex-start;

    span {
      margin: 5px 10px 0 10px;
    }

    #dropdown {
      width: 200px;

      .selected {
        border-radius: 30px;
        border-color: $primary;
        padding: 5px 15px;

        &::after {
          top: 12px;
        }
      }

      .options-container.active + .selected::after {
        top: -12px;
      }
    }
  }

  .radio {
    margin-top: 50px;
    grid-column: 3;
    grid-row: 1 / span 2;
    justify-self: flex-end;
    align-self: center;
    justify-self: center;
    align-self: start;
    button {
      border-radius: 0;

      &:nth-of-type(even) {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }

      &:nth-of-type(odd) {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
      }
    }
  }

  .matches {
    grid-column: 2 / span 3;
  }

  // .tag{
  //   border: 1px solid $primary;
  //   border-radius: 30px;
  //   display: inline-block;
  //   margin: 10px;
  //   padding: 3px 10px;

  //   &:hover {
  //     background: $uiComponentHighlighted;
  //   }

  //   &.selected {
  //     background: $primary;

  //     span {
  //       color: #fff;
  //     }
  //   }
  // }
}
</style>
