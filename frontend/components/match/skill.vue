<template>
  <div 
    class="tag"
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
}
</script>

<style scoped lang="scss">
@import "assets/colors";
@import "assets/scales";

.tag {
  border-radius: 90px;
  height: 34px;
  background-color: $uiComponent;
  border: 1px solid $border;

  display: flex;
  padding-left: 10px;
  padding-right: 10px;

  font-size: 16px;
  font-weight: 500;
  color: $headercolor;

  span {
    padding: 3px;
    user-select: none;
  }
}
</style>
