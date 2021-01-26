<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.LayoutColumn,
})
export default class extends Vue {
  @Prop({ type: Number, default: -1 }) width!: number;
  @Prop({ type: Number, default: -1 }) order!: number;

  get style() {
    const s: any = {};
    if (this.width === -1) {
      s.display = "flex";
      s.flex = 1;
    } else {
      s.width = this.width + "px";
    }

    if (this.order !== -1) {
      s.order = this.order;
    }

    return s;
  }
}
</script>
