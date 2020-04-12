<template>
  <div :class="{'item': true, 'selected': selected}">
    <slot v-bind:selected="selected" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() selected!: boolean;
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";
@import "@/assets/scales";

.item {
  font-size: $textsize;
  color: $headercolor;

  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 18px;
  border-bottom: 4px solid transparent;
}

.selected {
  padding-bottom: 18px;
  border-bottom: 4px solid $primary;
}
</style>
