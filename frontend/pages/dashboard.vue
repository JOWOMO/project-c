<template>
  <layout :columns="true">
    <column :order="2">
      <layout :columns="false" class="main">
        <row :height="100" class="header">Ich bin ein riesen Header!</row>
        <row :height="'calc(100vh - 100px)'" class="scroller">
          <nuxt-child />
          <top />
        </row>
        <top />
      </layout>
    </column>
    <column :width="336" :order="1" class="nav">
      <keep-alive>
        <sidebar :demands="demands" :supplies="supplies" :flow="'demand'" :selected="0" />
      </keep-alive>
    </column>
  </layout>
</template>

<script lang="ts">
import sidebar from "@/components/sidebars/dashboard.vue";

import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";
import top from "@/components/goto-top.vue";

import {
  DasboardTeamsQuery,
  DasboardTeamsQueryVariables,
  DemandMatchesQuery
} from "@/apollo/schema";

import getTeams from "@/apollo/queries/dashboard/teams.gql";

import { Vue, Component, Ref } from "nuxt-property-decorator";
import { ProvideReactive } from "vue-property-decorator";
import { Context } from "@nuxt/types";

@Component({
  components: { sidebar, layout, column, row, top },
  layout: "search"
})
export default class extends Vue {
  @ProvideReactive("all-demands")
  demands: any[] = [];

  @ProvideReactive("all-supplies")
  supplies: any[] = [];

  async asyncData(context: Context) {
    let data: Pick<this, "demands" | "supplies">;

    try {
      const client = context.app.apolloProvider!.defaultClient;
      const result = await client.query<
        DasboardTeamsQuery,
        DasboardTeamsQueryVariables
      >({
        query: getTeams,
        fetchPolicy: "network-only"
      });

      const company = result.data.companies![0];

      // @ts-ignore
      data = {
        demands: company.demands,
        supplies: company.supplies
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
.scroller {
  overflow-y: scroll;
}

@media only screen and (max-width: 800px) {
  .nav {
    display: none;
  }

  .scroller {
    overflow: unset;
  }

  .main {
    overflow-y: scroll;
  }
}
</style>
