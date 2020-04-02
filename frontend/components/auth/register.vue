<template>
  <div>
    <h1>Persönliche Daten</h1>
    <p>Wir benötigen ein paar Informationen, um loszulegen</p>

    <div class="form-container">
      <form method="POST" @submit.prevent="register" novalidate>
        <div class="form-group half-width">
          <input
            type="text"
            v-model="user.firstName"
            id="firstName"
            name="firstName"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.firstName.$error }"
            required
          />
          <label for="firstName">First Name</label>
          <div
            v-if="submitted && !$v.user.firstName.required"
            class="invalid-feedback"
          >First Name is required</div>
        </div>

        <div class="form-group half-width right">
          <input
            type="text"
            v-model="user.lastName"
            id="lastName"
            name="lastName"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.lastName.$error }"
            required
          />
          <label for="lastName">Last Name</label>
          <div
            v-if="submitted && !$v.user.lastName.required"
            class="invalid-feedback"
          >Last Name is required</div>
        </div>

        <div class="form-group">
          <input
            type="text"
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

        <div class="form-group half-width">
          <input
            type="password"
            v-model="user.password"
            id="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.password.$error }"
            required
          />
          <label for="password">Password</label>
          <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
            <span v-if="!$v.user.password.required">Password is required</span>
            <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
          </div>
        </div>

        <div class="form-group half-width right">
          <input
            type="password"
            v-model="user.confirmpwd"
            id="confirmPassword"
            name="confirmPassword"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.confirmpwd.$error }"
            required
          />
          <label for="confirmPassword">Confirm Password</label>
          <div v-if="submitted && $v.user.confirmpwd.$error" class="invalid-feedback">
            <span v-if="!$v.user.confirmpwd.required">Confirm Password is required</span>
            <span v-else-if="!$v.user.confirmpwd.sameAsPassword">Passwords must match</span>
          </div>
        </div>

        <div class="form-group agb">
          <label class="margin" for="checkbox">
            Bitte Akzeptiere unsere
            <nuxt-link to="/agb">AGB</nuxt-link>um fortzufahren
          </label>

          <input
            type="checkbox"
            v-model="user.agb"
            id="checkbox"
            name="checkbox"
            class="form-control checkbox"
            :class="{ 'is-invalid': submitted && $v.user.agb.$error }"
          />
        </div>

        <div v-if="submitted && $v.user.agb.$error" class="invalid-feedback">
          <span v-if="!$v.user.agb.required">
            Bitte die
            <nuxt-link to="/info/impressum">AGB</nuxt-link>akzeptieren
          </span>
        </div>

        <span id="error">{{ error }}</span>
        <div class="form-group buttons">
          <button @click.prevent="back">Zurück</button>
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
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpwd: "",
        agb: false
      },
      submitted: false,
      error: ""
    };
  },

  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmpwd: { required, sameAsPassword: sameAs("password") },
      agb: { sameAs: sameAs(() => true) }
    }
  },

  methods: {
    back() {
      this.$emit("change-state", "back");
    },

    async register() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      // we need to clone the object
      this.$store.commit("register_user_state", { ...this.user });

      try {
        const user = await this.$store.dispatch("auth/register", {
          email: this.user.email,
          password: this.user.password,
          firstName: this.user.firstName,
          lastName: this.user.lastName
        });

        this.$emit("change-state", "validate");
      } catch (err) {
        console.log("err: ", err);
        if (err.code === "UsernameExistsException") {
          this.error =
            "Das hat leider nicht geklappt. Es scheint sich schon jemand mit derselben E-Mail Adresse registriert zu haben. Vielleicht kannst Du versuchen Dich anzumelden?";
        } else if (err.code === "InvalidPasswordException") {
          this.error =
            "Das Passwort entspricht nicht den Komplexitätsanforderungen. Bitte gib mindestens 6 Zeichen bestehend aus Groß- und Kleinbuchstaben ein.";
        } else {
          this.error = err.message;
        }
      }
    }
  }
};
</script>
