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
      <div class="form-group buttonWrapper">
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import addUser from "@/apollo/mutations/add_user";

export default {
  components: {},

  data() {
    return {
      user: {
        email: this.$store.state.register_state.user.email,
        code: ""
      },
      submitted: false,
      error: ""
    };
  },

  validations: {
    user: {
      email: { required, email },
      code: { required }
    }
  },

  methods: {
    async resend() {
      this.$store.dispatch("auth/resendcode", this.user);
    },

    async confirm() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        let user;

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
            first: user.attributes.given_name,
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
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // width: 100vw;
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 1fr 1fr 10fr;
  height: 100vh;
  padding: 0;

  h1 {
    grid-column: 2;
    grid-row: 1;
    justify-self: left;
    margin: 50px 0 0 10px;
  }

  #error {
    grid-column: 2;
    grid-row: 4 / span 5;
  }

  p {
    grid-column: 2;
    grid-row: 2;
    margin-left: 10px;
  }

  form {
    margin-right: 20px;
    grid-column: 2;
    grid-row: 3;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 20px;
    justify-content: center;
    align-items: start;
    max-width: 800px;

    .form-group {
      grid-column: 1 / span 2;
      input,
      label,
      .error {
        width: 100%;
      }
    }
    .half-width {
      grid-column: 1;
    }
    .right {
      grid-column: 2;
    }
    .agb {
      grid-column: 1;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;
      input[type="checkbox"] {
        width: 21px;
        // display: inline-block;
        position: static;
      }
      .invalid-feedback {
        grid-column: 1;
      }
      label {
        width: auto;
        position: static;
      }
    }
  }
}

@media only screen and (max-width: 950px) {
  .container {
    grid-template-columns: 0fr 1fr;
    width: 100vw;
    padding: 50px 20px;

    p,
    h1 {
      width: 100%;
      text-align: center;
      margin: 0;
    }

    #error {
      grid-column: 1;
      grid-row: 4;
      text-align: center;
    }

    form {
      grid-template-columns: 1fr 0 !important;
      column-gap: 0 !important;
      margin: 50px 0 0 0;
      .half-width {
        width: 100% !important;
        grid-column: 1 !important;
      }

      .buttons {
        justify-self: center !important;
      }

      .form-container {
        width: 100%;
      }
    }
  }
}
</style>
