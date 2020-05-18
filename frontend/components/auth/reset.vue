<template>
  <div class="container">
    <h1>Setze Dein Password zurück</h1>

    <form method="POST" @submit.prevent="resetPassword" novalidate>
      <div class="form-group">
        <formInput :id="'email'" :label="'E-Mail'" v-model="email" />
      </div>

      <!-- <span id="error" v-if="error">{{ error }}</span> -->

      <div class="buttons">
        <button class="secondary" @click.prevent="back">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Emit, Component, Provide, State } from "nuxt-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import { required, email, sameAs } from "vuelidate/lib/validators";

import formInput from "@/components/forms/input.vue";
import { IState } from "@/store";
import { formatMessage } from "./messages";
import { LoadingAnimation } from "../loadinganimation";

@Component({
  components: { formInput }
})
export default class extends Vue {
  @Validate({ required, email })
  email: string = "";

  error = "";

  @Provide("validation")
  validation() {
    return this.$v;
  }

  @Emit("change-state")
  back() {
    return "login";
  }

  mounted() {
    this.$track("authentication", "reset:start");
    this.email = (this.$store.state as IState).register.user.email || "";
  }

  @LoadingAnimation
  async resetPassword() {
    // stop here if form is invalid
    this.$v.$touch();
    this.$emit("validate");
    this.$track("authentication", "reset:ok");

    if (this.$v.$invalid) {
      this.$track("authentication", "reset:ok:invalid");
      return;
    }

    try {
      await this.$store.dispatch("auth/startResetPassword", {
        email: this.email
      });

      this.$store.commit("register/user", { email: this.email });
      this.$emit("change-state", "new");
    } catch (err) {
      console.error(err);
      this.error = formatMessage(err);
      this.$track("authentication", `reset:failed:${err.code}`);

      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-single";
</style>
