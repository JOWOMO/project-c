<template>
  <div class="page">
    <mq-layout mq="lg+">
      <sidebar :labels="labels" :selectedElement="position" class="sidebar" />
    </mq-layout>

    <mq-layout :mq="['sm', 'md']">
      <topbar class="top" :hideMenu="true" />
    </mq-layout>

    <nuxt-child class="screen-right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, State } from "nuxt-property-decorator";

import sidebar from "@/components/pages/sidebar-register.vue";
import topbar from "@/components/pages/topbar.vue";
import auth from "@/components/auth/index.vue";
import { IState } from "../store";
import {ComponentName} from "@/constants/componentName";

export enum RegistrationFlow {
  demand = "demand",
  supply = "supply"
}

@Component({
  name: ComponentName.PagesRegister,
  components: {
    sidebar,
    auth,
    topbar,
  },
  layout: "registration"
})
export default class extends Vue {
  labels = [];

  @State((s: IState) => s.register.position)
  position!: number;

  created() {
    // console.debug("register", "created");

    const flow = this.$route.params.flow;

    // @ts-ignore
    const label = this.$t(`register.${flow}.label`);

    // this.$store.commit('register/track', flow);
    this.$store.commit('support/context', `zur Registrierung (${label})`);

    // @ts-ignore
    this.labels.push(this.$t(`register.user`));

    // @ts-ignore
    this.labels.push(this.$t(`register.company`));

    // @ts-ignore
    this.labels.push(label);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scales";

.page {
  display: flex;
  flex-direction: row;
}

.top {
  background-color: white;
}

.sidebar {
  display: flex;
  min-width: 330px;
  height: 100%;
}

.screen-right {
  display: flex;

  width: 100vw;
  min-height: 100vh;

  padding-top: 150px;
  padding-bottom: $gridsize;

  justify-content: center;
}

@media only screen and (max-width: $breakpoint_md) {
  .page {
    flex-direction: column;
  }

  .screen-right {
    padding-top: $gridsize;
    padding-bottom: $gridsize;

    flex-shrink: 0;
  }
}

@media only screen and (max-height: $breakpoint_sm) {
  .screen-right {
    padding-bottom: $gridsize;
    padding-top: $gridsize;
  }
}
</style>
