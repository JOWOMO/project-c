<template>
  <div>
    <h1>Willkommen zurück</h1>

    <div class="form-container">
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
            v-model="user.password"
            id="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.password.$error }"
            required
          />
          <label for="password">Password</label>
          <div v-if="submitted && $v.user.password.$error" class="invalid-feedback error">
            <span v-if="!$v.user.password.required">Passwort wird benötigt</span>
            <span v-if="!$v.user.password.minLength">Passwort muss wenigstens 6 Zeichen lang sein</span>
          </div>
        </div>

        <div class="link-wrapper">
          <a @click="resetPassword" class="link">Password vergessen?</a>
        </div>

        <div class="form-group buttonWrapper">
          <button class="secondary" @click.prevent="cancel">Zurück</button>
          <button class="primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
// const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      user: {
        email: this.$store.state.register_state.user.email,
        password: ""
      },
      false_auth: false,
      submitted: false
    };
  },

  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },

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
