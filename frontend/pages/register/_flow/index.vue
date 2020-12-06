<template>
  <div class="container">
    <h1>{{ $t('register.' + $route.params.flow + '.person.title') }}</h1>
    <p>{{ $t('register.' + $route.params.flow + '.person.subtitle') }}</p>

    <form method="POST" @submit.prevent="register" novalidate>
      <div class="form-group half-width">
        <formInput :id="'firstName'" :label="'Vorname'" v-model="firstName" />
      </div>

      <div class="form-group half-width right">
        <formInput :id="'lastName'" :label="'Nachname'" v-model="lastName" />
      </div>

      <div class="form-group">
        <formInput :disabled="userExists" :id="'email'" :label="'E-Mail'" v-model="email" />
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
            Ja, ich habe die
            <a href="/info/agb" target="_blank" title="Nutzungsbedingungen in neuem Tab öffnen">Nutzungsbedingungen</a> und die
            <a href="/info/privacy" target="_blank" title="Datenschutzerklärung in neuem Tab öffnen">Datenschutzerklärung</a> gelesen und akzeptiert.
          </template>
        </formCheckbox>
      </div>
      <div v-if="!userExists" class="form-group">
        <formCheckbox :id="'nota'" :label="'Bitte bestätige das Du keine Zeitarbeitsfirma vetrittst'" v-model="nota">
          <template>
            Ich bestätige, dass ich mich nicht für, oder im Auftrag einer Zeitarbeitsfirma registriere. <a href="/info/faq" target="_blank" title="FAQ in neuem Tab öffnen">Siehe FAQ</a>.
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
import { Emit } from "vue-property-decorator";
import { Vue, Component, Prop, State, Provide } from "nuxt-property-decorator";

import { Validations } from "vuelidate-property-decorators";
import {required, email, sameAs, maxLength} from "vuelidate/lib/validators";

import { CognitoUser } from "@aws-amplify/auth";

import { RegistrationUserQuery } from "@/apollo/schema";
import userQuery from "@/apollo/queries/registration/user.gql";

import { UserAddMutation, UserAddMutationVariables } from "@/apollo/schema";
import addUser from "@/apollo/mutations/add_user.gql";

import formInput from "@/components/forms/input.vue";
import formCheckbox from "@/components/forms/checkbox.vue";
import { formatMessage } from "@/components/auth/messages";
import { Context } from "@nuxt/types";
import { IState } from "@/store";
import { LoadingAnimation } from "@/components/loadinganimation";

import { passwordComplexity} from '@/components/forms/passwordComplexity';
import {ComponentName} from "~/constants/componentName";
import {InputLengths} from "~/constants/inputLengths";

@Component({
  name: ComponentName.PagesRegisterFlowIndex,
  components: {
    formInput,
    formCheckbox
  }
})
export default class extends Vue {
  userExists = false;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmpwd: string = "";
  agb: boolean = false;
  nota: boolean = false; // no temping agency / zeitarbeitsfirma

  @State(state => state.auth.user)
  authenticatedUser?: CognitoUser;

  @Provide("validation")
  validation() {
    return this.$v;
  }

  error = "";

  back() {
    this.$track("registration", "user:back");
    this.$router.push("/");
  }

  @Validations()
  rules() {
    if (this.userExists) {
      return {
        firstName: {
          required,
          maxLength: maxLength(InputLengths.SHORT_STRING)
        },
        lastName: {
          required,
          maxLength: maxLength(InputLengths.SHORT_STRING)
        },
        email: {
          required,
          email,
          maxLength: maxLength(InputLengths.MIDDLE_STRING)
        }
      };
    }

    return {
      firstName: {
        required,
        maxLength: maxLength(InputLengths.SHORT_STRING)
      },
      lastName: {
        required,
        maxLength: maxLength(InputLengths.SHORT_STRING)
      },
      email: {
        required,
        email,
        maxLength: maxLength(InputLengths.MIDDLE_STRING)
      },
      password: { passwordComplexity },
      confirmpwd: { samePassword: sameAs("password") },
      agb: { required: sameAs(() => true) },
      nota: { required: sameAs(() => true) }
    };
  }

  async asyncData(context: Context) {
    let data: Partial<Pick<
      this,
      "userExists" | "firstName" | "lastName" | "email"
    >> = {};

    if ((context.store.state as IState).auth.isAuthenticated) {
      const client = context.app.apolloProvider!.defaultClient;
      const result = await client.query<RegistrationUserQuery>({
        query: userQuery,
        fetchPolicy: "network-only"
      });

      // console.log("received", result);

      if (result.data && result.data.me) {
        const me = result.data.me;

        data.userExists = true;
        data.firstName = me.firstName;
        data.lastName = me.lastName;
        data.email = me.email;
      }
    } else {
      data.userExists = false;
    }

    return data;
  }

  async createUser() {
    this.$track("registration", "user:create");

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
        lastName: this.lastName,
        flow: this.$route.params.flow
      });

      this.$router.push(`/register/${this.$route.params.flow}/validate`);
    } catch (err) {
      console.error(err);
      this.$sentry.captureException(err);
      this.$track("registration", "create:user:failed");

      this.error = formatMessage(err);
      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }

  async updateUser() {
    this.$track("registration", "user:update");

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

      await this.$store.dispatch("auth/updateUser", {
        firstName: this.firstName,
        lastName: this.lastName
      });

      this.$router.push(`/register/${this.$route.params.flow}/company`);
    } catch (err) {
      console.error(err);
      this.$sentry.captureException(err);
      this.$track("registration", "user:update:failed");

      this.error = err.message;
      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }

  @LoadingAnimation
  register() {
    this.$track("registration", "user:next");

    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      this.$track("registration", "user:next:invalid");
      return;
    }

    if (!this.userExists) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  mounted() {
    this.$store.commit("register/position", 0);
    this.$track("registration", "user:start");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/form-layout-two";
</style>
