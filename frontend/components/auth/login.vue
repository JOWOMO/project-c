<template>
  <div class="container">
    <h1>Bitte melde Dich an</h1>
    <form method="POST" @submit.prevent="login" novalidate>
      <div class="form-group">
        <formInput :id="'email'" :label="'E-Mail'" v-model="email" />
      </div>

      <div class="form-group">
        <formInput @keydown.native.enter="login" :id="'password'" :label="'Passwort'" v-model="password" :type="'password'" />
      </div>

      <div class="form-group">
        <div class="link-wrapper">
          <a @click="create" class="link">Neues Konto erstellen?</a>
          <a @click="resetPassword" class="link">Passwort vergessen?</a>
        </div>
      </div>

      <!-- <span id="error">{{error}}</span> -->

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
import { AuthErrorCodes, formatMessage } from "./messages";
import { LoadingAnimation } from "../loadinganimation";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.AuthLogin,
  components: { formInput }
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
    this.$track("authentication", "login:cancel");
    this.$emit("change-state", "back");
  }

  resetPassword() {
    this.$track("authentication", "login:resetpassword");
    this.$emit("change-state", "reset");
  }

  create() {
    this.$track("authentication", "login:register");

    this.$swal.alert(
      "Schön, dass Du bei uns bist!",
      "Wir haben Dich zur Startseite umgeleitet. Bitte entscheide Dich hier für 'Ich biete Mitarbeiter:innen' oder 'Ich suche Mitarbeiter:innen'. Wir führen Dich dann durch die Registrierung.",
      "info"
    );

    this.$router.replace('/');
  }

  created() {
    this.$track("authentication", "login:start");
  }

  @LoadingAnimation
  async login() {
    this.$v.$touch();
    this.$emit("validate");
    this.$track("authentication", "login:ok");

    if (this.$v.$invalid) {
      this.$track("authentication", "login:ok:invalid");
      return;
    }

    try {
      const user = {
        email: this.email,
        password: this.password
      };

      // we need to clone the object
      this.$store.commit("register/user", user);

      await this.$store.dispatch("auth/login", user);
      this.$emit("change-state", "redirect");
    } catch (err) {
      console.error(err);
      this.error = formatMessage(err);
      this.$track("authentication", `login:failed:${err.code}`);

      // we need to verify him
      if (err.code === AuthErrorCodes.NotConfirmed) {
        this.$emit("change-state", "validate");
        return;
      }

      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-single";

.link-wrapper {
  justify-content: space-between;
  display: flex;
  flex: 1;
}
</style>
