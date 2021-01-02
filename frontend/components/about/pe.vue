<template>
  <div class="row">
    <div v-if="!center" class="left">
      <div class="number-left">
        <slot v-if="number" name="number">{{number}}</slot>
        <slot name="number-left" />
      </div>
      <div class="title">{{ title }}</div>
      <div class="text">
        <div>
          <slot name="both" />
          <slot name="left" />
        </div>
      </div>
    </div>

    <div v-if="center" class="center">
      <div class="number-center">
        <slot v-if="number" name="number">{{number}}</slot>
        <slot name="number-center" />
      </div>
      <div class="title">{{ title }}</div>
      <div class="text">
        <div>
          <slot name="both" />
        </div>
      </div>
    </div>

    <div v-if="!center" class="right">
      <div class="number-right">
        <slot v-if="number" name="number">{{number}}</slot>
        <slot name="number-right" />
      </div>
      <div class="title">{{ titleRight || title }}</div>
      <div class="text">
        <div>
          <slot name="both" />
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.AboutPe,
})

export default class extends Vue {
  @Prop({default: false}) center!: boolean;

  @Prop() number!: number;
  @Prop() title!: string;
  @Prop() titleRight!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.row {
  display: flex;
  flex: 1;
  flex-direction: row;
  text-align: center;
}

.row + .row {
  padding-top: $gridsize;
}

.left,
.right,
.center {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
}

.center {
  width: 100%;
}

.left {
  margin-right: $gridsize/4/2;
}

.right {
  margin-left: $gridsize/4/2;
}

.number-left,
.number-right {
  font-size: $gridsize;
  font-weight: 100;
}

.number-left {
  color: $primary;
}

.number-right {
  color: $secondary;
}

.title {
  padding-top: $gridsize / 4;
  color: $headercolor;
  font-weight: 500;
  font-size: $h3FontSize;
}

.text {
  padding-top: $gridsize / 4;
  font-size: 16px;
  color: $textcolor;

  div {
    text-align: center;
    max-width: 230px;
  }
}
</style>
