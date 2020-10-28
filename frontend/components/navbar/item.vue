<template>
  <div :class="{'item': true, 'selected': selected}">
    <slot v-bind:selected="selected" v-bind:horizontal="horizontal" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit, Ref } from "nuxt-property-decorator";
import {ComponentName} from "~/constants/componentName";

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
  font-size: $textsize;
  color: $headercolor;

  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 18px;

  border-bottom: 4px solid transparent;
}

.selected {
  border-bottom: 4px solid darken($primary, 10);
}
</style>
