<template>
  <nav>
    <nuxt-link to="/">
      <img src="/images/logo.svg" alt="Logo" class="logo" />
    </nuxt-link>

    <div v-if="!$store.state.auth.isAuthenticated" class="links">
      <nuxt-link to="/faq" class="link">FAQ</nuxt-link>
      <button class="primary" @click="$router.push('/login')">Login</button>
    </div>

    <div v-else class="profile">
      <span>{{ title }}</span>
      <!-- TODO: Add img from database -->
      <img v-on:click="logout" src="/images/profile.jpg" alt class="profile_img" />
    </div>
  </nav>
</template>

<script>
import me from "@/apollo/queries/user";

export default {
  name: "Navbar",

  props: {
    auth: Boolean
  },

  data() {
    return {
      login: false,
      title: ""
    };
  },

  async created() {
    if (this.$store.state.auth.user) {
      console.log("user is empty")
      try {
        // we need to find out where we stand
        const result = await this.$apollo.query({
          query: me
        });
        this.$store.commit('updateUser',result.data.me)
        console.log(result.data);
        this.title = result.data.me.name || result.data.me.email;
      } catch (e) {
        console.error(e);
        this.title = `${this.$store.state.auth.user.attributes.given_name} ${this.$store.state.auth.user.attributes.family_name}`
      }
    }
  },

  methods: {
    print: function() {
      console.log(this.isAuthenticated);
    },

    logout: function() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
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
  width: 100vw;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  .profile, .links {
    display: inline-block;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .links {
    .link {
      margin-right: 20px;
    }
  }
}

@media only screen and (max-width: 765px) {
  .logo {
    display: none;
  }

  .profile {
    span {
      display: none;
    }
  }
}
</style>
