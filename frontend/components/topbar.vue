<template>
  <div class="nav">
    <div class="burger">
      <burger>
        <navbar v-if="!authenticated" :horizontal="false" />
        <authenticated v-else :horizontal="false" :name="name" />
      </burger>
    </div>

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
import burger from "@/components/menu/burger.vue";

@Component({
  components: {
    navbar,
    authenticated,
    burger
  }
})
export default class extends Vue {
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

.burger {
  display: none;
}

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

@media only screen and (max-width: 850px) {
  .burger {
    display: block;
  }

  .nav {
    justify-content: center;
    padding: 0 20px;
  }

  .navbar {
    display: none;
  }

  .logo {
    display: flex;
    flex: 1;
    justify-content: center;
  }
}
</style>
