<template>
  <div class="container">
    <div v-if="login_flow">
      <h1>Bestätige deine Email adresse</h1>
      <p>Wir haben dir eine Email geschickt. Bitte fügen Sie den verifizierungs Code hier ein</p>
      <p class="error" v-if="error != ''">{{ error }}</p>
      <form method="POST" @submit.prevent="confirm">
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
          <label for="code">Code</label>
          <input
            type="text"
            v-model="user.code"
            id="code"
            name="code"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.code.$error }"
          />
          <div v-if="submitted && $v.user.code.$error" class="invalid-feedback">
            <span v-if="!$v.user.code.required">Code is required</span>
          </div>
        </div>

        <div class="form-group buttons">
          <button
            @click.prevent="$store.commit('set_validation_state',false)"
          >Zurück</button>
          <button class="primary">Weiter</button>
        </div>
      </form>
    </div>
    <div v-else>
      <login route="/register/offer/company" />
    </div>
  </div>
</template>

<script>
import { required, email, numeric } from "vuelidate/lib/validators";
import login from "@/components/login_register_flow.vue";

export default {
  name: "validate",
  components: {
    login
  },
  head() {
    return {
      title: "Verify Email",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: "description", name: "description", content: "" }
      ]
    };
  },
  data() {
    return {
      user: {
        email: this.$store.state.register_state.user.email,
        code: null
      },
      submitted: false,
      error: "",
      login_flow: true
    };
  },

  validations: {
    user: {
      email: { required, email },
      code: { required }
    }
  },
  layout: "register",

  methods: {
    async confirm() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      console.log(this.user.code);
      this.$store
        .dispatch("auth/confirm", {
          email: this.user.email,
          code: this.user.code
        })
        .then(user => {
          console.log("registered user", user);
          //  this.$router.push("/register/company")
          console.log(this.$store.state.register_state.user);
          this.$store
            .dispatch("auth/login", {
              userdata: this.$store.state.register_state.user
            })
            .then(user => {
              console.log("user loaded inside validate: ", user);
              this.$router.push("/register/offer/company");
            })
            .catch(err => {
              console.log(
                "error user is empty maybe because of a refresh redirecting to login: ",
                err
              );
              this.login_flow = false;
              //this.$router.push("/login")
            });
        })
        .catch(err => {
          this.error =
            "verifizierungs Code und Email Adresse stimmen nicht überein";
          console.log("email is not validated: ", err);
        });
    }
  },
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
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 1fr 5fr;

  h1 {
    margin: 50px 0 0 0;
  }

  p {
    width: 100%;
    text-align: center;
  }

  .form-group {
    margin: 30px 0 30px 0;
    left: 10%;
  }
}

@media only screen and (max-width: 765px) {
  .container {
    justify-content: center;
    grid-template-rows: auto 1fr;
    grid-template-columns: 80vw;

    h1 {
      margin: 50px 0 0 0;
    }

    .form-group {
      width: 80vw;
      left: 0;

      input,
      label,
      .error {
        width: 100%;
      }
    }

    .buttons {
      text-align: center;
    }
  }
}
</style>
