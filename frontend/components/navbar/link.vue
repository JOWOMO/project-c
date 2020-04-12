<template>
  <div :class="{'link': !selected}" @click.prevent="navigate">{{text}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true }) text!: string;
  @Prop() target!: string;
  @Prop({ default: false }) selected!: boolean;

  navigate() {
    if (this.target) {
      this.$router.push(this.target);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";

.link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.link:hover {
  color: darken($primary, 10);
  cursor: pointer;
}
</style>
