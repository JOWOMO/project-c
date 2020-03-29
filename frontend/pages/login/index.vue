<template>
  <div class="container">
    <h1>Willkommen zurück</h1>
    <form method="POST" @submit.prevent="login">
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
          <span v-if="!$v.user.email.required">Email wird benötigt</span>
          <span v-if="!$v.user.email.email">Keine gültige Email</span>
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
          <span v-if="!$v.user.pwd.required">Passwort wird benötigt</span>
          <span v-if="!$v.user.pwd.minLength">Passwort muss wenigstens 6 Zeichen lang sein</span>
        </div>
      </div>

      <span id="invalid_login" v-if="false_auth">Email oder Passwort inkorrekt</span>

      <nuxt-link to="/login/password-reset" class="link">Password vergessen?</nuxt-link>

      <div class="form-group">
        <button class="btn btn-secondary" @click.prevent="$router.push('/')">Zurück</button>
        <button class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'register',
  components: {},
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
  created(){
    
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
          this.$router.push("/dashboard")
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
    position: relative;
    text-align: center;
    left: -65px;
    top: 70px;
  }

  form {
    text-align: center;
    display: block;
    box-sizing: border-box;
    position: relative;
    top: 10vh;
    overflow: hidden;

    .link {
      color: deepskyblue;
      position: relative;
      left: 50px;
    }

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
        right: 60px;
        width: 80px;
      }

      .btn-primary {
        background: deepskyblue;
        color: #fff;
        position: relative;
        bottom: 30px;
        right: -70px;
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
  #invalid_login {
    left: 0;
  }

  form {
    .link {
      right: 0 !important;
    }
  }
}
</style>
