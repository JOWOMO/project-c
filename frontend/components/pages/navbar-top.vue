<template>
  <div class="scroller">
    <slot />
    <div class="spacer" />
    <imprint class="imprint" :horizontal="true" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import imprint from "@/components/imprint.vue";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.PagesNavbarTop,
  components: { imprint }
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";
@import "@/assets/colors";

.spacer {
  padding-bottom: $pageMarginBottom;
}

.scroller {
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  align-content: unset;
  align-items: unset;
  flex: 1;
  overflow-y: scroll;
  padding: $gridsize;
  height: calc(100vh - #{$pageHeaderHeightWithPadding});
}

.imprint {
  margin-bottom: -$pageMarginMin;
  margin-left: -$pageMarginMin;
  padding-top: $pageMarginMin;
}

@media only screen and (max-width: $breakpoint_md) {
  .scroller {
    overflow: unset;
    padding: 0 $pageMarginMin;
    width: 100vw;
  }
}
</style>
