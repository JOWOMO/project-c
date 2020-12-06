<template>
  <!-- this is required for the screen formatting to work -->
  <nuxt-child />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.PagesDashboardMatchFlow,
})
export default class extends Vue {
  // route guard
  validate({ params: { flow } }: any) {
    return flow === "demand" || flow === "supply";
  }
}
</script>
