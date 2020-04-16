<template>
  <div class="container">
    <h1>{{ company.name }}</h1>

    <h2>Gesuche</h2>
    <companyCard
      v-for="demand in company.demands"
      :key="demand.id"
      :company="company"
      :contact="company.contact"
      :match="result.match"
      :classification="result"
      @showall="onShowAll"
      @connect="onConnect"
    />

    <h2>Angebote</h2>
    <companyCard
      v-for="supply in company.supplys"
      :key="supply.id"
      :company="company"
      :contact="company.contact"
      :match="result.match"
      :classification="result"
      @showall="onShowAll"
      @connect="onConnect"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import companyCard from "@/components/match/company.vue";

import getCompany from "@/apollo/queries/company.gql";

import {
  GetCompanyQueryVariables,
  GetCompanyQuery,
  Company
} from "@/apollo/schema"

@Component({
  components: {
    companyCard
  }
})
export default class Details extends Vue {
  async getCompany() {
    const result = await this.$apollo.query<GetCompanyQuery, GetCompanyQueryVariables>({
      query: getCompany,
      variables: {
        id: this.$route.params.id!
      }
    })
    return result.data.company
  }

  company;
  async created() {
    this.company = await this.getCompany()
    console.log(this.company.name)
  }
}
</script>
