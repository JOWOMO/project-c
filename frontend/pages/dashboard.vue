<template>
  <nuxt-child />
</template>

<script lang="ts">
import {
  DasboardTeamsQuery,
  DasboardTeamsQueryVariables,
  User,
  Demand,
  Supply
} from "@/apollo/schema";

import getTeams from "@/apollo/queries/dashboard/teams.gql";

import { Vue, Component, Ref } from "nuxt-property-decorator";
import { ProvideReactive } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.PagesDashboard,
  components: {},
  middleware: "authenticated",
  layout: "main-left"
})
export default class extends Vue {
  created() {
    this.$store.commit("support/context", "zu Finde/Suche");
  }

  async asyncData(context: Context) {
    const client = context.app.apolloProvider!.defaultClient;
    await context.store.dispatch('match/loadteams', client);
  }
}
</script>

<style lang="scss" scoped>
</style>
