<template>
  <div
    class="panel"
    :class="{
      '-hasShadow': hasShadow,
      '-isBlue': isBlue,
      '-isRound': isRound
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.Panel,
})
export default class extends Vue {
  @Prop({default: false}) isBlue!: boolean;
  @Prop({default: false}) isRound!: boolean;
  @Prop({default: true}) hasShadow!: boolean;
}
</script>
<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.panel {
  background-color: $secondbackground;
  padding: $gridsize / 2;

  &.-hasShadow {
    box-shadow: 0 0 26px 3px rgba(0,0,0,0.39);
  }

  &.-isBlue {
    background-color: $primary;
    color: $uiComponent !important;

    * {
      color: $uiComponent !important;
    }
  }

  &.-isRound {
    border-radius: 12px;
  }
}
</style>
