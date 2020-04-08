<template>
  <!-- this is required for the screen formatting to work -->
  <div>
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { RegistrationFlow } from "../register.vue";

@Component
export default class extends Vue {
  // route guard
  validate({ params: { flow } }: any) {
    return flow === RegistrationFlow.demand || flow === RegistrationFlow.supply;
  }
}
</script>
