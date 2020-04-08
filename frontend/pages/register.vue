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
import { ProvideReactive } from "vue-property-decorator";
import { Meta } from "@/components/decorator";

import sidebar from "@/components/sidebars/register.vue";
import auth from "@/components/auth/index.vue";

export enum RegistrationFlow {
  demand = "demand",
  supply = "supply"
}

export type WorkflowProvider = Workflow;
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

  constructor() {
    super();

    this.provideWorkflow = {
      type: RegistrationFlow.demand,
      displayName: "",
      setStage: this.setState.bind(this),
    };
  }

  setState(num: number) {
    this.selectedElement = num;
  }

  @ProvideReactive("workflow")
  provideWorkflow: Workflow;

  @Meta
  head() {
    return {
      title: this.provideWorkflow.displayName,
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  created() {
    this.provideWorkflow.type =
      this.$route.params.flow === "demand"
        ? RegistrationFlow.demand
        : RegistrationFlow.supply;

    this.provideWorkflow.displayName =
      this.provideWorkflow.type === RegistrationFlow.demand ? "Ich suche" : "Ich biete";

    this.labels.push(this.provideWorkflow.displayName);
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
