<template>
  <div>
     <auth v-bind:start_component="'login'" @user-authenticated="userAuthenticated" />
  </div>
</template>

<script>
import auth from "@/components/auth";
import checkState from "@/apollo/queries/check_state";

export default {
  head() {
    return {
      title: "Login",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  methods: {
    async userAuthenticated() {
      const client = this.$apollo.getClient();

      // we need to find out where we stand
      const result = await this.$apollo.query({
        query: checkState
      });

      console.log(result)

      if (result && result.data && result.data.me) {
        const me = result.data.me;

        if (me.companies.length === 0) {
          // need to onboard for demand
          this.$router.push(value || this.target_route || "/");
        } else {
          this.$router.push("/dashboard");
        }
      } else {
        this.$router.push("/");
      }
    }
  },
  layout: "no-auth",
  components: {
    auth
  }
};
</script>
