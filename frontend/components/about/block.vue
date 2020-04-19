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

.block {
  padding: $gridsize / 2;

  background-color: white;
  min-width: 100%;
}

.block-icon {
  justify-self: center;
  width: $gridsize * 2.5;

  padding-bottom: $gridsize;
  margin-right: $gridsize;
}

.outer {
  margin-top: $gridsize * 2;
}

h1 + .outer {
  margin-top: $gridsize;
}

@media only screen and (min-width: $breakpoint_md) {
  .block {
    padding: $gridsize;
    grid-column: 2;
  }

  .block-icon {
    grid-column: 1;
    justify-self: center;
    width: $gridsize * 2.5;

    margin-top: $gridsize / 2;
    padding-bottom: $gridsize;
    margin-right: $gridsize;
  }

  .outer {
    display: grid;
    grid-auto-columns: $gridsize * 4 auto;
    align-content: flex-start;
  }
}
</style>
