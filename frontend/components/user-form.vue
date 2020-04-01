<template>
  <div>
    <div v-if="!$store.state.validation_state" class="form-container">
      <form method="POST" @submit.prevent="add_user" novalidate>
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
            v-model="user.pwd"
            id="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.pwd.$error }"
            required
          />
          <label for="password">Password</label>
          <div v-if="submitted && $v.user.pwd.$error" class="invalid-feedback">
            <span v-if="!$v.user.pwd.required">Password is required</span>
            <span v-if="!$v.user.pwd.minLength">Password must be at least 6 characters</span>
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
          <label class="margin" for="checkbox">Bitte Akzeptiere unsere <nuxt-link to="/agb">AGB</nuxt-link> um fortzufahren</label>

          <input
            type="checkbox"
            v-model="user.agb"
            id="checkbox"
            name="checkbox"
            value="true"
            class="form-control checkbox"
            :class="{ 'is-invalid': submitted && $v.user.agb.$error }"
          >
        </div>

        <!-- <div v-if="!$v.user.agb.$invalid" class="invalid-feedback">
          <span>
            Ich akzeptiere die
            <nuxt-link to="/impressum">AGB</nuxt-link>
          </span>
        </div> -->
        <div v-if="submitted && $v.user.agb.$error" class="invalid-feedback">
          <span v-if="!$v.user.agb.required">
            Bitte die
            <nuxt-link to="/info/impressum">AGB</nuxt-link>akzeptieren
          </span>
        </div>

        <span id="error">{{ error }}</span>
        <div class="form-group buttons">
          <button @click.prevent="$router.push('/')">Zurück</button>
          <button class="primary">Weiter</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import validate from "@/components/validate.vue";
export default {
  name: "profile",
  components: {
    validate
  },
    props:{
    route:String
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        pwd: "",
        confirmpwd: "",
        agb: false
      },
      submitted: false,
      error: "",

    };
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      pwd: { required, minLength: minLength(6) },
      confirmpwd: { required, sameAsPassword: sameAs("pwd") },
      agb: { sameAs: sameAs(() => true) }
    }
  },
  methods: {
    async add_user() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      // this.$store.dispatch('add_user', this.user)
      // this.$store.commit("register_user_state", this.user);
      this.$store.commit("register_user_state", this.user);
      console.log("add user ");
      this.$store
        .dispatch("auth/register", {
          email: this.user.email,
          password: this.user.pwd
        })
        .then(user => {
          console.log("user: ", user);

          this.$store.commit("set_validation_state",true)
          this.$router.push(this.route)
        })
        .catch(err => {
          // user exists
          this.error = err.message;
          console.log("err: ", err);
        });
    }
  },

  middelware: "authenticated",
  created() {
    this.$store.commit("update_position", {
      positions: {
        profile: true,
        company: false,
        team: false
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    gap: 20px;
    justify-content: center;
    align-items: start;
    max-width: 800px;

    .form-group {
      grid-column: 1 / span 2;

      input, label, .error {
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

      input[type=checkbox] {
        width: 21px;
        // display: inline-block;
        position: static;
      }

      label {
        width: auto;
        position: static;
      }
    }
  }
}

@media only screen and (max-width: 765px) {
  form {
    grid-template-columns: 1fr 0 !important;
    column-gap: 0 !important;

    .half-width {
      width: 100% !important;
      grid-column: 1 !important;
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
