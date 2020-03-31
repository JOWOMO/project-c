<template>
  <div class="form-container">
    <form @submit.prevent="add_company" novalidate>
      <div class="form-group half-width">
        <input
          type="text"
          v-model="user.company_name"
          id="company_name"
          name="company_name"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.company_name.$error }"
          required
        />
         <label for="Firmennamen">Firmennamen (optional)</label>
        <div
          v-if="submitted && !$v.user.company_name.required"
          class="invalid-feedback"
        >Firmennamen wird benötigt.</div>
      </div>

      <div class="form-group three-quaters-width">
        <input
          type="text"
          v-model="user.company_addr"
          id="company_addr"
          name="company_addr"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.company_addr.$error }"
          required
        />
        <label for="addresse">Adresse</label>
        <div
          v-if="submitted && !$v.user.company_addr.required"
          class="invalid-feedback"
        >Die Addresse wird benötigt</div>
      </div>

      <div class="form-group one-quater-width">
        <input
          type="number"
          v-model="user.company_postCode"
          id="company_postCode"
          name="company_postCode"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.company_postCode.$error }"
          required
        />
        <label for="company_postCode">Postleihzahl</label>
        <div v-if="submitted && $v.user.company_postCode.$error" class="invalid-feedback">
          <span v-if="!$v.user.company_postCode.required">Postleihzahl wird benötigt</span>
        </div>
      </div>

      <div class="form-group">
        <input
          type="number"
          v-model="user.employees"
          id="employees"
          name="employees"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.user.employees.$error }"
          required
        />
        <label for="password">Anzahl Mitarbeiter</label>
        <div v-if="submitted && $v.user.employees.$error" class="invalid-feedback">
          <span v-if="!$v.user.employees.minValue">Ein Mitarbeiter wird mindesten benötigt</span>
        </div>
      </div>

      <div class="form-group buttons">
        <button @click.prevent="$router.push('/register/user')">Zurück</button>
        <button class="primary">Weiter</button>
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
.form-container {
  form {
    position: relative;
    top: 0;
    left: 0;
    transform: none;

    .half-width {
      width: 250px;
      display: inline-block;
      position: relative;
      left: calc(100% / 2);
      transform: translate(-100%, 0);

      label, input {
        width: 250px;
      }
    }

    .three-quaters-width, .one-quater-width {
      display: inline-block;
    }

    .three-quaters-width {
      width: 375px !important;
    }

    .one-quater-width {
      width: 125px !important;
    }

    .buttons {
      position: relative;
      left: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      width: auto;
    }
  }
}
</style>
