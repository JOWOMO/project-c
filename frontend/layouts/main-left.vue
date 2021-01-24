<template>
  <div>
    <nuxt class="overflow" />
    <cookies />
    <support />
    <top :useBody="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";
import top from "@/components/goto-top.vue";
import support from "@/components/support.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.LayoutsMainLeft,
  components: { cookies, top, support }
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
