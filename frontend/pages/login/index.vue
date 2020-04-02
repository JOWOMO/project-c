<template>
  <div class="container">
    <auth 
        v-bind:start_component="'login'" 
        v-bind:target_route="'/dashboard'" 
        class="flow"
    />
  </div>
</template>

<script>
import auth from "@/components/auth";

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

  layout: "no-auth",

  components: {
    auth
  }
};
</script>


<style scoped lang="scss">
.container {
    grid-template-columns: 0fr 1fr;
    padding: 50px 20px;


  .flow {
      width: 100%;
  }
}

// @media only screen and (max-width: 950px) {
//   .container {
//     grid-template-columns: 0fr 1fr;
//     // width: 100vw;
//     padding: 50px 20px;

//     // .sidebar {
//     //   display: none;
//     // }

//     .flow {
//       width: 100%;
//     }
//   }
// }
</style>
