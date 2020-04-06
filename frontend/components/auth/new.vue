<template>
  <div class="container">
    <h1>Neues Passwort vergeben</h1>

    <form method="POST" @submit.prevent="resetPassword" novalidate>
      <div class="form-group">
        <formInput :id="'email'" :label="'E-Mail'" v-model="email" />
      </div>

      <div class="form-group">
        <formInput :id="'code'" :label="'Code'" v-model="code" />
      </div>

      <div class="form-group">
        <formInput :id="'password'" :label="'Passwort'" v-model="password" :type="'password'" />
      </div>

      <div class="form-group">
        <formInput :id="'confirmpwd'" :label="'Passwort bestätigen'" v-model="confirmpwd" :type="'password'" />
      </div>

      <span id="error" v-if="error">{{ error }}</span>

      <div class="buttons">
        <button class="secondary" @click.prevent="$router.push('/')">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from "nuxt-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

import formInput from "@/components/forms/input.vue";

@Component({
  components: { formInput }
})
export default class extends Vue {
  @Validate({ required, email })
  email: string = "";

  @Validate({ required })
  code: string = "";

  @Validate({ required, minLength: minLength(6) })
  password: string = "";

  @Validate({ sameAs: sameAs("password") })
  confirmpwd: string = "";

  error = "";

  @Provide("validation")
  validation() {
    return this.$v;
  }

  async resetPassword() {
    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      return;
    }

    try {
      const user = {
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("auth/resetPassword", user);

      this.$emit("change-state", "login");
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>

