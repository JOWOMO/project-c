<template>
  <div class="container">
    <h1>{{ company.name }} {{ company.industry.name }}</h1>
    <h4>Deine Kontaktperson: {{ company.contact.firstName }} {{ company.contact.lastName }}</h4>
    <h4>{{ company.addressLine1 }}, {{ company.postalCode }} {{ company.city }}</h4>

    <!-- <h2 v-if="company.demands && company.demands.length > 0">Sucht</h2> -->
    <div class="list" v-if="company.demands && company.demands.length > 0">
      <teamCard
        class="company-card"
        flow="supply"
        v-for="demand in company.demands"
        :key="demand.id"
        :match="demand"
        :requestedSkills="skills"
        :contact="company.contact"
        @connect="onConnect"
        :disableConnect="disableConnect"
      />
    </div>

    <!-- <h2 v-if="company.supplies && company.supplies.length > 0">Bietet</h2> -->
    <div class="list" v-if="company.supplies && company.supplies.length > 0">
      <teamCard
        class="company-card"
        flow="demand"
        v-for="supply in company.supplies"
        :key="supply.id"
        :match="supply"
        :requestedSkills="skills"
        :contact="company.contact"
        @connect="onConnect"
        :disableConnect="disableConnect"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import teamCard from "@/components/match/team.vue";
import fromDemand from "@/apollo/queries/dashboard/company_demand.gql";
import fromSupply from "@/apollo/queries/dashboard/company_supply.gql";

import {
  Company,
  CompanyDetailsFromDemandQuery,
  CompanyDetailsFromDemandQueryVariables,
} from "@/apollo/schema";
import { ConnectParams } from "@/pages/connect/request/_.vue";

@Component({
  components: {
    teamCard
  },
  scrollToTop: true,
})
export default class Details extends Vue {
  company: any;
  skills: any;

  get disableConnect() {
    return this.$route.query.disable != null;
  }

  onConnect(party: any) {
    this.$track("dashboard", "connect", "company", "Jetzt verbinden");

    const params: ConnectParams = {
      flow: this.$route.params.flow === 'supply' ? 'demand' : 'supply',
      origin: this.$route.query.id as string,
      match: party.id,
      firstName: party.firstName,
      lastName: party.lastName,
      pictureUrl: party.pictureUrl
    };

    console.log("onConnect", params);
    this.$router.push(`/connect/request/${btoa(JSON.stringify(params))}`);
  }

  async asyncData(context: Context) {
    const result = await context.app.apolloProvider!.defaultClient.query<
      CompanyDetailsFromDemandQuery,
      CompanyDetailsFromDemandQueryVariables
    >({
      query: context.params.flow === 'demand' ? fromDemand : fromSupply,
      fetchPolicy: "network-only", // we could cache that for the duration of the session
      variables: {
        id: context.params.id!,
        origin: context.query.id as string,
      }
    });

    if (!result.data.result?.company) {
      context.error({
          statusCode: 404,
          message: 'Der Datensatz ist uns nicht bekannt' as string
      });

      return;
    }

    const skills = (result.data.query?.skills || []).reduce((p, c) => {
        p[c.id] = true;
        return p;
      }, {} as any);

    return {
      company: result.data.result!.company,
      skills,
    };
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scales';

h2 {
  margin-top: 24px;
}

h4 {
  padding-top: 16px;
  font-size: 16px;
}

h4 + h4 {
  padding-top: 0;
}

.list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
  margin-top: $gridsize;
}

.company-card {
  flex: 1 1 650px;
  max-width: 650px;
}

.list > .company-card {
  margin-left: 20px;
}
</style>
