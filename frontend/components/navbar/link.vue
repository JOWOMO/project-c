<template>
  <div :class="{'link': !selected}" @click.prevent="navigate">{{text}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({required: true}) text!: string;
  @Prop({required: true}) target!: string;

  @Prop({default: false}) selected!: boolean;

  navigate() {
    this.$router.push(this.target);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";

.link:hover {
  color: darken($primary, 10);
  cursor: pointer;
}
</style>
