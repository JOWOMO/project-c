<template>
  <div class="navbar">
    <nav>
      <nuxt-link to="/"><img src="/images/logo.svg" alt="Logo" class="logo"></nuxt-link>

      <div v-if="!$store.state.auth.isAuthenticated" class="links">
        <nuxt-link to="/faq" class="link">FAQ</nuxt-link>
        <button class="primary" @click="$router.push('/login')">Login</button>
      </div>

      <div v-else class="profile">
        <span>Maike</span> <!-- TODO: Add user name -->
        <img src="/images/profile.jpg" alt="" class="profile_img"> <!-- TODO: Add img from database -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    auth: Boolean
  },
  data() {
    return {
      login: false,
      lol: false
      // isAuthenticated: false
    };
  },
  methods: {
    print: function() {
      console.log(this.isAuthenticated);
    },
    logout: function() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  },
  computed: {
    isAuthenticated() {
      // console.log(this.$store.state.auth.isAuthenticated);
      return this.$store.state.auth.isAuthenticated;
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 80px;
  padding: 0 20px;

  .link {
    margin-right: 20px;
    font-weight: normal;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      font-weight: bold;
      margin-right: 20px;
    }
  }
}

@media only screen and (max-width: 786px) {
  nav {
    background: none;

    .logo {
      display: none;
    }
  }
}
</style>
