<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{open: open}" @click="open = !open">{{ currentSelected.label || currentSelected }}</div>
    <div class="items" :class="{selectHide: !open}">
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="selectedItem=option; open=false; $emit('input', option)"
      >{{ option.label || option }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.Dropdown,
})
export default class extends Vue {
  @Prop({ required: true }) options!: any[];
  @Prop({ default: 0 }) tabindex!: number;
  @Prop() selected: any;

  open = false;
  selectedItem: any = null;

  get currentSelected() {
    if (this.selectedItem) { return this.selectedItem; }

    return this.options.length > 0
      ? this.options[0]
      : this.selectedItem;
  }

  mounted() {
    this.selectedItem = this.selected;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

$left: 14px;
$radius: 68px;
$height: 34px;

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: $height;
  line-height: $height;
  transition: all .5s ease;
}

.selected {
  background-color: $uiComponent;
  border-radius: $radius;
  border: 1px solid $border;
  color: $primary;
  padding-left: $left;
  cursor: pointer;
  user-select: none;
}

.selected.open {
  border: 1px solid $border;
  border-radius: $radius/4 $radius/4 0px 0px;
}

.selected:after {
  position: absolute;
  content: "";
  top: $height/2;
  right: $height/2;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: $primary transparent transparent transparent;
}

.custom-select {
  &:hover .selected {
    background-color: darken($primary, 10);
    color: white;
  }

  &:hover .selected:after {
    border-color: white transparent transparent transparent;
  }
}

.items {
  color: $textcolor;
  border-radius: 0px 0px $radius/4 $radius/4;
  overflow: hidden;

  border-right: 1px solid $border;
  border-left: 1px solid $border;
  border-bottom: 1px solid $border;

  position: absolute;
  background-color: $uiComponent;
  left: 0;
  right: 0;
}

.item {
  color: $textcolor;
  padding-left: $left;
  cursor: pointer;
  user-select: none;
}

.item:hover {
  background-color: $primary;
  color: white;
}

.selectHide {
  display: none;
}
</style>
