<template>
  <div>
    <div class="center">
      <topbar class="topbar" />
      <nuxt class="screen-center" />
      <cookies />
    </div>
    <top :useBody="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import topbar from "@/components/pages/topbar.vue";
import cookies from "@/components/cookies.vue";
import top from "@/components/goto-top.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.LayoutsStart,
  components: {
    topbar,
    cookies,
    top,
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
}
</style>
