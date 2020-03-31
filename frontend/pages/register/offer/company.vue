<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <Company />
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar_login.vue";
import Company from "@/components/company-form.vue";

export default {
  head() {
    return {
      title: "Register - Company",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  layout: "register",
  components: {
    Sidebar,
    Company
  }
};
</script>

<style>
@media only screen and (max-width: 1115px) {
  .sidebar {
    display: none;
  }
}
</style>
