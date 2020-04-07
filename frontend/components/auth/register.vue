<template>
  <div class="container">
    <h1>Persönliche Daten</h1>
    <p>Wir benötigen ein paar Informationen, um loszulegen</p>

    <form method="POST" @submit.prevent="register" novalidate>
      <div class="form-group half-width">
        <formInput :id="'firstName'" :label="'Vorname'" v-model="firstName" />
      </div>

      <div class="form-group half-width right">
        <formInput :id="'lastName'" :label="'Nachname'" v-model="lastName" />
      </div>

      <div class="form-group">
        <formInput :id="'email'" :label="'E-Mail'" v-model="email" />
      </div>

      <div v-if="!userExists" class="form-group half-width">
        <formInput :id="'password'" :label="'Passwort'" v-model="password" :type="'password'" />
      </div>

      <div v-if="!userExists" class="form-group half-width right">
        <formInput
          :id="'confirmpwd'"
          :label="'Passwort bestätigen'"
          v-model="confirmpwd"
          :type="'password'"
        />
      </div>

      <div v-if="!userExists" class="form-group">
        <formCheckbox :id="'agb'" :label="'Bitte akzeptiere unsere AGB'" v-model="agb">
          <template>
            Bitte Akzeptiere unsere
            <nuxt-link to="/agb">AGB</nuxt-link>um fortzufahren
          </template>
        </formCheckbox>
      </div>
    </form>

    <!-- <span id="error" v-if="error">{{ error }}</span> -->

    <div class="buttons">
      <button class="secondary" @click.prevent="back">Zurück</button>
      <button class="primary" @click.prevent="register">Weiter</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, State, Provide } from "nuxt-property-decorator";

import { Validations } from "vuelidate-property-decorators";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

import { CognitoUser } from "@aws-amplify/auth";

import { RegistrationUserQuery } from "@/apollo/schema";
import userQuery from "@/apollo/queries/registration/user.gql";

import { UserAddMutation, UserAddMutationVariables } from "@/apollo/schema";
import addUser from "@/apollo/mutations/add_user.gql";

import formInput from "@/components/forms/input.vue";
import formCheckbox from "@/components/forms/checkbox.vue";
import { formatMessage } from "./messages";

@Component({
  components: { formInput, formCheckbox }
})
export default class extends Vue {
  userExists = false;

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmpwd: string = "";
  agb: boolean = false;

  @State(state => state.auth.user)
  authenticatedUser?: CognitoUser;

  @Provide("validation")
  validation() {
    return this.$v;
  }

  error = "";

  back() {
    this.$emit("change-state", "back");
  }

  @Validations()
  rules() {
    if (this.userExists) {
      return {
        firstName: { required },
        lastName: { required },
        email: { required, email }
      };
    }

    return {
      firstName: { required },
      lastName: { required },
      email: { required, email },

      password: { required, minLength: minLength(6) },
      confirmpwd: { sameAs: sameAs("password") },

      agb: { required: sameAs(() => true) }
    };
  }

  async mounted() {
    console.log("created");

    if (this.authenticatedUser) {
      const result = await this.$apollo.query<RegistrationUserQuery>({
        query: userQuery
      });

      if (result.data && result.data.me) {
        const me = result.data.me;

        this.userExists = true;
        this.firstName = me.firstName;
        this.lastName = me.lastName;
        this.email = me.email;
      }
    }
  }

  async createUser() {
    console.debug("createUser");

    this.$store.commit("register/user", {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    });

    try {
      const user = await this.$store.dispatch("auth/register", {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });

      this.$emit("change-state", "register-validate");
    } catch (err) {
      console.log("err: ", err);
      this.error = formatMessage(err);
      this.$swal("Das hat nicht geklappt", this.error, "error");
    }
  }

  async updateUser() {
    console.debug("updateUser");

    try {
      const result = await this.$apollo.mutate<
        UserAddMutation,
        UserAddMutationVariables
      >({
        mutation: addUser,
        variables: {
          first: this.firstName,
          last: this.lastName,
          email: this.email
        }
      });

      this.$emit("change-state", "redirect");
    } catch (err) {
      console.error(err);
      this.error = err.message;
      this.$swal("Das hat nicht geklappt", this.error, "error");
    }
  }

  register() {
    console.log("register");

    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      console.debug("invalid form", this.$v);
      return;
    }

    if (!this.userExists) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-two";
</style>
