<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  // route guard
  validate({ params: { flow } }: any) {
    return flow === 'demand' || flow === 'supply';
  }
}
</script>
