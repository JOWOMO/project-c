<template>
  <div>
    <div class="center">
      <topbar class="topbar" />
      <nuxt class="screen-center" />
      <cookies />
    </div>
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
  name: ComponentName.LayoutsDefault,
  components: {
    topbar,
    cookies,
    support,
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

.topbar {
  background-color: white;
}

.center {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
