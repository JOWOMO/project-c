<template>
  <div>
    <mq-layout class="nav-small" :mq="['sm', 'md']">
      <logo class="center" />

      <burger v-if="!hideMenu" class="burger">
        <slot name="small">
          <navbar v-if="!authenticated" :horizontal="false" />
          <authenticated v-else :horizontal="false" :name="name" />
        </slot>
      </burger>
    </mq-layout>

    <mq-layout class="nav-wide" mq="lg+">
      <logo v-if="!hideLogo" class="grow" />

      <slot v-if="!hideMenu" name="wide">
        <navbar v-if="!authenticated" class="navbar" />
        <authenticated v-else class="navbar" :name="name" />
      </slot>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, State } from "nuxt-property-decorator";
import { IState } from "@/store/index";
import { CognitoUser } from "@aws-amplify/auth";

import navbar from "@/components/pages/navbar-top-default.vue";
import authenticated from "@/components/pages/navbar-top-authenticated.vue";
import burger from "@/components/menu/burger.vue";
import logo from "@/components/logo.vue";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.PagesTopbar,
  components: {
    navbar,
    authenticated,
    burger,
    logo
  }
})
export default class extends Vue {
  @Prop({default: false})
  hideMenu!: boolean;

  @Prop({default: false})
  hideLogo!: boolean;

  @State((s: IState) => s.auth.isAuthenticated)
  authenticated!: boolean;

  @State((s: IState) => s.auth.user)
  user!: any;

  get name() {
    return (
      //@ts-ignore
      (
        this.user?.attributes?.given_name +
        " " +
        this.user?.attributes?.family_name
      ).trim()
    );
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/screen";
@import "@/assets/scales";

.nav-small,
.nav-wide {
  height: $pageHeaderHeight;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.nav-small {
  width: 100vw;
  justify-content: flex-start;
}

.navbar {
  // this is the offset for the bar below to mark the active entry
  padding-top: 18px;
  padding-right: $gridsize;
}

.burger {
  padding-right: $pageMarginMin;
}

.grow {
  flex: 1;
  padding-left: $gridsize;
}

.center {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>
