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

@Component({
  components: {
    sidebar,
    auth
  },
  layout: "register"
})
export default class StatRegistration extends Vue {
  selectedElement: number = 0;
  actionName!: string;

  labels = ["Persönliche Daten", "Dein Unternehmen"];

  @Provide("setState")
  setState(num: number) {
    this.selectedElement = num;
  }

  @Meta
  head() {
    return {
      title: this.actionName,
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  created() {
    const isDemand = this.$route.query.flow === "demand";

    this.actionName = isDemand ? "Ich suche" : "Ich biete";
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
  margin: 20px;
}

@media only screen and (max-width: 950px) {
  .sidebar {
    display: none;
  }
}

// this is required for the scrollbars to appear
@media only screen and (max-height: 780px) {
  .screen-right {
    display: block !important;
  }
}

// we need to collapse the margin to allow resizing in block mode
@media only screen and (max-width: 950px) and (max-height: 780px) {
  .screen-right {
    margin: 0px;
  }
}
</style>
