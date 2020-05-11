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

      <!-- <span id="error" v-if="error">{{ error }}</span> -->

      <div class="buttons">
        <button class="secondary" @click.prevent="back">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, State, Emit } from "nuxt-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

import { IState } from '@/store'
import formInput from "@/components/forms/input.vue";
import { formatMessage } from "./messages";
import { LoadingAnimation } from "../loadinganimation";

import { passwordComplexity} from '@/components/forms/passwordComplexity';

@Component({
  components: { formInput }
})
export default class extends Vue {
  @State((s: IState) => s.register.user.email)
  existingEMail?: string;

  @Validate({ required, email })
  email: string = "";

  @Validate({ required })
  code: string = "";

  @Validate({ required, passwordComplexity })
  password: string = "";

  @Validate({ sameAs: sameAs("password") })
  confirmpwd: string = "";

  error = "";

  @Provide("validation")
  validation() {
    return this.$v;
  }

  mounted() {
    this.email = this.existingEMail || '';
    this.$track('authentication', 'change:start');
  }

  @Emit('change-state')
  back() {
    this.$track('authentication', 'change:back');
    return 'reset';
  }

  @LoadingAnimation
  async resetPassword() {
    this.$v.$touch();
    this.$emit("validate");
    this.$track('authentication', 'change:ok');

    if (this.$v.$invalid) {
      this.$track('authentication', 'change:ok:invalid');
      return;
    }

    try {
      const user = {
        email: this.email,
        password: this.password,
        code: this.code,
      };

      this.$store.commit('register/user', user);
      const loginSucceeded = await this.$store.dispatch("auth/resetPassword", user);

      if (loginSucceeded) {
        this.$emit("change-state", "redirect");
      } else {
        this.$emit("change-state", "login");
      }
    } catch (err) {
      console.error(err);
      this.error = formatMessage(err);
      this.$track('authentication', `change:failed:${err.code}`);

      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/form-layout-single';
</style>
