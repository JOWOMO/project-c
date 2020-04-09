<template>
  <div>
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 70vh"
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
  </div>
</template>

<script lang="ts">
import formSelect from "@/components/forms/select.vue";
import companyCard from "@/components/company-card.vue";

import { Vue, Component } from "nuxt-property-decorator";

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

@Component({
  components: { companyCard, formSelect }
})
export default class extends Vue {
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
  ]
  teams: any = {};
  flow: String = "Suche";
  matches: any[] = [];
  selectedDistance: String = "";


  async beforeCreate(){
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
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/global.scss";
@import "~assets/colors.scss";

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
</style>
