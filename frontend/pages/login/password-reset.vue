<template>
  <div class="container">
    <h1>Setzte dein Password zurück</h1>

    <form method="POST" @submit.prevent="reset_password">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.email.$error }"
        />
        <div v-if="submitted && $v.email.$error" class="invalid-feedback">
          <span v-if="!$v.email.required">Email is required</span>
          <span v-if="!$v.email.email">Email is invalid</span>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-secondary" @click.prevent="$router.push('/')">Zurück</button>
        <button class="btn btn-primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { required, email } from "vuelidate/lib/validators";

export default {
  layout: "register",
  data() {
    return {
      email: "",
      submitted: false
    };
  },
  validations: {
    user: {
      email: { required, email }
    }
  },
  methods: {
    async reset_password() {
      const username = this.email;
      console.log("reset password");

      await Auth.forgotPassword(username)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
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
