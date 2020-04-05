<template>
  <div class="container">
    <sidebar @handel-state="handelState" :flow="flow" :demand="teams.demands" :supply="teams.supplies" class="sidebar" :class="{expand: sidebar}" />
    <div class="burger-menu" @click="sidebar =! sidebar" :class="{expand: sidebar}" />

    <h1>Finde Personal-Partner</h1>
    <!-- <div class="distance">
      <span>{{ location }}</span>
      <div class="form-group half-width dropdown" id="dropdown">
        <div class="select-box">
          <div class="options-container" ref="optionsContainer" :class="{active: isActive}">
            <div class="option" ref="option" @click="selected_distance(5)">
              <input type="radio" class="radio" name="category" id="five" />
              <label for="five">5km</label>
            </div>
            <div class="option" ref="option" @click="selected_distance(10)">
              <input type="radio" class="radio" name="category" id="ten" />
              <label for="ten">10km</label>
            </div>
            <div class="option" ref="option" @click="selected_distance(15)">
              <input type="radio" class="radio" name="category" id="fifteen" />
              <label for="fifteen">15km</label>
            </div>
            <div class="option" ref="option" @click="selected_distance(20)">
              <input type="radio" class="radio" name="category" id="twenty" />
              <label for="twenty">20km</label>
            </div>
            <div class="option" ref="option" @click="selected_distance(30)">
              <input type="radio" class="radio" name="category" id="thirty" />
              <label for="thirty">30km</label>
            </div>
            <div class="option" ref="option" @click="selected_distance(40)">
              <input type="radio" class="radio" name="category" id="fourty" />
              <label for="fourty">40km</label>
            </div>
            <div class="option" ref="option" @click="selected_distance(50)">
              <input type="radio" class="radio" name="category" id="fift" />
              <label for="fift">50km +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="isActive = !isActive">{{ selectedDistance }}</div>
        </div>
      </div>
    </div> -->

    <div class="matches" v-if="flow === 'DemandMatch'">
      <companyCard
        v-for="match in matches"
        :key="match.name"
        :company_name="match.name"
        :distance="match.distance"
        :employees="match.demand.quantity"
        :skills="match.demand.skills"
        :description="match.demand.description"
        :profile_name="match.demand.company.name"
        :percentage="match.percentage"
        :adress="{street:match.demand.company.street1,city:match.demand.company.city,number:match.demand.company.postalCode}"
      />
    </div>
     <div class="matches" v-else>
      <companyCard
        v-for="match in matches"
        :key="match.name"
        :company_name="match.name"
        :distance="match.distance"
        :employees="match.supply.quantity"
        :skills="match.supply.skills"
        :description="match.supply.description"
        :profile_name="match.supply.company.name"
        :percentage="match.percentage"
        :adress="{street:match.supply.company.street1,city:match.supply.company.city,number:match.supply.company.postalCode}"
      />
    </div>
  </div>
</template>

<script>
import companyCard from "@/components/company-card.vue";
import sidebar from "@/components/sidebars/sidebar_dashboard.vue";
import getTeams from "@/apollo/queries/teams";
import demandMatches from "@/apollo/queries/demand_matches";
import supplyMatches from "@/apollo/queries/supply_matches"

export default {
  layout: "search",
  head() {
    return {
      title: "Dein Dashboard",
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  },
  components: {
    companyCard,
    sidebar
  },
  data() {
    return {
      sidebar: false,
      map: false,
      isActive: false,
      location: "601234 Köln",
      bestmatches: [],
      lessmatches: [],
      matches: [],
      demands: [],
      supplies: [],
      selectedDistance: "entfernung Wählen",
      flow: "",
      teams:[]
    };
  },
  methods: {
    // handel which matches should be displayed
    async handelState(team,index) {
      // getting matches for other team
      if(team.__typename == "Demand"){
        console.log("calling hadel state",team);
      this.matches = (await this.$apollo.query({
        query: demandMatches,
        variables: {
          id: team.id
        }
      })).data.matchDemand.matches;
      this.flow = "DemandMatch"
      console.log("matches: ",this.matches)
      }else{
        this.matches = (await this.$apollo.query({
          query: supplyMatches,
        variables: {
          id: team.id
        }
      })).data.matchSupply.matches;
        this.flow = "SupplyMatch"
      console.log("matches: ",this.matches)
      }
      // closing sidebar for mobile when selecting the team      
      this.sidebar = false
    },
    selected_distance(number) {
      this.selectedDistance = number.toString();
      this.isActive = false;
    },
    print() {
      console.log(this.demands);
    }
  },

  async beforeCreate() {
    try {
      // route for demand TODO: need to know demand or supply
      const client = this.$apollo.getClient();
      this.teams = (
        await this.$apollo.query({ query: getTeams })
      ).data.companies[1];
      // this.flow = "suche";
      this.handelState(this.teams.demands[0],0)
      console.log("log teams",this.teams)
      // console.log("all demands: ",this.demands)
      // // setting first team in sidebar to active
      // this.demands[0].active = true
    } catch (err) {
      console.log(err)
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

  .burger-menu {
    display: none;
  }

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

    .sidebar {
      display: none;

      &.expand {
        display: inline-block !important;
      }
    }

    .burger-menu {
      grid-column: 1;
      justify-self: start;
      display: inline-block;
      position: absolute;
      top: 80px;
      left: 30px;
      width: 30px;
      height: 5px;
      background: #000;
      border-radius: 5px;
      // transition: all 1s ease;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 10px;
        left: 0;
        width: 30px;
        height: 5px;
        background: #000;
        border-radius: 5px;
      }

      &.expand {
        left: 41vw;
        transform: rotate(-45deg);
      }

      &.expand::after {
        transform: rotate(-90deg) translateX(35%);
      }
    }

    .radio {
      display: none;
    }

    h1,
    .distance,
    .matches {
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

@media only screen and (max-width: 550px) {
  .burger-menu {
    top: 50px !important;
    z-index: 10;

    &.expand {
      left: 85vw !important;
      transform: rotate(-45deg);
    }
  }

  .distance {
    flex-direction: column !important;
    align-items: center !important;
  }
}
</style>
