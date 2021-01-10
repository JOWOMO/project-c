<template>
  <div class="bulletPoint">
    <img
      class="bulletPoint__img"
      :src="`/icons/${icon}.svg`"
      alt="bulletPoint"
    />
    <span class="bulletPoint__text">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.ProcessBulletPoint,
})
export default class extends Vue {
  @Prop({default: 'positive'}) icon!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";
$icon-size: 20px;

.bulletPoint {
  display: flex;
  margin-bottom: $gridsize / 4;

  &__img {
    width: $icon-size;
    height: $icon-size;
    margin-right: 5px;
  }

  &__text {
    line-height: $icon-size;
  }
}
</style>
