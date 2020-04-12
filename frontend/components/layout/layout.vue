<template>
  <div :class="columns ? 'columns' : 'rows'">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: true }) columns!: boolean;
}
</script>

<style scoped lang="scss">
.columns {
  min-height: 100vh;
  display: flex;
  flex: 1;
}

.rows {
  flex-direction: column;
  flex: 1;
}
</style>
