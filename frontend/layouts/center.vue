<template>
  <div class="page">
    <topbar class="nav" />
    <nuxt class="screen-center" />
    <cookies />
    <support position="left" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import topbar from "@/components/pages/topbar.vue";
import cookies from "@/components/cookies.vue";
import support from "@/components/support.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.LayoutsCenter,
  components: {
    topbar,
    cookies,
    support
  }
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

<style lang="scss" scoped>
@import "@/assets/screen";
@import "@/assets/scales";

.nav {
  background-color: white;
  height: $pageHeaderHeight;
}

.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media only screen and (max-height: $breakpoint_sm) {
  .page {
    display: block;
  }

  .screen-center {
    padding-top: $gridsize;
  }
}

@media only screen and (max-width: $breakpoint_sm) {
  .page {
    display: block;
  }

  .screen-center {
    padding-bottom: $gridsize;
    padding-top: $gridsize;
  }
}
</style>
