<template>
  <layout :columns="true">
    <column :order="2">
      <layout :columns="false" class="main">
        <row :height="TOPHEIGHT" class="header">
          <div class="narrow-navbar">
            <burger>
              <navbar :horizontal="false" :name="name">
                <template v-slot:header>
                    <navbarDashboard
                      :key="flow+selectedId"
                      :demands="demands"
                      :supplies="supplies"
                      :flow="flow"
                      :selected="selectedId"
                    />
                </template>
              </navbar>
            </burger>

            <div class="logo">
              <nuxt-link to="/">
                <img width="234px" height="37px" src="/images/logo.svg" alt="Logo" class="logo" />
              </nuxt-link>
            </div>
          </div>
          <navbar class="wide-navbar" :name="name" />
        </row>
        <row :height="'calc(100vh - ' + TOPHEIGHT + 'px)'" class="scroller">
          <filterElement v-if="company" class="filter" :me="company" @change-filter="changeFilter" />
          <nuxt-child :filter="filter" />
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
import filterElement, { Filter, DEFAULT_FILTER } from "@/components/filter.vue";
import navbar from "@/components/navbar/authenticated.vue";
import item from "@/components/navbar/item.vue";
import burger from "@/components/menu/burger.vue";
import navbarDashboard from "@/components/navbar/dashboard.vue";

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
    layout,
    column,
    row,
    top,
    filterElement,
    navbar,
    burger,
    navbarDashboard
  },
  layout: "search"
})
export default class extends Vue {
  TOPHEIGHT = 148;

  me: Pick<User, "firstName" | "lastName"> | null = null;

  @ProvideReactive("all-demands")
  demands: Demand[] = [];

  @ProvideReactive("all-supplies")
  supplies: Supply[] = [];

  filter: Filter = DEFAULT_FILTER;

  changeFilter(filter: Filter) {
    console.debug("Filter changed dashboard", filter);
    this.$set(this.filter, "range", filter.range);

    this.$track('dashboard', 'changed filter', filter.range.toString())
  }

  get company() {
    const { flow, id } = this.$route.params;

    if (this.flow  === 'supply' && this.supplies) {
      return this.supplies.find((f) => f.id)!.company;
      this.$track('dashboard', 'flow supply')
    }

    if (this.flow  === 'demand' && this.supplies) {
      return this.demands.find((f) => f.id)!.company;
      this.$track('dashboard', 'flow supply')
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

.narrow-navbar {
  display: none;
  flex: 1;
}

@media only screen and (max-width: 800px) {
  .nav {
    display: none;
  }

  .narrow-navbar {
    display: flex;
  }

  .wide-navbar {
    display: none;
  }

  .header {
    width: 100vw;
    background-color: white;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    height: 120px !important;

    padding-right: 0px;
    padding-top: 0;
    padding-left: 20px;
    padding-right: 48px;
  }

  .logo {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .scroller {
    overflow: unset;
    width: 100vw;

    padding-top: 20px;
    padding-right: 20px;

    height: calc(100vh - 120px) !important;
  }

  .main {
    overflow-y: scroll;
  }
}
</style>
