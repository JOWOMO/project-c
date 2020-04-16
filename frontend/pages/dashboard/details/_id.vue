<template>
  <!-- error when rendering and company data is missing -->
  <div class="container">
    <h1>{{ company.contact.firstName }} {{ company.contact.lastName }}</h1>
    <p>{{ company.name }}, {{ company.addressLine1 }}</p>

    <h2>Gesuche</h2>
    <companyCard
      v-for="demand in company.demands"
      :key="demand.id"
      :match="demand"
      @connect="onConnect"
      :singleRow="true"
    />

    <h2>Angebote</h2>
    <companyCard
      v-for="supply in company.supplies"
      :key="supply.id"
      :match="supply"
      @connect="onConnect"
      :singleRow="true"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import companyCard from "@/components/match/company.vue";

import { Context } from "@nuxt/types";

import getCompany from "@/apollo/queries/company.gql";

import {
  GetCompanyQueryVariables,
  GetCompanyQuery,
  Company
} from "@/apollo/schema";
import { Company } from "../../../apollo/schema";

@Component({
  components: {
    companyCard
  }
})
export default class Details extends Vue {
  company: any;
  async asyncData(context: Context) {
    const result = await context.app.apolloProvider!.defaultClient.query<GetCompanyQuery, GetCompanyQueryVariables>({
      query: getCompany,
      fetchPolicy: "network-only",
      variables: {
        id: context.params.id!
      }
    })
    return {
      company: result.data.company
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    margin-top: 20px;
  }
</style>
