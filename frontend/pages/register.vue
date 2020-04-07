<template>
  <div class="page">
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
  supply = "supply"
}

export type WorkflowProvider = () => Workflow;
type Workflow = {
  type: RegistrationFlow;
  displayName: string;
  setStage: (nbr: number) => void;
};

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
      setStage: this.setState.bind(this)
    };
  }

  @Meta
  head() {
    return {
      title: this.actionName,
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  mounted() {
    this.flowType =
      this.$route.query.flow === "demand"
        ? RegistrationFlow.demand
        : RegistrationFlow.supply;

    this.actionName =
      this.flowType === RegistrationFlow.demand ? "Ich suche" : "Ich biete";
    this.labels.push(this.actionName);
  }
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: row;
}

.sidebar {
  display: flex;
  min-width: 336px;
}

.screen-right {
  display: flex;

  width: 100vw;
  min-height: 100vh;

  padding-top: 150px;
  padding-bottom: 44px;

  justify-content: center;
  // overflow-y: scroll;
}

@media only screen and (max-width: 890px) {
  .page {
    flex-direction: column;
  }

  .screen-right {
    padding-top: 44px;
    padding-bottom: 44px;

    flex-shrink: 0;
  }
}

@media only screen and (max-height: 600px) {
  // .page {
  //   display: block;
  // }

  .screen-right {
    padding-bottom: 44px;
    padding-top: 44px;
  }
}
</style>
