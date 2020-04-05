<template>
  <nav>
    <nuxt-link to="/">
      <img src="/images/logo.svg" alt="Logo" class="logo" />
    </nuxt-link>

    <div v-if="!$store.state.auth.isAuthenticated" class="links">
      <nuxt-link to="/faq" class="link">FAQ</nuxt-link>
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

    <div class="warning" :class="{expanded: warning}">
      <h2>Möchtest du deinen Account Löschen?</h2>
      <p>Alle Daten werden gelöscht</p>
      <button @click="warning = !warning">Abbrechen</button>
      <button class="red" @click="deleteUser">Löschen</button>
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
      title: "",
      active: false,
      warning: false
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
        console.log("me",result)
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
    },
    async deleteUser() {
      this.$store.dispatch('auth/delete')
      this.$router.push("/");
    },
    async new_password() {
      // add password reset page
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

  .links {
    .link {
      margin-right: 20px;
    }
  }

  .warning {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 800px;
    max-height: 500px;
    border-radius: 8px;
    border: 2px solid #00000010;
    background: #fff;
    padding: 20px;
    z-index: 10;
    text-align: center;
    display: none;

    &.expanded {
      display: block;
    }

    .red {
      background: #EE0000;
      color: #fff;
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
