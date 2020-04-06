<template>
  <div class="container">
    <h1>Bestätige deine Email adresse</h1>
    <p>Wir haben dir eine Email geschickt. Bitte fügen Sie den verifizierungs Code hier ein</p>

    <form method="POST" @submit.prevent="confirm" novalidate>
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
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
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
        <label for="code">Code</label>
        <div v-if="submitted && $v.user.code.$error" class="invalid-feedback">
          <span v-if="!$v.user.code.required">Code is required</span>
        </div>
      </div>

      <div class="link-wrapper">
        <a @click="resend" class="link">E-Mail kam nicht an?</a>
      </div>

      <span id="error">{{ error }}</span>
      <div class="buttons">
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { Vue, Inject } from 'nuxt-property-decorator'
import { Validations } from "vuelidate-property-decorators";

import {
  GetTeamsQuery,
  GetTeamsQueryVariables,
  Company,
  Skill,
  Demand,
  Supply,
  UpdateSupplyMutation,
  UpdateSupplyMutationVariables,
  UpdateDemandMutation,
  UpdateDemandMutationVariables
} from "@/apollo/schema";

export default class extends Vue {
  components: Object = {};
  // @Inject("email") email?:String
  firstName: string = "";
  code: Number = 0;
  submitted: Boolean = false;
  error: String = "";

  user = {
    email: '',
    code: null
  }

  created(){
    // console.log("email  logged in created: ",this.email)
  }

  @Validations()
  rules() {
    return {
      firstName: { required },
      lastName: { required },
      email: { required, email },

      password: { required, minLength: minLength(6) },
      confirmpwd: { sameAs: sameAs("password") },

      agb: { required: sameAs(() => true) }
    };
  }

  async resend() {
    // this.$store.dispatch("auth/resendcode", this.user);
  };

  async confirm(){
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        // const user:Object
        let user = {};
        await this.$store.dispatch("auth/confirm", {
          email: this.user.email,
          code: this.user.code
        });

        // https://github.com/amazon-archives/amazon-cognito-identity-js/issues/186#issuecomment-335690410
        if (this.$store.state.register_state.user.password) {
          user = await this.$store.dispatch(
            "auth/login",
            this.$store.state.register_state.user
          );
        } else {
          this.$emit("change-state", "login");
          return;
        }

        await this.$apollo.mutate({
          mutation: addUser,
          variables: {
            email: this.user.email,

            // they have been stored during the register procedure
            first:user.attributes.given_name,
            last: user.attributes.family_name
          }
        });

        this.$emit("change-state", "redirect");
      } catch (err) {
        console.error("err: ", err);
        // if (err.code === "UsernameExistsException") {
        //   this.error =
        //     "Das hat leider nicht geklappt. Es scheint sich schon jemand mit derselben E-Mail Adresse registriert zu haben. Vielleicht kannst Du versuchen Dich anzumelden?";
        // } else if (err.code === "InvalidPasswordException") {
        //   this.error =
        //     "Das Passwort entspricht nicht den Komplexitätsanforderungen. Bitte gib mindestens 6 Zeichen bestehend aus Groß- und Kleinbuchstaben ein.";
        // } else {
        this.error = err.message;
        // }
      }
  };
  // methods: {
  //   async resend() {
  //     this.$store.dispatch("auth/resendcode", this.user);
  //   },

  //   async confirm() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     this.$v.$touch();
  //     if (this.$v.$invalid) {
  //       return;
  //     }

  //     try {
  //       let user;

  //       await this.$store.dispatch("auth/confirm", {
  //         email: this.user.email,
  //         code: this.user.code
  //       });

  //       // https://github.com/amazon-archives/amazon-cognito-identity-js/issues/186#issuecomment-335690410
  //       if (this.$store.state.register_state.user.password) {
  //         user = await this.$store.dispatch(
  //           "auth/login",
  //           this.$store.state.register_state.user
  //         );
  //       } else {
  //         this.$emit("change-state", "login");
  //         return;
  //       }

  //       await this.$apollo.mutate({
  //         mutation: addUser,
  //         variables: {
  //           email: this.user.email,

  //           // they have been stored during the register procedure
  //           first: user.attributes.given_name,
  //           last: user.attributes.family_name
  //         }
  //       });

  //       this.$emit("change-state", "redirect");
  //     } catch (err) {
  //       console.error("err: ", err);
  //       // if (err.code === "UsernameExistsException") {
  //       //   this.error =
  //       //     "Das hat leider nicht geklappt. Es scheint sich schon jemand mit derselben E-Mail Adresse registriert zu haben. Vielleicht kannst Du versuchen Dich anzumelden?";
  //       // } else if (err.code === "InvalidPasswordException") {
  //       //   this.error =
  //       //     "Das Passwort entspricht nicht den Komplexitätsanforderungen. Bitte gib mindestens 6 Zeichen bestehend aus Groß- und Kleinbuchstaben ein.";
  //       // } else {
  //       this.error = err.message;
  //       // }
  //     }
  //   }
  // }
}
</script>
