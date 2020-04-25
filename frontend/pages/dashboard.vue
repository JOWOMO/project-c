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

@Component({
  components: {},
  middleware: "authenticated",
  layout: "main-left"
})
export default class extends Vue {
  created() {
    this.$store.commit("support/context", "zu Finde/Suche");
  }

  // async fetch() {
  //   console.debug('fetch called');

  //   try {
  //     await this.$store.dispatch('match/loadteams', this.$apollo);
  //   } catch (e) {
  //     console.error(e);
  //     throw e;
  //   }
  // }

  async asyncData(context: Context) {
    console.debug('dashboard', 'asyncdata');
    try {
      const client = context.app.apolloProvider!.defaultClient;
      await context.store.dispatch('match/loadteams', client);

      return {};
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
