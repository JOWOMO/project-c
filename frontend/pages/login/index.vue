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
<<<<<<< HEAD


<style scoped lang="scss">
.container {
  grid-template-columns: 0fr 1fr;
  padding: 50px 20px;

  .flow {
    width: 100%;
  }
}

@media only screen and (max-width: 950px) {
  .container {
    grid-template-columns: 0fr 1fr;
    // width: 100vw;
    padding: 50px 20px;

    // .sidebar {
    //   display: none;
    // }

    .flow {
      width: 100%;
    }
  }
}
</style>
=======
>>>>>>> 43392a3f7b03ec91635b234258ff4dc48bbd49c7
