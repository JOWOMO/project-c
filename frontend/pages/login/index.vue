<template>
  <auth @user-authenticated="userAuthenticated" />
</template>

<script lang="ts">
import { Component, Vue, State } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";

import auth from "@/components/auth/index.vue";

import { Check_StateQuery } from "@/apollo/schema";
import checkState from "@/apollo/queries/check_state.gql";
import { IState } from "@/store";

@Component({
  components: {
    auth
  },
  layout: 'login',
})
export default class extends Vue {
  @State((s: IState) => s.auth.user)
  user!: any;

  @Meta
  head() {
    return {};
  }

  async userAuthenticated() {
    const client = this.$apollo.getClient();

    // we need to find out where we stand
    const result = await this.$apollo.query<Check_StateQuery>({
      query: checkState,
      fetchPolicy: 'network-only',
    });

    const me = result?.data?.me;
    if (me != null && me.companies != null) {
      if (me.companies.length > 0) {
        this.$router.push("/dashboard");
      } else {
        const profile = this.user?.attributes?.profile;

        if (profile) {
          this.$router.push(`/register/${this.user?.attributes?.profile}`);
        } else {
          this.$router.push("/");
        }
      }
    } else {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
