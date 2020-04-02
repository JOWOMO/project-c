<template>
  <div class="form-container">
    <h1>Neues Passwort vergeben</h1>

    <form method="POST" @submit.prevent="new_pwd" novalidate>
      <div class="form-group">
        <input
          type="email"
          v-model="user.email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.email.$error }"
          required
        />
        <label for="email">Email</label>

        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.email.user.required">Email is required</span>
          <span v-if="!$v.email.user.email">Email is invalid</span>
        </div>
      </div>

      <div class="form-group">
        <input
          type="text"
          v-model="user.code"
          id="code"
          name="code"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.code.$error }"
          required
        />
        <label for="email">Code</label>

        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
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

        <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
          <span v-if="!$v.user.password.required">Password is required</span>
          <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="user.confirmpwd"
          id="confirmPassword"
          name="confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.confirmpwd.$error }"
          required
        />
        <label for="confirmPassword">Confirm Password</label>

        <div v-if="submitted && $v.user.confirmpwd.$error" class="invalid-feedback">
          <span v-if="!$v.user.confirmpwd.required">Confirm Password is required</span>
          <span v-else-if="!$v.user.confirmpwd.sameAsPassword">Passwords must match</span>
        </div>
      </div>

      <span>{{ error }}</span>

      <div class="form-group buttonWrapper">
        <button class="secondary" @click.prevent="$router.push('/')">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        email: this.$store.state.register_state.user.email,
        code: "",
        password: "",
        confirmpwd: ""
      },
      submitted: false,
      error: ""
    };
  },

  validations: {
    user: {
      email: { required, email },
      code: { required },
      password: { required, minLength: minLength(6) },
      confirmpwd: { required, sameAsPassword: sameAs("password") }
    }
  },

  methods: {
    async new_pwd() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        await this.$store.dispatch(
          "auth/resetPassword", this.user,
        );

        this.$emit("change-state", "login");
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>