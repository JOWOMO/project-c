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

@Component({
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
    this.$emit("change-state", "back");
  }

  resetPassword() {
    this.$emit("change-state", "reset");
  }

  create() {
    this.$swal.alert(
      "Schön, dass Du bei uns bist!",
      "Wir haben Dich zur Startseite umgeleitet. Bitte entscheide Dich hier für 'Ich biete Mitarbeiter:innen' oder 'Ich suche Mitarbeiter:innen'. Wir führen Dich dann durch die Registrierung.",
      "info"
    );

    this.$router.replace('/');
  }

  @LoadingAnimation
  async login() {
    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      return;
    }

    this.$track("authentication", "login");

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
      console.log("err: ", err);
      this.error = formatMessage(err);

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
