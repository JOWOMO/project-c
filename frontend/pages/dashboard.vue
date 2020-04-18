<template>
  <leftNav>
    <template slot="navbar">
      <topbar :hideLogo="true">
        <template slot="small">
          <navbarAuthenticated :horizontal="false">
            <template slot="header">
              <teamItems
                :key="flow+selectedId"
                :demands="demands"
                :supplies="supplies"
                :flow="flow"
                :selected="selectedId"
              />
            </template>
          </navbarAuthenticated>
        </template>
      </topbar>
    </template>

    <template slot="left">
      <sidebar
        class="left"
        :key="flow+selectedId"
        :demands="demands"
        :supplies="supplies"
        :flow="flow"
        :selected="selectedId"
      />
    </template>

    <template slot="body">
      <filterElement v-if="company" class="filter" :me="company" @change-filter="changeFilter" />
      <nuxt-child :filter="filter" />
      <top />
    </template>
  </leftNav>
</template>

<script lang="ts">
import sidebar from "@/components/pages/sidebar-dashboard.vue";
import leftNav from "@/components/pages/navbar-left.vue";
import top from "@/components/goto-top.vue";
import filterElement, { Filter, DEFAULT_FILTER } from "@/components/filter.vue";

import item from "@/components/navbar/item.vue";
import burger from "@/components/menu/burger.vue";

import topbar from "@/components/pages/topbar.vue";
import navbarAuthenticated from "@/components/pages/navbar-top-authenticated.vue";
import teamItems from "@/components/menuitems-teams.vue";

import {
  DasboardTeamsQuery,
  DasboardTeamsQueryVariables,
  DemandMatchesQuery,
  Company,
  User,
  Demand,
  Supply
} from "@/apollo/schema";

import getTeams from "@/apollo/queries/dashboard/teams.gql";

import { Vue, Component, Ref } from "nuxt-property-decorator";
import { ProvideReactive } from "vue-property-decorator";
import { Context } from "@nuxt/types";

@Component({
  components: {
    sidebar,
    filterElement,
    navbarAuthenticated,
    burger,
    teamItems,
    leftNav,
    topbar,
  },
  middleware: "authenticated",
  layout: "main-left"
})
export default class extends Vue {
  me: Pick<User, "firstName" | "lastName"> | null = null;

  @ProvideReactive("all-demands")
  demands: Demand[] = [];

  @ProvideReactive("all-supplies")
  supplies: Supply[] = [];

  filter: Filter = DEFAULT_FILTER;

  changeFilter(filter: Filter) {
    console.debug("Filter changed dashboard", filter);
    this.$set(this.filter, "range", filter.range);
  }

  get company() {
    const { flow, id } = this.$route.params;

    if (this.flow === "supply" && this.supplies) {
      return this.supplies.find(f => f.id)!.company;
    }

    if (this.flow === "demand" && this.supplies) {
      return this.demands.find(f => f.id)!.company;
    }

    return null;
  }

  get name() {
    return this.me?.firstName + " " + this.me?.lastName;
  }

  get selectedId() {
    return this.$route.params.id;
  }

  get flow() {
    return this.$route.params.flow;
  }

  async asyncData(context: Context) {
    let data: Pick<this, "demands" | "supplies" | "me">;

    try {
      const client = context.app.apolloProvider!.defaultClient;
      const result = await client.query<
        DasboardTeamsQuery,
        DasboardTeamsQueryVariables
      >({
        query: getTeams,
        fetchPolicy: "network-only"
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
@import "@/assets/scales";

.left {
  display: flex;
}

.filter {
  margin-bottom: 40px;
}
</style>
