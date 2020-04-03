<template>
  <div class="container">
    <h1>Willkommen zurück</h1>
    <form method="POST" @submit.prevent="login" novalidate>
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
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
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
        <div v-if="submitted && $v.user.pwd.$error" class="invalid-feedback">
          <span v-if="!$v.user.pwd.required">Passwort wird benötigt</span>
          <span v-if="!$v.user.pwd.minLength">Passwort muss wenigstens 6 Zeichen lang sein</span>
        </div>
      </div>

      <div class="link-wrapper">
        <a @click="resetPassword" class="link">Password vergessen?</a>
      </div>

      <span id="error">{{error}}</span>

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
      submitted: false,
      error: ''
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
    cancel() {
      this.$emit("change-state", "back");
    },
    resetPassword() {
      this.$emit("change-state", "reset");
    },
    async login() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        // we need to clone the object
        this.$store.commit("register_user_state", { ...this.user });
        const user = await this.$store.dispatch("auth/login", this.user);
        this.$emit("change-state", "redirect");
      } catch (err) {
        console.log("err: ", err);
        this.error = err.message
        // we need to verify him
        if (err.code === "UserNotConfirmedException") {
          this.$emit("change-state", "validate");
        }
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
  grid-template-rows: 1fr 3fr;

  h1 {
    margin: 50px 0 0 0;
  }

  #error {
    margin-top: 20px;
    grid-column: 2;
    grid-row: 5;
  }

  .buttons {
    grid-column: 1;
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

    #error {
      grid-column: 1;
      grid-row: 4;
      text-align: center;
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
