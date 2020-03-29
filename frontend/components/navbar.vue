<template>
  <div class="b2b-container">
    <nav>
      <span>Logo</span>
      <button v-if="!isAuthenticated" @click="$router.push('/login')">Login</button>
      <button v-else @click="logout">Logout</button>
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
  width: 100vw;
  height: 80px;

  span {
    margin-left: 20px;
  }

  button {
    margin: 0 20px 0 auto;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    background: deepskyblue;
    color: #fff;
    display: inline-block;
    border: none;
    outline: none;

    &:hover {
      border: 1px solid deepskyblue;
      background: #fff;
      color: deepskyblue;
    }
  }
}

@media only screen and (max-width: 786px) {
  nav {
    background: none;
  }
}
</style>
