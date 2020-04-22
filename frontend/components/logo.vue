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
  useBetaLogo:boolean = false;

  created() {
    console.log("created hook")
    this.useBetaLogo = process.env.useBetaLogo == "true"
  }
}
</script>