<template>
  <div :class="{'item': true, '-selected': selected}">
    <slot v-bind:selected="selected" v-bind:horizontal="horizontal" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit, Ref } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.NavbarItem,
})
export default class extends Vue {
  @Prop() horizontal!: boolean;
  @Prop() selected!: boolean;
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";
@import "@/assets/scales";

.item {
  border-bottom: 4px solid transparent;
  color: $headercolor;
  font-size: $textsize;
  padding: 0 15px 18px;
  &.-selected {
    border-bottom: 4px solid darken($primary, 10);
  }
}


</style>
