<template>
  <panel class="processPanel" :has-shadow="true" :is-round="true">
    <img
      v-if="icon"
      class="processPanel__img"
      :src="`/icons/${icon}.svg`"
      :alt="icon"
    />
    <div class="processPanel__headline" v-html="title" />
    <div class="processPanel__text">
      <slot />
    </div>
    <button v-if="link" @click="scrollToPosition" class="cta">
      Erfahre mehr
    </button>
  </panel>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";
import Panel from "@/components/layout/panel.vue";

@Component({
  name: ComponentName.ProcessPanel,
  components: {
    Panel
  },
})
export default class extends Vue {
  @Prop() link!: string;
  @Prop() title!: string;
  @Prop() icon!: string;

  private scrollToPosition() {
    location.href = this.link;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$image-size: 150px;

.processPanel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  grid-column: span 2;

  @media only screen and (min-width: $breakpoint_sm) {
    grid-column: span 1;
  }

  @media only screen and (min-width: $breakpoint_md) {
    grid-column: span 2;
  }

  @media only screen and (min-width: $breakpoint_vl) {
    grid-column: span 1;
  }

  &__headline {
    color: $headercolor;
    font-weight: 500;
    font-size: $h2FontSize;
    margin-bottom: $basic-spacing;
  }

  &__img {
    width: $image-size;
    height: $image-size;
    margin-bottom: 20px;
  }

  &__text {
    margin-bottom: 20px;
  }
}
</style>
