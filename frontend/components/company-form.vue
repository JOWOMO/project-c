<template>
  <div class="container">
    <h1>Erzähl uns mehr über dein Unternehmen</h1>
    <form @submit.prevent="add_company">
      <div class="form-group">
        <label for="Firmennamen">Firmennamen (optional)</label>
        <input
          type="text"
          v-model="user.company_name"
          id="company_name"
          name="company_name"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.company_name.$error }"
        />
        <div
          v-if="submitted && !$v.user.company_name.required"
          class="invalid-feedback"
        >Firmennamen wird benötigt.</div>
      </div>
      <div class="form-group">
        <label for="addresse">Adresse</label>
        <input
          type="text"
          v-model="user.company_addr"
          id="company_addr"
          name="company_addr"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.company_addr.$error }"
        />
        <div
          v-if="submitted && !$v.user.company_addr.required"
          class="invalid-feedback"
        >Die Addresse wird benötigt</div>
      </div>
      <div class="form-group">
        <label for="company_postCode">Postleihzahl</label>
        <input
          type="number"
          v-model="user.company_postCode"
          id="company_postCode"
          name="company_postCode"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.company_postCode.$error }"
        />
        <div v-if="submitted && $v.user.company_postCode.$error" class="invalid-feedback">
          <span v-if="!$v.user.company_postCode.required">Postleihzahl wird benötigt</span>
        </div>
      </div>
      <div class="form-group">
        <label for="password">Anzahl Mitarbeiter</label>
        <input
          type="number"
          v-model="user.employees"
          id="employees"
          name="employees"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.employees.$error }"
        />
        <div v-if="submitted && $v.user.employees.$error" class="invalid-feedback">
          <span v-if="!$v.user.employees.minValue">Ein Mitarbeiter wird mindesten benötigt</span>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-secondary" @click.prevent="$router.push('/register/user')">Zurück</button>
        <button class="btn btn-primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, numeric, minValue } from "vuelidate/lib/validators";

export default {
  name: "company",
  data() {
    return {
      submitted: false,
      user: {
        company_name: "",
        company_addr: "",
        company_postCode: "",
        employees: 1
      }
    };
  },
  validations: {
    user: {
      company_name: { required },
      company_addr: { required },
      company_postCode: { required, numeric },
      employees: { required, numeric, minValue: 1 }
    }
  },
  methods: {
    async add_company() {
      this.submitted = true;

      // stop here if form is invalid
      if (parseInt(this.user.employees) < 1) {
        return;
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.commit("register_company_state", this.user);
      this.$router.push("/register/team");
      // this.$store.dispatch("add_company", this.user); // TODO: save it after validate.vue
    }
  },
  created() {
    this.$store.commit("update_position", {
      positions: {
        profile: false,
        company: true,
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
