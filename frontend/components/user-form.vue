<template>
  <div class="container">
    <h1>Wir wollen dich besser kennen lernen</h1>
    <form method="POST" @submit.prevent="add_user">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          v-model="user.firstName"
          id="firstName"
          name="firstName"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.firstName.$error }"
        />
        <div
          v-if="submitted && !$v.user.firstName.required"
          class="invalid-feedback"
        >First Name is required</div>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          v-model="user.lastName"
          id="lastName"
          name="lastName"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.lastName.$error }"
        />
        <div
          v-if="submitted && !$v.user.lastName.required"
          class="invalid-feedback"
        >Last Name is required</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="user.email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.email.$error }"
        />
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="user.pwd"
          id="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.pwd.$error }"
        />
        <div v-if="submitted && $v.user.pwd.$error" class="invalid-feedback">
          <span v-if="!$v.user.pwd.required">Password is required</span>
          <span v-if="!$v.user.pwd.minLength">Password must be at least 6 characters</span>
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="user.confirmpwd"
          id="confirmPassword"
          name="confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.confirmpwd.$error }"
        />
        <div v-if="submitted && $v.user.confirmpwd.$error" class="invalid-feedback">
          <span v-if="!$v.user.confirmpwd.required">Confirm Password is required</span>
          <span v-else-if="!$v.user.confirmpwd.sameAsPassword">Passwords must match</span>
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">AGB</label>
        <!-- <Checkmark/> -->
        <input
          type="checkbox"
          v-model="user.agb"
          id="checkbox"
          name="checkbox"
          value="true"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.agb.$error }"
        />
      </div>
      <div v-if="!$v.user.agb.$invalid" class="invalid-feedback">
        <span>
          Ich akzeptiere die
          <nuxt-link to="/impressum">AGB</nuxt-link>
        </span>
      </div>
      <div v-if="submitted && $v.user.agb.$error" class="invalid-feedback">
        <span v-if="!$v.user.agb.required">
          Bitte die
          <nuxt-link to="/info/impressum">AGB</nuxt-link>akzeptieren
        </span>
      </div>

      <div class="form-group">
        <button class="btn btn-secondary" @click.prevent="$router.push('/')">Zurück</button>
        <button class="btn btn-primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "profile",
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
      submitted: false
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
      this.$store.commit("register_user_state", this.user);
      console.log("saving user to store");
      console.log(this.user.email);

      this.$router.push("/register/company");
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

<style scoped lang="scss">
.container {
  overflow-x: hidden;
  height: 100vh;

  h1 {
    position: relative;
    left: 500px; // min 400px
    top: 70px;
  }

  form {
    position: relative;
    left: 500px; // min 400px
    top: 120px;
    overflow: hidden;

    .form-group {
      margin: 20px;

      label {
        font-weight: bold;
        font-size: 18px;
        display: block;
      }

      input {
        width: 400px;
        height: 40px;
        border: 1px solid grey;
        border-radius: 5px;
        background-color: #00000007;
        padding-left: 10px;
        font-size: 14px;
        outline: none;
        margin-top: 10px;
      }

      .btn {
        width: 130px;
        height: 40px;
        border-radius: 20px;
        outline: none;
        border: none;
        font-size: 16px;
        margin: 30px 30px 0 30px;
      }

      .btn-secondary {
        color: grey;
        position: relative;
        bottom: 30px;
        left: 0;
        width: 80px;
      }

      .btn-primary {
        background: deepskyblue;
        color: #fff;
        position: relative;
        bottom: 30px;
        right: -200px;
      }
    }
  }
}

@media only screen and (max-width: 1115px) {
  h1 {
    width: 100vw;
    left: 0 !important;
    text-align: center;
    padding: 0 10px 0 10px;
  }

  form {
    width: 100vw;
    left: 0 !important;
    text-align: center;

    input {
      width: 80vw !important;
      left: 10vw;
    }

    .btn-secondary {
      position: static !important;
    }

    .btn-primary {
      position: static !important;
    }
  }
}

@media only screen and (max-width: 350px) {
  h1 {
    font-size: 20px;
  }
}
</style>
