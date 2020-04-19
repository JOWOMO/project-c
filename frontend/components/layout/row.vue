<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "nuxt-property-decorator";
import authenticated from "../../middleware/authenticated";

@Component
export default class extends Vue {
  @Prop({ default: -1 }) height!: number;
  @Prop({ default: false }) scroll!: number;

   get style() {
      const s: any = {};

      if (this.scroll) {
          s['height'] = '100%';
          s.overflow = 'auto';
      } else  if (this.height === -1) {
          s.display = 'flex';
          s.flex = 1;
      } else {
          s.height = this.height 
            + (typeof this.height === 'number' ? 'px' : '');
      }

      return s;
  }
}
</script>

