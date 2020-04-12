<template>
  <nav>
    <slot />
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit } from "nuxt-property-decorator";

@Component
export default class extends Vue {
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
</style>
