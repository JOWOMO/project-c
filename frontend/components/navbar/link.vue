<template>
  <nuxt-link
    class="link"
    :class="{'-selected': selected}"
    active-class="-selected"
    exact
    :to="target"
  >
    <span class="link__text">{{text}}</span>
  </nuxt-link>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.NavbarLink,
})
export default class extends Vue {
  @Prop({ required: true }) text!: string;
  @Prop({default: '/'}) target!: string;
  @Prop({default: false}) selected!: boolean;
}
</script>

<style scoped lang="scss">
@import '@/assets/colors';
@import '@/assets/global';

.link {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-weight: 400;
  height: 100%;
  color: $inputtextcolor;
  white-space: nowrap;
  width: 100%;

  &__text {
    @extend %text-ellipsis;
  }

  &:hover {
    color: darken($primary, 10);
  }

  &.-selected {
    cursor: hand;
    color: $primary;
  }
}
</style>
