<template>
  <div class="nav">
    <div class="logo">
      <nuxt-link to="/">
        <img width="234px" height="37px" src="/images/logo.svg" alt="Logo" class="logo" />
      </nuxt-link>
    </div>

    <navbar v-if="!authenticated" class="navbar" />
    <authenticated v-else class="navbar" :name="name" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, State } from "nuxt-property-decorator";
import navbar from "@/components/navbar/default.vue";
import authenticated from "@/components/navbar/authenticated.vue";
import { IState } from "@/store/index";
import { CognitoUser } from "@aws-amplify/auth";

@Component({
  components: {
    navbar,
    authenticated
  }
})
export default class extends Vue {
  @State((s: IState) => s.auth.isAuthenticated)
  authenticated!: boolean;

  @State((s: IState) => s.auth.user)
  user!: CognitoUser;

  get name() {
    return (
      //@ts-ignore
      this.user?.attributes?.given_name + " " + this.user?.attributes?.family_name
    ).trim();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/screen";

.nav {
  height: 120px;
  width: 100vw;
  padding: 0 48px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: white;
}

.navbar {
  padding-top: 18px;
}
</style>
