<template>
  <div>
    <h1>Bestätige deine Email adresse</h1>
    <p>Wir haben dir eine Email geschickt. Bitte fügen Sie den verifizierungs Code hier ein</p>

    <div class="form-container">
      <form method="POST" @submit.prevent="confirm">
        <div class="form-group">
          <input
            type="email"
            v-model="user.email"
            id="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.email.$error }"
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
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
// import addUser from "@/apollo/mutations/add_user";

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
        const user = await this.$store.dispatch("auth/confirm", {
          email: this.user.email,
          code: this.user.code
        });

        this.$emit("change-state", "redirect");
      } catch (err) {
        // console.log("err: ", err);
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
