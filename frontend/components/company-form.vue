<template>
  <div class="form-container">
    <form @submit.prevent="add_company" novalidate class="register-company">
      <div class="form-group half-width" id="company-name">
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

      <div class="form-group half-width dropdown" id="dropdown">
        <div class="select-box">
          <div
            class="options-container"
            ref="optionsContainer"
            :class="{active: isActive}"
          > <!-- TODO: add v-for - fetch from db -->
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="Handwerker">
              <label for="Handwerker">Handwerker</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Verkäufer">
              <label for="Verkäufer">Verkäufer</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Lagerarbeiter">
              <label for="Lagerarbeiter">Lagerarbeiter</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Spediteur">
              <label for="Spediteur">Spediteur</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Landwirt">
              <label for="Landwirt">Landwirt</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Krankenpfleger">
              <label for="Krankenpfleger">Krankenpfleger</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Mechaniker">
              <label for="Mechaniker">Mechaniker</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Andere">
              <label for="Andere">Andere</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="isActive = !isActive">
            Branche
          </div>
        </div>

      </div>

      <div class="form-group half-width" id="adress">
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

      <div class="form-group half-width" id="plz">
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
      isActive: false,
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
    },
    // toggleClass() {
    //   this.$refs.optionsContainer.toggle("active")
    // },
    // select() {
    //   this.$refs.innerHTML = this.$refs.industrys
    // }
  },
  created() {
    this.$store.commit("update_position", {
      positions: {
        profile: false,
        company: true,
        team: false
      }
    });
  },
  mounted() {
    const selected = this.$refs.selected

    const industrys = this.$refs.industrys
  }
};
</script>

<style scoped lang="scss">
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
      &:nth-of-type(even) {
        grid-column: 2;
        width: 50%;
      }
      &:nth-of-type(odd) {
        grid-column: 1;
        width: 100%;
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
