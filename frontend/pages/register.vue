<template>
  <div class="screen-with-nav">
    <keep-alive>
      <sidebar :labels="labels" :selectedElement="selectedElement" class="sidebar" />
    </keep-alive>

    <nuxt-child class="screen-right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";

import sidebar from "@/components/sidebars/register.vue";
import auth from "@/components/auth/index.vue";

export enum RegistrationFlow {
  demand = "demand",
  supply = "supply",
}

export type WorkflowProvider = () => Workflow;
type Workflow = {
  type: RegistrationFlow;
  displayName: string;
  setStage: (nbr: number) => void;
}

@Component({
  components: {
    sidebar,
    auth
  },
  layout: "registration"
})
export default class extends Vue {
  labels = ["Persönliche Daten", "Dein Unternehmen"];
  selectedElement: number = 0;

  flowType!: RegistrationFlow;
  actionName!: string;

  setState(num: number) {
    this.selectedElement = num;
  }

  @Provide("workflow")
  provideWorkflow(): Workflow {
    return {
      type: this.flowType,
      displayName: this.actionName,
      setStage: this.setState.bind(this),
    }
  }

  @Meta
  head() {
    return {
      title: this.actionName,
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  mounted() {
    this.flowType = this.$route.query.flow === "demand"
      ? RegistrationFlow.demand
      : RegistrationFlow.supply;

    this.actionName = this.flowType === RegistrationFlow.demand ? "Ich suche" : "Ich biete";
    this.labels.push(this.actionName);
  }
}
</script>

<style scoped lang="scss">
.screen-with-nav {
  display: flex;
  flex-direction: row !important;
  height: 100vh;
}

.sidebar {
  display: flex;
}

.screen-right {
  display: flex;
  flex-grow: 1;

  align-items: center;
  justify-content: center;

  overflow-y: scroll;

  // margin-top: 50px;
  // margin-bottom: 50px;
}

@media only screen and (max-width: 950px) {
  .sidebar {
    display: none;
  }
}

// this is required for the scrollbars to appear
// this is a fix for the centering viewport that cannot live
// with /deep/ .container 100vh; need to check
@media only screen and (max-height: 780px) {
  .screen-right {
    display: block !important;
    margin: 20px;
  }
}

// we need to collapse the margin to allow resizing in block mode
@media only screen and (max-width: 950px) and (max-height: 780px) {
  .screen-right {
    margin: 0px;
  }
}
</style>
