<template>
  <div>
    <div class="center">
      <topbar class="topbar" />
      <nuxt class="screen-center" />
      <cookies />
    </div>
    <support position="left" />
    <top :useBody="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import topbar from "@/components/pages/topbar.vue";
import cookies from "@/components/cookies.vue";
import top from "@/components/goto-top.vue";
import support from "@/components/support.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.LayoutsIe,
  components: {
    topbar,
    cookies,
    top,
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
@import "@/assets/colors";
@import "@/assets/scales";

.topbar {
  background-color: white;
}

.center {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media only screen and (max-width: $breakpoint_sm) {
  .center {
    display: block;
  }

  .screen-center {
    padding-bottom: $gridsize;
    padding-top: $gridsize;
  }
}

@media only screen and (max-height: $breakpoint_sm) {
  .center {
    display: block;
  }

  .screen-center {
    padding-bottom: $gridsize;
    padding-top: $gridsize;
  }
}
</style>
