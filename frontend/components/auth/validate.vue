<template>
  <div class="container">
    <h1>Bestätige Deine Email Adresse</h1>
    <p>Wir haben Dir eine Email geschickt. Bitte füge den Verifizierungs-Code hier ein:</p>

    <form method="POST" @submit.prevent="confirm" novalidate>
      <div class="form-group">
        <formInput :disabled="true" :id="'email'" :label="'E-Mail'" v-model="email" />
      </div>

      <div class="form-group">
        <formInput :id="'code'" :label="'Code'" v-model="code" />
      </div>

      <div v-if="email" class="link-wrapper">
        <a @click="resend" class="link">E-Mail kam nicht an?</a>
      </div>

      <!-- <span id="error" v-if="error">{{ error }}</span> -->
      <div class="buttons">
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Inject,
  Prop,
  State,
  Provide
} from "nuxt-property-decorator";
import { Validate } from "vuelidate-property-decorators";

import { required, email, sameAs } from "vuelidate/lib/validators";
import formInput from "@/components/forms/input.vue";

import { UserAddMutation, UserAddMutationVariables } from "@/apollo/schema";
import addUser from "@/apollo/mutations/add_user.gql";
import { IState } from "@/store";
import { formatMessage } from "./messages";
import { LoadingAnimation } from "../loadinganimation";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.AuthValidate,
  components: { formInput }
})
export default class extends Vue {
  @Provide("validation")
  validation() {
    return this.$v;
  }

  @Validate({ required, email })
  @State((s: IState) => s.register.user.email)
  email!: string;

  @State((s: IState) => s.register.user.password)
  password!: string;

  @Validate({ required })
  code: string = "";

  error: string = "";

  @LoadingAnimation
  async resend() {
    try {
      this.$track("authentication", "validate:resend");

      await this.$store.dispatch("auth/resendcode", {
        email: this.email
      });

      this.$swal.alert(
        "Das hat geklappt",
        "Du solltes eine E-Mail in Deinem Posteingang haben.",
        "success"
      );
    } catch (e) {
      console.error(e);
      this.$track("authentication", `validate:resend:failed${e.code}`);
      this.$swal.alert("Das hat nicht geklappt", formatMessage(e), "error");
    }
  }

  created() {
    this.$track("authentication", "validate:start");
  }

  @LoadingAnimation
  async confirm() {
    // stop here if form is invalid
    this.$v.$touch();
    this.$emit("validate");
    this.$track("authentication", `validate:ok`);

    if (this.$v.$invalid) {
      this.$track("authentication", `validate:ok:invalid`);
      return;
    }

    try {
      let user: any = {};
      await this.$store.dispatch("auth/confirm", {
        email: this.email,
        code: this.code.trim() // remove whitespace from copy&paste
      });

      // https://github.com/amazon-archives/amazon-cognito-identity-js/issues/186#issuecomment-335690410
      if (this.password) {
        user = await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password
        });
      } else {
        this.$emit("change-state", "login");
        return;
      }

      await this.$apollo.mutate<UserAddMutation, UserAddMutationVariables>({
        mutation: addUser,
        variables: {
          email: this.email,

          // they have been stored during the register procedure
          first: user.attributes.given_name,
          last: user.attributes.family_name
        }
      });

      this.$emit("change-state", "redirect");
    } catch (err) {
      console.error(err);
      this.$track("authentication", `validate:ok:failed:${err.code}`);

      this.error = formatMessage(err);
      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-single";
@import "@/assets/scales";

.link-wrapper {
  padding-top: 10px;
}

.container {
  .buttons {
    margin-top: $gridsize/2;
  }
}
</style>
