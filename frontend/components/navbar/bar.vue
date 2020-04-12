<template>
  <nav :class="{'vertical': !horizontal}">
    <slot v-bind:horizontal="horizontal" />
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit } from "nuxt-property-decorator";

@Component
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

  .item + .item {
    margin-left: 50px;
  }
}

.vertical {
  flex-direction: column;
  align-items: flex-start;

  .item {
    padding: 0 !important;
    padding-left: 24px !important;

    width: 100%;
    height: 64px;
    // background: red;

    display: flex;
    align-items: center;

    &:hover {
      background-color: darken($primary, 10%) !important;
      color: #fff !important;
    }

    /deep/ .link:hover {
      color: #fff !important;
    }
  }

  .item + .item {
    margin: 0px;
    border-top: 1px solid $border;
  }
}
</style>
