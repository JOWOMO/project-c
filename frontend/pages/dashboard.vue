<template>
  <div class="container">
    <sidebar
      @handel-state="handelState"
      :handel-state="handelState"
      :flow="flow"
      :demand="teams.demands"
      :supply="teams.supplies"
      class="sidebar"
      :class="{expand: sidebar}"
    />
    <div class="burger-menu" @click="sidebar =! sidebar" :class="{expand: sidebar}" />

    <h1>Finde Personal-Partner</h1>
    <div class="distance">
      <span>{{ location }}</span>
      <formSelect
        id="distance"
        label="Entfernung"
        :values="distances"
        v-model="distance"
      />
    </div>

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

<script lang="ts">
import companyCard from "@/components/company-card.vue";
import sidebar from "@/components/sidebars/sidebar_dashboard.vue";
import formSelect from "@/components/forms/select.vue";

import {
  GetTeamsQuery,
  DemandMatchesQuery,
  DemandMatchesQueryVariables,
  SupplyMatchesQuery,
  SupplyMatchesQueryVariables
} from "@/apollo/schema";

import getTeams from "@/apollo/queries/teams.gql";
import getDemandMatch from "@/apollo/queries/demand_matches.gql";
import getSupplyMatch from "@/apollo/queries/supply_matches.gql";

import { Vue, Prop, Emit, Getter, Component, Provide } from "nuxt-property-decorator";
import { Object } from "lodash";

import { Validate } from "vuelidate-property-decorators";
import { required, numeric, minValue } from "vuelidate/lib/validators";

@Component({
  components: { sidebar, companyCard, formSelect },
  middleware: "authenticated"
})
export default class extends Vue {
  teams: any = {};
  flow: String = "Suche";
  matches: any[] = [];
  sidebar: boolean = false;
  selectedDistance: String = "";
  isActive: Boolean = false;
  location: String = "";
  distance: string = '0';
  distances: {id: string, name: string}[] = [
    { 
      id: '1', 
      name: '5'
    },
    {
      id: '2', 
      name: '10'
    },
    {
      id:'3', 
      name: '15'
    },
    {
      id: '4',
      name: "20"
    },
    {
      id: '5',
      name:'30'
    },
    {
      id:'6',
      name:'40'
    },
    {
      id:'7',
      name:'50'
    }
  ];

  @Provide("validation")
  validation() {
    return this.$v;
  }

  async beforeCreate() {
    const result: any = await this.$apollo.query<GetTeamsQuery>({
      query: getTeams
    });
    this.teams = result.data.companies[0];
    // Trying to get adress from backe nd
    this.location = result.data.companies[0].addressLine1;
    // trying to show the first matches of either demands or supllies
    if(this.teams.demands.length >= 1){
      this.handelState(this.teams.demands[0], 0);
    }
    //if demands is empty show first result of supplies
    else{
      this.handelState(this.teams.supplies[0], 1);
    }

  }
  async handelState(team: any, index: Number) {
    if (team.__typename == "Demand") {
      this.matches = (
        await this.$apollo.query<DemandMatchesQuery,DemandMatchesQueryVariables>({
          query: getDemandMatch,
          variables: {
            id: team.id
          }
        })
      ).data.matchDemand.matches;
      this.flow = "DemandMatch";
    } else {
      this.matches = (
        await this.$apollo.query<SupplyMatchesQuery,SupplyMatchesQueryVariables>({
          query: getSupplyMatch,
          variables: {
            id: team.id
          }
        })
      ).data.matchSupply.matches;
      this.flow = "SupplyMatch";
    }
    // closing sidebar for mobile when selecting the team
    this.sidebar = false;
  }
  selected_distance(number: number) {
    this.selectedDistance = number.toString();
    this.isActive = false;
  }
}
</script>

<style scoped lang="scss">
@import "~assets/global.scss";

.container {
  display: grid;
  grid-template-columns: 400px minmax(400px, 800px) auto;
  grid-template-rows: 1fr 1fr 10fr;
  height: 100vh;
  padding: 0;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

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
