<template>
  <nav>
    <nuxt-link to="/">
      <img src="/images/logo.svg" alt="Logo" class="logo" />
    </nuxt-link>

    <div class="right">
      <div class="links">
        <nuxt-link to="/dashboard" class="link" :class="{ active: search }">Meine Suchergebnisse</nuxt-link>
        <nuxt-link to="/info" class="link" :class="{ active: faq }">FAQ</nuxt-link>
      </div>

      <avatar v-if="this.$store.state.auth.user" />

      <div class="links">
        <nuxt-link to="/dashboard" class="link" :class="{active: search}">Meine Suchergebnisse</nuxt-link>
        <nuxt-link to="/info" class="link" :class="{active: faq}">FAQ</nuxt-link>
      </div>

      <div v-if="!$store.state.auth.isAuthenticated" class="login">
        <button class="primary" @click="$router.push('/login')">Login</button>
      </div>

      <div v-else class="profile" @click="active = !active">
        <div class="nameImg">
          <span>{{ title }}</span>
          <!-- TODO: Add img from database -->
          <img src="/images/profile.jpg" alt class="profile_img" />
        </div>
        <div class="dropdown" :class="{expanded: active}">
          <div class="options">
            <button @click="new_password">Passwort ändern</button>
            <button class="red" @click="warning = !warning">Benutzer löschen</button>
          </div>
          <button class="blue" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import me from "@/apollo/queries/user";
import avatar from '@/components/avatar'

export default {
  name: "Navbar",

  props: {
    auth: Boolean,
    dashboard: Boolean
  },

  components: {
    avatar
  },

  data() {
    return {
      login: false,
      title: "",
      active: false,
      search: false,
      faq: false,
    };
  },

  async created() {
    if (this.$store.state.auth.user) {
      console.log("user is empty");
      try {
        // we need to find out where we stand
        const result = await this.$apollo.query({
          query: me
        });
        console.log("me", result);
        this.$store.commit("updateUser", result.data.me);
        console.log(result.data);
        this.title = result.data.me.name || result.data.me.email;
      } catch (e) {
        console.error(e);
        this.title = `${this.$store.state.auth.user.attributes.given_name} ${this.$store.state.auth.user.attributes.family_name}`;
      }
    }
    if(this.$route.path == '/dashboard') {
      this.search = true
      this.faq = false
    } else if (this.$route.path == '/info') {
      this.search = false
      this.faq = true
    } else {
      this.search = false
      this. faq = false
    }
  },
  methods: {
    print: function() {
      console.log(this.isAuthenticated);
    },

    logout: function() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    async deleteUser() {
      this.$store.dispatch("auth/delete");
      this.$router.push("/");
    },
    async new_password() {
      // add password reset page
    }
  },

  created() {
    if(this.$route.path == '/dashboard') {
      this.search = true
      this.faq = false
    } else if (this.$route.path == '/info') {
      this.faq = true
      this.search = false
    } else {
      this.search = false
      this.faq = false
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
@import '@/assets/colors';

nav {
  width: 100vw;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  background-color: #FFFFFF;

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
  .profile,
  .links {
    display: inline-block;
  }

  .links {
    margin-right: 20px;

    .link {
      display: inline-block;
      color: $textcolor;
      margin: 5px;
      font-size: 18px;
      height: 40px;

      &.active {
        border-bottom: 4px solid $primary;
      }
    }
  }


    .profile {
      align-self: flex-start;
      margin-top: 15px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: auto;

      .nameImg {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        span {
          margin-right: 20px;
          font-weight: bold;
        }
      }

      .dropdown {
        margin-top: 10px;
        background: #fff;
        border-radius: 8px;
        border: 2px solid #00000010;
        z-index: 5;
        padding: 10px;
        display: none;
        // width: 200px;

        &.expanded {
          display: inline-block;
        }

        .red:hover {
          background: #EE0000;
          color: #fff;
        }
        .blue {
          background: #25A6DA;
          color: #fff;
          width: 100%;
        }
      }
    }
  }

  .login {
    .link {
      font-size: 18px !important;
    }
  }
}


@media only screen and (max-width: 765px) {
  .logo {
    width: 60%;
  }
}
</style>
