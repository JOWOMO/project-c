<template>
  <nuxt-link to="/">
    <img v-if="useBetaLogo" width="234px" height="37px" src="/images/logo-beta.svg" />
    <img v-else width="234px" height="37px" src="/images/logo.svg" />
  </nuxt-link>
</template>

<script lang="ts">
console.log("hello")
import { Vue, Component }  from "nuxt-property-decorator";

@Component
export default class extends Vue {
  get useBetaLogo(): boolean {
    // @ts-ignore
    return process.env.useBetaLogo == 'true' || process.env.useBetaLogo === true;
  }
}
</script>
