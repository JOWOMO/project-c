<template>
  <div class="container">
    <h1>Persönliche Daten</h1>
    <p>Wir benötigen ein paar Informationen, um loszulegen</p>

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
        <div class="wrapper-checkbox">
          <input
            type="checkbox"
            v-model="user.agb"
            id="checkbox"
            name="checkbox"
            class="form-control checkbox"
            :class="{ 'is-invalid': submitted && $v.user.agb.$error }"
          />

          <label class="margin" for="checkbox">
            Bitte Akzeptiere unsere
            <nuxt-link to="/agb">AGB</nuxt-link> um fortzufahren
          </label>
        </div>



        <div v-if="submitted && $v.user.agb.$error" class="invalid-feedback">
          <span v-if="!$v.user.agb.required">
            Bitte die
            <nuxt-link to="/info/impressum">AGB</nuxt-link> akzeptieren
          </span>
        </div>
      </div>


      <span id="error">{{ error }}</span>

      <div class="form-group buttons">
        <button @click.prevent="back">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
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
    grid-template-rows: repeat(5, auto);
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
      .wrapper-checkbox {
        grid-column: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        input[type="checkbox"] {
          width: 21px;
          // display: inline-block;
          position: static;
        }

        label {
          position: static;
          font-size: 14px;
        }
      }

      .invalid-feedback {
        margin-top: 10px;
      }
    }

    #error {
      grid-column: 2;
      grid-row: 4 / span 5;
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

      #error {
        grid-column: 1;
        grid-row: 7;
        text-align: center;
      }

      .form-container {
        width: 100%;
      }
    }
  }
}
</style>
