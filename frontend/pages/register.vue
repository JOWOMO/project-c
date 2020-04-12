<template>
  <div class="page">
    <sidebar :labels="labels" :selectedElement="selectedIndex" class="sidebar" />
    <nuxt-child @selectelement="selectElement" class="screen-right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { ProvideReactive, Watch } from "vue-property-decorator";
import { Meta } from "@/components/decorator";

import sidebar from "@/components/sidebars/register.vue";
import auth from "@/components/auth/index.vue";

export enum RegistrationFlow {
  demand = "demand",
  supply = "supply"
}

export type Workflow = {
  type: RegistrationFlow;
  displayName: string;
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
  selectedIndex = 0;

  @ProvideReactive("workflow")
  providedWorfklow: Workflow | null = null;

  @Meta
  head() {
    return {
      title: this.providedWorfklow?.displayName,
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  selectElement(value: any) {
    console.debug("register", "selectElement", value);
    this.selectedIndex = value;
  }

  created() {
    console.debug("register", "created");

    this.providedWorfklow = {
      type: this.$route.params.flow as RegistrationFlow,
      displayName: this.$route.params.flow == "demand" ? "Ich suche" : "Ich biete"
    };

    this.labels.push(this.providedWorfklow.displayName);
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
  min-width: 330px;
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
