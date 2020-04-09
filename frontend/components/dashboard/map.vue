<template>
  <div>
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 70vh"
    >
      <GmapMarker
        v-for="match in matches"
        :key="match.id"
        :position="match.adress"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
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

@Component
export default class extends Vue {
  
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
