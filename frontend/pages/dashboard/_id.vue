<template>
  <div>
    <h1>{{ name }}</h1>

    <div class="matches">
      <companyCard
        v-for="match in company.demands"
        :key="match.name"
        :id="match.id"
        :company_name="name"
        :skills="match.skills"
        :employees="match.quantity"
        :description="match.description"
        :profile_name="match.name"
        :adress="{
          street: match.company.street1,
          city: match.company.city,
          number: match.company.postalCode
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import companyCard from "@/components/company-card.vue";

import { Vue, Component } from "nuxt-property-decorator";

import {
  GetTeamsQuery,
  DemandMatchesQuery,
  DemandMatchesQueryVariables,
  SupplyMatchesQuery,
  SupplyMatchesQueryVariables
} from "@/apollo/schema";

import company from '@/apollo/queries/company.gql'
// import getTeams from "@/apollo/queries/teams.gql";
// import getDemandMatch from "@/apollo/queries/demand_matches.gql";
// import getSupplyMatch from "@/apollo/queries/supply_matches.gql";

@Component({
  components: { companyCard }
})
export default class extends Vue {
  company: any = []

  get name(): string {
    return this.company.name
  }


  async beforeCreate(){
    const result: any = await this.$apollo.query<GetTeamsQuery>({
      query: company,
      variables: {
        id: this.$route.params.id
      }
    });

    this.company = result.data.company

    console.log(result)
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
