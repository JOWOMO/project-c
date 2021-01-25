<template>
  <layout :columns="true">
    <column :order="2">
      <layout :columns="false" class="main">
        <div class="header">
          <slot name="navbar" />
        </div>
        <div id="scroller" class="scroller">
          <mq-layout mq="lg+">
            <top target="scroller" />
          </mq-layout>

          <mq-layout :mq="['sm', 'md']">
            <top />
          </mq-layout>
          <slot name="body" />
        </div>
      </layout>
    </column>
    <column :width="330" :order="1" class="left-nav">
      <slot name="left" />
    </column>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";
import top from "@/components/goto-top.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.PagesNavbarLeft,
  components: {
    layout,
    column,
    row,
    top,
  }
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";
@import "@/assets/colors";

.header {
  height: $pageHeaderHeightWithPadding;
}

.scroller {
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  height: calc(100vh - #{$pageHeaderHeightWithPadding});
  overflow-y: scroll;
  padding: 0 $gridsize $gridsize;
}

@media only screen and (max-width: $breakpoint_md) {
  .left-nav {
    display: none;
  }

  .header {
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: row;
    height: $pageHeaderHeight;
    justify-content: flex-start;
    width: 100vw;
  }

  .scroller {
    height: auto;
    overflow: unset;
    padding-left: $pageMarginMin / 2;
    padding-right: $pageMarginMin / 2;
    padding-top: $gridsize;
    width: 100vw;
  }
}
</style>
