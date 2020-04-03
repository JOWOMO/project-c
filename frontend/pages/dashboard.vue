<template>
  <div class="container">
    <sidebar :flow="flow" :data="demands.demands" class="sidebar" />

    <h1>Finde Personal-Partner</h1>
    <div class="distance">
      <span>{{ location }}</span>
      <div class="form-group half-width dropdown" id="dropdown">
        <div class="select-box">
          <div class="options-container" ref="optionsContainer" :class="{active: isActive}">
            <div class="option" ref="option"  @click="selected_distance(5)">
              <input type="radio" class="radio" name="category" id="five" />
              <label for="five">5km</label>
            </div>
            <div class="option" ref="option"  @click="selected_distance(10)">
              <input type="radio" class="radio" name="category" id="ten" />
              <label for="ten">10km</label>
            </div>
            <div class="option" ref="option"  @click="selected_distance(15)">
              <input type="radio" class="radio" name="category" id="fifteen" />
              <label for="fifteen">15km</label>
            </div>
            <div class="option" ref="option"  @click="selected_distance(20)">
              <input type="radio" class="radio" name="category" id="twenty" />
              <label for="twenty">20km</label>
            </div>
            <div class="option" ref="option"  @click="selected_distance(30)">
              <input type="radio" class="radio" name="category" id="thirty" />
              <label for="thirty">30km</label>
            </div>
            <div class="option" ref="option"  @click="selected_distance(40)">
              <input type="radio" class="radio" name="category" id="fourty" />
              <label for="fourty">40km</label>
            </div>
            <div class="option" ref="option"  @click="selected_distance(50)">
              <input type="radio" class="radio" name="category" id="fift" />
              <label for="fift">50km +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="isActive = !isActive">{{ selectedDistance }}</div>
        </div>
      </div>
    </div>

    <div class="radio">
      <button>Kacheln</button>
      <button>Karte</button>
    </div>

    <!-- <div class="matches" v-if="!map">
      <companyCard
        v-for="match in model.demands[0]"
        :key="match.name"
        :company_name="match.name"
        
      /> 
    </div> 

    <div class="map" v-else>
      <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        class="map"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>
    </div> -->
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
      map: false,
      isActive: false,
      location: "601234 Köln",
      bestmatches: [],
      lessmatches: [],
      demands:[],
      supplies:[],
      selectedDistance: 'entfernung Wählen',
      flow:''
    };
  },
   methods:{
    selected_distance(number) {
      this.selectedDistance = number.toString();
      this.isActive = false;
    },
     print(){
       console.log(this.demands)
     }
   },
  
  async beforeCreate() {
    try{
      // route for demand TODO: need to know demand or supply
      const client = this.$apollo.getClient();
      this.demands = (await this.$apollo.query({query:getDemands})).data.companies[0]
      this.flow = 'suche' 
      console.log(this.demands)

      // load first matches for first page
  }catch(err){
       
    }
  }

   
};
</script>

<style scoped lang="scss">
@import "~assets/global.scss";

.container {
  display: grid;
  grid-template-columns: 400px minmax(400px, 800px) auto;
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
    width: 100%;
    grid-column: 3;
    grid-row: 1 / span 2;
    justify-self: center;
    align-items: center;
    margin-top: 50px;

    button {
      border-radius: 0;
      width: 90px;

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
}

@media only screen and (max-width: 1150px) {
  .container {
    margin: 0 auto;
    justify-content: center;
    grid-template-columns: 1fr 0fr;
    width: 80%;

    .sidebar, .radio {
      display: none;
    }

    h1, .distance, .matches  {
      grid-column: 1;
    }

    h1 {
      justify-self: center;
    }

    .distance {
      justify-content: center;
    }
  }
}

@media only screen and (max-width: 765px) {
  .distance {
    flex-direction: column !important;
    align-items: center !important;
  }
}
</style>
