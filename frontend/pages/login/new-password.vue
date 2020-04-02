<template>
  <div class="container">
    <h1>Neues Password</h1>

    <form method="POST" @submit.prevent="new_pwd">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="user.email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.email.$error }"
        />
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.email.user.required">Email is required</span>
          <span v-if="!$v.email.user.email">Email is invalid</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Code</label>
        <input
          type="text"
          v-model="user.code"
          id="code"
          name="code"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.code.$error }"
        />
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="user.pwd"
          id="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.pwd.$error }"
        />
        <div v-if="submitted && $v.user.pwd.$error" class="invalid-feedback">
          <span v-if="!$v.user.pwd.required">Password is required</span>
          <span v-if="!$v.user.pwd.minLength">Password must be at least 6 characters</span>
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="user.confirmpwd"
          id="confirmPassword"
          name="confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.confirmpwd.$error }"
        />
        <div v-if="submitted && $v.user.confirmpwd.$error" class="invalid-feedback">
          <span v-if="!$v.user.confirmpwd.required">Confirm Password is required</span>
          <span v-else-if="!$v.user.confirmpwd.sameAsPassword">Passwords must match</span>
        </div>
      </div>
      <span>{{ error }}</span>
      <div class="form-group">
        <button @click.prevent="$router.push('/')">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  layout: "register",
  data() {
    return {
      user: {
        email: "",
        code: "",
        pwd: "",
        confirmpwd: ""
      },
      submitted: false,
      error: ""
    };
  },
  validations: {
    user: {
      email: { required, email },
      pwd: { required, minLength: minLength(6) },
      confirmpwd: { required, sameAsPassword: sameAs("pwd") }
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
      const username = this.user.email,
        code = this.user.code,
        new_password = this.user.pwd;

      console.log(this.user.email);

      await Auth.forgotPasswordSubmit(username, code, new_password)
        .then(data => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
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

      input,
      label,
      .error {
        width: 100%;
      }
    }
  }
}
</style>
