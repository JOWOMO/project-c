<template>
  <layout :columns="true">
    <column :order="2">
      <layout :columns="false" class="main">
        <row :height="TOPHEIGHT" class="header">
          <slot name="navbar" />
        </row>
        <row id="scroller" :height="'calc(100vh - ' + TOPHEIGHT + 'px)'" class="scroller">
          <slot name="body" />
        </row>
      </layout>
    </column>
    <column :width="330" :order="1" class="left-nav">
      <slot name="left" />
    </column>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.PagesNavbarLeft,
  components: {
    layout,
    column,
    row,
  }
})
export default class extends Vue {
  TOPHEIGHT = 148;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";
@import "@/assets/colors";

.scroller {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  padding: $gridsize;
  padding-top: 0px;
  padding-right: $pageMarginRight;
}

@media only screen and (max-width: $breakpoint_vl) {
  .left-nav {
    display: none;
  }

  .header {
    width: 100vw;
    background-color: white;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    height: $pageHeaderHeight !important;
  }

  .scroller {
    overflow: unset;
    width: 100vw;

    padding-left: $pageMarginMin;
    padding-top: $gridsize;
    padding-right: $pageMarginMin;

    height: calc(100vh - #{$pageHeaderHeight}) !important;
  }

  // this is required to scroll in combination with main-left#overflow
  // .main {
  //   overflow-y: scroll;
  //   -webkit-overflow-scrolling: touch;
  // }
}
</style>
