<template>
  <!-- this is required for the screen formatting to work -->
  <nuxt-child />
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  // route guard
  validate({ params: { flow } }: any) {
    return flow === 'demand' || flow === 'supply';
  }
}
</script>
