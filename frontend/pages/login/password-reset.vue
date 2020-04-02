<template>
  <div class="container">
    <h1>Setzte dein Password zurück</h1>

    <form method="POST" @submit.prevent="reset_password">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.email.$error }"
        />
        <div v-if="submitted && $v.email.$error" class="invalid-feedback">
          <span v-if="!$v.email.required">Email is required</span>
          <span v-if="!$v.email.email">Email is invalid</span>
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
import { required, email } from "vuelidate/lib/validators";

export default {
  layout: "register",
  data() {
    return {
      email: "",
      submitted: false,
      error: ""
    };
  },
  validations: {
    email: { required, email }
  },
  methods: {
    async reset_password() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const username = this.email;
      console.log("reset password");

      await Auth.forgotPassword(username)
        .then(data => {
          // redirect to new-password
          this.$router.push("new-password");
        })
        .catch(err => {
          this.error = err.message;
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
