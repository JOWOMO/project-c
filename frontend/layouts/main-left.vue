<template>
  <div>
    <nuxt class="overflow" />
    <cookies />
    <support />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";
import support from "@/components/support.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.LayoutsMainLeft,
  components: { cookies, support }
})
export default class extends Vue {
  head() {
    let canonical = `${process.env.rootUrl}${this.$route.path}`;
    const link = [{ rel: "canonical", href: canonical }];

    return {
      link
    };
  }
}
</script>

<style lang="scss">
// @import "@/assets/scales";
// @import "@/assets/colors";

// this required for the scroll position detection to work
// infinite loading
// .overflow {
//   overflow: hidden;
//   width: 100vw;
//   height: 100vh;
// }

// @media only screen and (max-width: $breakpoint_md) {
//   .overflow {
//     overflow: unset;
//     max-width: unset;
//     max-height: unset;
//   }
// }
</style>
