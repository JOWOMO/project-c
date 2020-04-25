<template>
  <div>
    <div class="center">
      <topbar class="topbar" />
      <nuxt class="screen-center" />
      <cookies />
    </div>
    <support position='left' />
    <top :useBody="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import topbar from "@/components/pages/topbar.vue";
import cookies from "@/components/cookies.vue";
import top from "@/components/goto-top.vue";
import support from "@/components/support.vue";

@Component({
  components: {
    topbar,
    cookies,
    top,
    support,
  },
  middleware: "loaduser"
})
export default class extends Vue {}
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
