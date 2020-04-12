<template>
  <!-- this is required for the screen formatting to work -->
  <nuxt-child :filter="filter" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { Filter } from "../../components/filter.vue";

@Component
export default class extends Vue {
  @Prop({required: true}) filter!: Filter;
  
  // route guard
  validate({ params: { flow } }: any) {
    return flow === 'demand' || flow === 'supply';
  }
}
</script>
