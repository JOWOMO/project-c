<template>
  <ul class="numeration">
    <slot/>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.ProcessNumeration,
})

export default class extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$line-width: 4px;

.numeration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  position: relative;
  text-align: center;
  text-indent: 0;
  z-index: 0;

  &:after {
    background-color: $textcolor;
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-50%);
    width: $line-width;
    z-index: -1;
  }
}
</style>
