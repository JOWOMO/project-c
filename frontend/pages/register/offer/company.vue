<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <h1>Dein Unternehmen</h1>
    <p>Erzähle uns mehr über dein Unternehmen</p>
    <Company class="company-form" />
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

<style lang="scss" scoped>
h1 {
  position: relative;
  text-align: left;
  width: auto;
  left: 450px;
  top: 70px;
  transform: none;
}

p {
  position: relative;
  left: 450px;
  top: 70px;
  color: #00000080;
}

.company-form {
  width: calc(100% - 400px);
  position: absolute;
  right: 0;
  top: 250px;
}

@media only screen and (max-width: 1000px) {
  .container {
    padding: 20px 10px;

    .sidebar {
      display: none;
      z-index: 0;
    }

    h1, p {
      width: 100%;
      text-align: center;
      left: 0;
      transform: none;
    }

    .company-form {
      width: 100%;
      left: 0;
    }
  }
}
</style>
