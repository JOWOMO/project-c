<template>
  <div class="section">
    <h4 v-if="name">{{ name }}</h4>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() name!: string;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scales';

.section + .section {
  padding-top: $gridsize;
}
</style>
