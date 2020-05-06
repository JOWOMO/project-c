<template>
  <div>
    <nuxt class="screen-top" />
    <cookies />
    <support />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";
import support from "@/components/support.vue";

@Component({
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

<style lang="scss" scoped>
@import "@/assets/screen";
</style>
