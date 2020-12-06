<template>
  <!-- this is required for the screen formatting to work -->
  <div>
    <nuxt-child @selectelement="selectElement" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "nuxt-property-decorator";
import { RegistrationFlow } from "../register.vue";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.PagesRegisterFlow,
})
export default class extends Vue {
  // route guard
  validate({ params: { flow } }: any) {
    return flow === RegistrationFlow.demand || flow === RegistrationFlow.supply;
  }

  @Emit('selectelement')
  selectElement(num: number) {
    return num;
  }
}
</script>
