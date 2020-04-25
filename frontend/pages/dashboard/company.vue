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
      <nuxt-child />
    </template>
  </leftNav>
</template>

<script lang="ts">
import sidebar from "@/components/pages/sidebar-dashboard.vue";
import leftNav from "@/components/pages/navbar-left.vue";

import topbar from "@/components/pages/topbar.vue";
import navbarAuthenticated from "@/components/pages/navbar-top-authenticated.vue";
import teamItems from "@/components/menuitems-teams.vue";

import {
  Company,
  User,
  Demand,
  Supply
} from "@/apollo/schema";

import { Vue, Component, Ref, State } from "nuxt-property-decorator";
import { ProvideReactive } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { IState } from "~/store";

@Component({
  components: {
    sidebar,
    navbarAuthenticated,
    teamItems,
    leftNav,
    topbar,
  },
  middleware: "authenticated",
  layout: "main-left"
})
export default class extends Vue {
  @State((s: IState) => s.match.me)
  me!: Pick<User, "firstName" | "lastName"> | null;

   @State((s: IState) => s.match.demands)
  demands!: Demand[];

  @State((s: IState) => s.match.supplies)
  supplies!: Supply[];

  get name() {
    return this.me?.firstName + " " + this.me?.lastName;
  }

  get selectedId() {
    return this.$route.query.id;
  }

  get flow() {
    return this.$route.query.flow;
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
