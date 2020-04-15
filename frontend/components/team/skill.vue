<template>
  <div
    @click="update"
    class="tag"
    :class="{ 'not-clickable': !clickable, primary: clickable && selected, secondary: clickable && !selected }"
  >
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "nuxt-property-decorator";

type KeyValuePair = {
  id: string;
  name: string;
  active: boolean;
};

@Component
export default class extends Vue {
  @Prop({ required: true }) name!: string;

  @Prop({ required: false, default: false }) selected!: boolean;
  @Prop({ required: false, default: false }) clickable!: boolean;

  @Emit("input")
  update() {
    return !this.selected;
  }
}
</script>

<style scoped lang="scss">
@import "assets/colors";
@import "assets/scales";

.not-clickable {
  pointer-events:none;
}

.tag {
  border-radius: 90px;
  height: 50px;
  background-color: $uiComponent;
  border: 1px solid $border;

  display: flex;
  padding-left: 10px;
  padding-right: 10px;

  font-size: $textsize;
  color: $inputtextcolor;

  span {
    margin: 0 10px;
    align-self: center;
    user-select: none;
  }
}
</style>
