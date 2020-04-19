<template>
  <div :height="'calc(100vh - ' + TOPHEIGHT + 'px)'" class="scroller">
    <slot />
    <imprint class="imprint" :horizontal="true" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import imprint from "@/components/imprint.vue";

@Component({ components: { imprint } })
export default class extends Vue {
  TOPHEIGHT = 148;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";
@import "@/assets/colors";

.scroller {
  overflow-y: scroll;
  padding: 44px;
  padding-right: 48px;

  flex: 1;
  align-items: unset;
  align-content: unset;
}

.imprint {
  padding-top: 24px;
  margin-bottom: -24px;
  margin-left: -24px;
}

@media only screen and (max-width: $breakpoint_md) {
  .scroller {
    overflow: unset;
    width: 100vw;

    padding-left: 20px;
    padding-right: 20px;
  }

  .main {
    overflow-y: scroll;
  }
}
</style>
