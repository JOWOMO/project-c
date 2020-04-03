<template>
  <div class="container">
    <h1>Willkommen zurück</h1>
    <form method="POST" @submit.prevent="login" novalidate>
      <span class="invalid-login" v-if="false_auth">Email oder Passwort inkorrekt</span>
      <div class="form-group">
        <input
          type="text"
          v-model="user.email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.email.$error }"
          required
        />
        <label for="email">Email</label>
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback error">
          <span v-if="!$v.user.email.required">Email wird benötigt</span>
          <span v-if="!$v.user.email.email">Keine gültige Email</span>
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="user.pwd"
          id="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.pwd.$error }"
          required
        />
        <label for="password">Password</label>
        <div v-if="submitted && $v.user.pwd.$error" class="invalid-feedback error">
          <span v-if="!$v.user.pwd.required">Passwort wird benötigt</span>
          <span v-if="!$v.user.pwd.minLength">Passwort muss wenigstens 6 Zeichen lang sein</span>
        </div>
      </div>

      <div class="link-wrapper">
        <nuxt-link to="/login/password-reset" class="link">Password vergessen?</nuxt-link>
      </div>

      <div class="form-group buttonWrapper">
        <button class="primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
// const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  layout: "register",
  head() {
    return {
      title: "Login",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  // layout: 'register',
  data() {
    return {
      user: {
        email: "",
        pwd: ""
      },
      false_auth: false,
      submitted: false
    };
  },
  validations: {
    user: {
      email: { required, email },
      pwd: { required, minLength: minLength(6) }
    }
  },
  created() {},

  methods: {
    async login() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        const user = await this.$store.dispatch("auth/login", {
          userdata: this.user
        });

        const route = this.$route.query.return_url;
        if (route == "" || route == null) {
          console.log('No return_url going to dashboard');
          this.$router.push("/dashboard");
        } else {
          this.$router.push(route);
        }
      } catch (err) {
        this.false_auth = true;
        console.log("Email or Passwort incorrect", err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 1fr 5fr;

  h1 {
    margin: 50px 0 0 0;
  }

  .form-group {
    margin: 30px 0 30px 0;
  }
}

@media only screen and (max-width: 765px) {
  .container {
    justify-content: center;
    grid-template-rows: auto 1fr;
    grid-template-columns: 80vw;

    h1 {
      margin: 50px 0 0 0;
    }

    .form-group {
      width: 80vw;

      input, label, .error {
        width: 100%;
      }
    }

  }
}
</style>
