<template>
  <nav :class="{'vertical': !horizontal}">
    <slot v-bind:horizontal="horizontal" />
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.NavbarBar,
})
export default class extends Vue {
  @Prop({ default: true }) horizontal!: boolean;
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";
@import "@/assets/scales";

nav {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
}

.vertical {
  flex-direction: column;
  align-items: flex-start;

  /deep/ .item {
    align-items: center;
    display: flex;
    height: 64px;
    padding: 0 10px 0 24px;
    width: 100%;

    &:hover {
      background-color: darken($primary, 10%) !important;
      color: #fff !important;
    }

    .link:hover {
      color: #fff !important;
    }
  }

  /deep/ .item + .item {
    margin: 0;
    border-top: 1px solid $border;
  }
}
</style>
