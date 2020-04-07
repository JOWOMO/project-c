<template>
  <div class="container">
    <h1>Bitte melde Dich an</h1>
    <form method="POST" @submit.prevent="login" novalidate>
      <div class="form-group">
        <formInput :id="'email'" :label="'E-Mail'" v-model="email" />
      </div>

      <div class="form-group">
        <formInput :id="'password'" :label="'Passwort'" v-model="password" :type="'password'" />
      </div>

      <div class="link-wrapper">
        <a @click="resetPassword" class="link">Passwort vergessen?</a>
      </div>

      <span id="error">{{error}}</span>

      <div class="buttons">
        <button class="primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "nuxt-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";

import formInput from "@/components/forms/input.vue";

@Component({
  components: { formInput },
})
export default class extends Vue {
  @Validate({ required, email })
  email: string = "";

  @Validate({ required })
  password: string = "";

  @Provide("validation")
  validation() {
    return this.$v;
  }

  error = "";

  cancel() {
    this.$emit("change-state", "back");
  }

  resetPassword() {
    this.$emit("change-state", "reset");
  }

  async login() {
    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      return;
    }

    try {
      const user = {
        email: this.email,
        password: this.password,
      };

      // we need to clone the object
      this.$store.commit("register/user", user);

      await this.$store.dispatch("auth/login", user);
      this.$emit("change-state", "redirect");
    } catch (err) {
      console.log("err: ", err);
      this.error = err.message;

      // we need to verify him
      if (err.code === "UserNotConfirmedException") {
        this.$emit("change-state", "validate");
      }
    }
  }
}
</script>
