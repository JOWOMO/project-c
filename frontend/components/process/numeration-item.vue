<template>
  <li class="numerationItem">
    <div class="numerationItem__columns" v-if="timeline">
      <div class="numerationItem__block -left">
        <div class="numerationItem__headline -primary" v-html="title" />
        <div class="numerationItem__text">
          <slot name="text-left" />
        </div>
      </div>
      <div class="numerationItem__dotWrapper">
        <div class="numerationItem__dot">
        </div>
      </div>
      <div class="numerationItem__block -right">
        <div class="numerationItem__headline -secondary" v-html="titleRight || title" />
        <div class="numerationItem__text">
          <slot name="text-right" />
        </div>
      </div>
    </div>
    <div class="numerationItem__center" v-else>
      <img
        class="numerationItem__arrow"
        src="/icons/arrow.svg"
      />
      <div class="numerationItem__block -bottomPadding">
        <img
          v-if="svg"
          class="numerationItem__svg"
          :src="`/icons/${svg}`"
        />
        <div class="numerationItem__headline" v-html="title" />
        <div class="numerationItem__text">
          <slot/>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.ProcessNumerationItem,
})

export default class extends Vue {
  @Prop({default: false}) timeline!: boolean;
  @Prop() svg!: string;
  @Prop() title!: string;
  @Prop() titleRight!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$numeration-svg-size: 24px;
$svg-size: 150px;

.numerationItem {
  padding-top: 70px;
  padding-bottom: 0;
  display: flex;
  justify-content: center;

  &__columns {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__block {
    flex: 1;
    background-color: $secondbackground;

    &.-left {
      text-align: right;
    }

    &.-right {
      text-align: left;
    }

    &.-bottomPadding {
      padding-bottom: $basic-spacing;
    }
  }

  &__arrow {
    width: $numeration-svg-size;
    height: $numeration-svg-size;
    background-color: $secondbackground;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 100%);
  }

  &__dotWrapper {
    background-color: $secondbackground;
    padding: 5px 50px;
    height: $numeration-svg-size + 10px;

    @media only screen and (max-width: $breakpoint_sm) {
      padding: 5px 15px;
    }
  }

  &__dot {
    height: $numeration-svg-size;
    width: $numeration-svg-size;
    background-color: $textcolor;
    border-radius: 50%;
  }

  &__headline {
    color: $headercolor;
    font-weight: 500;
    font-size: $h2FontSize;

    &.-primary {
      color: $primary;
    }

    &.-secondary {
      color: $secondary;
    }
  }

  &__text {
    padding-top: $basic-spacing;
  }

  &__svg {
    width: $svg-size;
    height: $svg-size;
    margin: $basic-spacing 0;
  }
}
</style>
