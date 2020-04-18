<template>
  <div class="outer">
    <img :id="id" class="block-icon" :src="'/icons/' + icon + '.svg'" />
    <div class="block">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() id!: string;
  @Prop() icon!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$grid: 44px;

.block {
  padding: $grid / 2;

  background-color: white;
  min-width: 100%;
}

.block-icon {
  justify-self: center;
  width: $grid * 2.5;

  padding-bottom: $grid;
  margin-right: $grid;
}

.outer {
  margin-top: $grid * 2;
}

h1 + .outer {
  margin-top: $grid;
}

@media only screen and (min-width: $breakpoint_md) {
  .block {
    padding: $grid;
    grid-column: 2;
  }

  .block-icon {
    grid-column: 1;
    justify-self: center;
    width: $grid * 2.5;

    margin-top: $grid / 2;
    padding-bottom: $grid;
    margin-right: $grid;
  }

  .outer {
    display: grid;
    grid-auto-columns: $grid * 4 auto;
    align-content: flex-start;
  }
}
</style>
