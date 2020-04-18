<template>
    <nuxt-child />
</template>

<script lang="ts">
import {
  DasboardTeamsQuery,
  DasboardTeamsQueryVariables,
  User,
  Demand,
  Supply,
} from "@/apollo/schema";

import getTeams from "@/apollo/queries/dashboard/teams.gql";

import { Vue, Component, Ref } from "nuxt-property-decorator";
import { ProvideReactive } from "vue-property-decorator";
import { Context } from "@nuxt/types";

@Component({
  components: {
  },
  middleware: "authenticated",
  layout: "main-left"
})
export default class extends Vue {
  @ProvideReactive("me")
  me: Pick<User, "firstName" | "lastName"> | null = null;

  @ProvideReactive("all-demands")
  demands: Demand[] = [];

  @ProvideReactive("all-supplies")
  supplies: Supply[] = [];

  async asyncData(context: Context) {
    let data: Pick<this, "demands" | "supplies" | "me">;

    try {
      const client = context.app.apolloProvider!.defaultClient;
      const result = await client.query<
        DasboardTeamsQuery,
        DasboardTeamsQueryVariables
      >({
        query: getTeams,
        fetchPolicy: "network-only" // We could possible cache that for the duration of the session?
      });

      // @ts-ignore
      data = {
        demands: result.data.activeDemands,
        supplies: result.data.activeSupplies,
        me: result.data.me
      };

      return data;
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
