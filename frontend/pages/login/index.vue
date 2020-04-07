<template>
  <auth @user-authenticated="userAuthenticated" />
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";

import auth from "@/components/auth/index.vue";

import { Check_StateQuery } from "@/apollo/schema";
import checkState from "@/apollo/queries/check_state.gql";

@Component({
  components: {
    auth
  },
  layout: 'login',
})
export default class extends Vue {
  @Meta
  head() {
    return {
      title: "Login",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "Willkommen zurück. Logge dich ein und suche nach matches." }
      ]
    };
  }

  async userAuthenticated() {
    const client = this.$apollo.getClient();

    // we need to find out where we stand
    const result = await this.$apollo.query<Check_StateQuery>({
      query: checkState
    });

    const me = result?.data?.me;
    if (me != null && me.companies != null) {
      if (me.companies.length > 0) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>