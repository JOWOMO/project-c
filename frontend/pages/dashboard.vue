<template>
  <layout :columns="true">
    <column :order="2">
      <layout :columns="false" class="main">
        <row :height="TOPHEIGHT" class="header">
          <navbar :name="name" />
        </row>
        <row :height="'calc(100vh - ' + TOPHEIGHT + 'px)'" class="scroller">
          <filterElement v-if="company" class="filter" :me="company" />
          <nuxt-child />
          <top />
        </row>
        <top />
      </layout>
    </column>
    <column :width="330" :order="1" class="nav">
      <sidebar
        :key="flow+selectedId"
        :demands="demands"
        :supplies="supplies"
        :flow="flow"
        :selected="selectedId"
      />
    </column>
  </layout>
</template>

<script lang="ts">
import sidebar from "@/components/sidebars/dashboard.vue";

import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";
import top from "@/components/goto-top.vue";
import filterElement from "@/components/filter.vue";
import navbar from "@/components/navbar/authenticated.vue";

import {
  DasboardTeamsQuery,
  DasboardTeamsQueryVariables,
  DemandMatchesQuery,
  Company,
  User
} from "@/apollo/schema";

import getTeams from "@/apollo/queries/dashboard/teams.gql";

import { Vue, Component, Ref } from "nuxt-property-decorator";
import { ProvideReactive } from "vue-property-decorator";
import { Context } from "@nuxt/types";


@Component({
  components: { sidebar, layout, column, row, top, filterElement, navbar },
  layout: "search"
})
export default class extends Vue {
  TOPHEIGHT = 148;

  me: Pick<User, "firstName" | 'lastName'> | null = null;
  company: Pick<Company, "id" | "postalCode" | "city"> | null = null;

  @ProvideReactive("all-demands")
  demands: any[] = [];

  @ProvideReactive("all-supplies")
  supplies: any[] = [];

  get name()  {
    return this.me?.firstName + ' ' + this.me?.lastName;
  }

  get selectedId() {
    return this.$route.params.id;
  }

  get flow() {
    return this.$route.params.flow;
  }

  async asyncData(context: Context) {
    let data: Pick<this, "demands" | "supplies" | "company" | "me">;

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
        supplies: company.supplies,
        company,
        me: result.data.me,
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
  padding: 20px;
  padding-top: 0px;
  padding-right: 48px;
}

.header {
  padding-top: 34px;
  padding-left: 20px;
  padding-right: 48px;
}

.filter {
  margin-bottom: 40px;
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
