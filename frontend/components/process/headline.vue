<template>
  <div class="headline">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";
import Panel from "@/components/layout/panel.vue";

@Component({
  name: ComponentName.ProcessHeadline,
  components: {Panel},
})
export default class extends Vue {
  @Prop({default: false}) noPanel!: boolean;
  @Prop() id!: string;
  @Prop() icon!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";

.headline {
  width: 100%;
  margin: 40px 0 20px;
  display: flex;
  justify-content: center;

  @media only screen and (min-width: $breakpoint_vl) {
    padding-left: $gridsize * 4;
  }

  * {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
