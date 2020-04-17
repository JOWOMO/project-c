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
            Ja, ich habe die <nuxt-link to="/info/agb">Nutzungsbedingungen</nuxt-link> und die <nuxt-link to="/info/privacy">Datenschutzerklärung</nuxt-link> gelesen und akzeptiert.
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
import { Workflow } from "../../register.vue";
import { InjectReactive, Emit } from "vue-property-decorator";

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
import { formatMessage } from "@/components/auth/messages";
import { Context } from "@nuxt/types";
import { IState } from "@/store";
import { LoadingAnimation } from '@/components/loadinganimation';

@Component({
  components: {
    formInput,
    formCheckbox
  }
})
export default class extends Vue {
  @InjectReactive("workflow") workflow!: Workflow;

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
    this.$router.push("/");
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

  async asyncData(context: Context) {
    let data: Partial<Pick<
      this,
      "userExists" | "firstName" | "lastName" | "email"
    >> = {};

    // NO ACCESS to this context here
    try {
      if ((context.store.state as IState).auth.isAuthenticated) {
        const client = context.app.apolloProvider!.defaultClient;
        const result = await client.query<RegistrationUserQuery>({
          query: userQuery,
          fetchPolicy: "network-only"
        });

        console.log("received", result);

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
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
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
        lastName: this.lastName,
        flow: this.workflow.type,
      });

      this.$router.push(`/register/${this.workflow.type}/validate`);
    } catch (err) {
      console.log("err: ", err);
      this.error = formatMessage(err);
      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }

  async updateUser() {
    console.debug("updateUser");

    try {
      console.log("Updating with", this.firstName, this.lastName, this.email);

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

      console.log("first, last name", this.firstName, this.lastName)
      await this.$store.dispatch('auth/updateUser', { firstName: this.firstName, lastName: this.lastName })

      this.$router.push(`/register/${this.workflow.type}/company`);
    } catch (err) {
      console.error(err);
      this.error = err.message;
      this.$swal.alert("Das hat nicht geklappt", this.error, "error");
    }
  }

  @LoadingAnimation
  register() {
    console.log("register");

    this.$v.$touch();
    this.$emit("validate");

    this.$track('registration', 'user');

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

  @Emit('selectelement')
  setElement() {
    return 0;
  }

  mounted() {
   this.setElement();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/form-layout-two";
</style>
