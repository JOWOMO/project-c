<template>
  <div class="outer" :id="id" :class="{'-noIcon': !icon}">
    <div class="block-icon">
      <img v-if="icon" :src="`/icons/${icon}.svg`" />
    </div>
    <div class="block -noPanel" v-if="noPanel">
      <slot />
    </div>
    <panel v-else class="block" :has-shadow="isHighlightBox" :is-round="isHighlightBox">
      <slot />
    </panel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";
import Panel from "@/components/layout/panel.vue";

@Component({
  name: ComponentName.ProcessBlock,
  components: {Panel},
})
export default class extends Vue {
  @Prop({default: false}) noPanel!: boolean;
  @Prop({default: true}) isHighlightBox!: boolean;
  @Prop() id!: string;
  @Prop() icon!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.block {
  display: grid;
  min-width: 100%;
  padding: $gridsize / 2;

  &.-noPanel {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: 50px;
  }
}

.block-icon {
  justify-self: center;
  width: $gridsize * 2;
  margin: 0 auto $gridsize;
}

.outer {
  width: 100%;
  margin: 30px 0 40px;
}

// this is the scaling for the LARGE screen
@media only screen and (min-width: $breakpoint_sm) {
  .block {
    padding: $gridsize;
    grid-column: 2;
  }

  .block-icon {
    grid-column: 1;
    margin: $gridsize / 2 $gridsize 0 0;
  }

  .outer {
    display: grid;
    grid-auto-columns: $gridsize * 4 auto;
    align-content: flex-start;

    @media only screen and (max-width: $breakpoint_vl) {
      &.-noIcon {
        .block {
          padding: $gridsize;
          grid-column: 1 / span 2;
        }

        .block-icon {
          display: none;
        }
      }
    }
  }
}
</style>
