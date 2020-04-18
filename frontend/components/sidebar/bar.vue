<template>
  <layout class="dashboard-sidebar" :columns="false">
    <row :height="216">
      <logo class="logo" />
    </row>
    <row class="menu">
      <slot />
    </row>
  </layout>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";
import logo from "@/components/logo.vue";

@Component({
  components: { layout, column, row, logo }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.dashboard-sidebar {
  background: $uiComponent;
  min-height: 100vh;
}

.logo {
  text-align: center;
  display: flex;
  justify-content: center;
  padding-top: 39px;
}

.menu {
  display: flex;
  width: 100%;

  padding-left: 48px;

  flex-direction: column;
  // justify-content: center;
}
</style>
