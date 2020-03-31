<template>
  <div class="container">
    <sidebarLogin class="sidebar" />
    <h1>Persönliche Daten</h1>
    <p>Wir benötigen ein paar Informationen, um loszulegen</p>
    <profile class="profile-form" />
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import sidebarLogin from "@/components/sidebar_login.vue";
import profile from "@/components/user-form.vue";
// import Checkmark from '@/components/checkmark.vue'

export default {
  head() {
    return {
      title: "Register - User",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  layout: "register",
  components: {
    sidebarLogin,
    profile
    // Checkmark
  }
};
</script>

<style scoped lang="scss">
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

.profile-form {
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

    .profile-form {
      width: 100%;
      left: 0;
    }
  }
}
</style>

