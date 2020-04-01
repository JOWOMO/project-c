<template>
  <div class="container">
    <h1>Identität bestätigen</h1>
    <form method="POST" @submit.prevent="login" novalidate>
      <span class="invalid-login" v-if="false_auth">Email oder Passwort inkorrekt</span>
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
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback error">
          <span v-if="!$v.user.email.required">Email wird benötigt</span>
          <span v-if="!$v.user.email.email">Keine gültige Email</span>
        </div>
      </div>
      <div class="form-group">
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
        <div v-if="submitted && $v.user.pwd.$error" class="invalid-feedback error">
          <span v-if="!$v.user.pwd.required">Passwort wird benötigt</span>
          <span v-if="!$v.user.pwd.minLength">Passwort muss wenigstens 6 Zeichen lang sein</span>
        </div>
      </div>

      <div class="link-wrapper">
        <nuxt-link to="/login/password-reset" class="link">Password vergessen?</nuxt-link>
      </div>

      <div class="form-group buttonWrapper">
        <button class="primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'register',
  head() {
    return {
      title: "Login",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  // layout: 'register',
  data() {
    return {
      user: {
        email: "",
        pwd: ""
      },
      false_auth: false,
      submitted: false
    };
  },
  validations: {
    user: {
      email: { required, email },
      pwd: { required, minLength: minLength(6) }
    }
  },
  props:{
      route:String
  },
  methods: {
    async login() {
      this.submitted = true;

        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
      const user = await this.$store
        .dispatch("auth/login", { userdata: this.user })
        .then(user => {
          console.log(this.$store.state.user);
          console.log("User: ", user);
          this.$router.push(this.route)
        })  
        .catch(err => {
          this.false_auth = true;
          console.log("Email or Passwort incorrect", err);
        });

      // this.$router.push('/dashboard')
    }
    // async add_user() {
    //     this.submitted = true;

    //     // stop here if form is invalid
    //     this.$v.$touch();
    //     if (this.$v.$invalid) {
    //         return;
    //     }
    //     this.$store.dispatch('add_user', this.user)
    //     this.$router.push('/register/company')
    // }
  }
};
</script>

<style lang="scss" scoped>
.container {
  overflow-x: hidden;
  height: 100vh;
  position: relative;

  #invalid_login {
    position: relative;
    right: 50px;
  }

  h1 {
    font-weight: bold;
  }

  form {
    overflow: hidden;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .link-wrapper {
      width: 500px;
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translate(-50%, -50%);

      .link {
        position: relative;
        top: -20px;
        font-weight: normal;
      }
    }

    .buttonWrapper {
      text-align: center;
      margin-top: 40px;

      button {
        margin: 10px 30px;
      }

      .primary {
        width: 150px;
      }
    }
  }
}

@media only screen and (min-height: 1300px) {
  form {
    top: 350px !important;
  }
}

@media screen and (max-width: 786px) {
  .link-wrapper {
    width: 90% !important;
  }
}

@media only screen and (max-width: 500px) {
  form {
    top: 350px !important;
  }
}
</style>
