<template>
  <div class="form-container">
    <form @submit.prevent="updateCompany" novalidate class="register-company">
      <div class="form-group half-width" id="company-name">
        <input
          type="text"
          v-model="name"
          id="name"
          name="name"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.name.$error }"
          required
        />
        <label for="name">Firmenname</label>
        <div
          v-if="submitted && !$v.name.required"
          class="invalid-feedback"
        >Firmenname wird benötigt.</div>
      </div>
      
      <div class="form-group half-width" id="dropdown">
        <select v-model="industry">
          <option name="industry" v-for="ind in industries" :key="ind.id" :value="ind.id">
            {{ind.name}}
          </option>
        </select>
        <label for="industry">Industrie</label>
      </div>

      <div class="form-group half-width" id="adress">
        <input
          type="text"
          v-model="address"
          id="adress"
          name="adress"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.address.$error }"
          required
        />
        <label for="addresse">Adresse</label>
        <div
          v-if="submitted && !$v.address.required"
          class="invalid-feedback"
        >Die Addresse wird benötigt</div>
      </div>

      <div class="form-group half-width" id="postalcode">
        <input
          type="number"
          v-model="postalcode"
          id="postalcode"
          name="postalcode"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.postalcode.$error }"
          required
        />
        <label for="postalcode">Postleihzahl</label>
        <div v-if="submitted && $v.postalcode.$error" class="invalid-feedback">
          <span v-if="!$v.postalcode.required">Postleihzahl wird benötigt</span>
        </div>
      </div>

      <div class="form-group city" id="city">
        <input
          type="string"
          v-model="city"
          id="city"
          name="city"
          class="form-control"
          :class="{ 'is-invalid': submitted && $v.city.$error }"
          required
        />
        <label for="city">Stadt</label>
        <div v-if="submitted && $v.city.$error" class="invalid-feedback">
          <span v-if="!$v.city.required">Eine Stadt wird benötigt</span>
        </div>
      </div>

      <div class="buttons">
        <button @click.prevent="back">Zurück</button>
        <button class="primary">Weiter</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Component from "nuxt-class-component";
import { Vue, Prop, State } from "nuxt-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import { required, numeric, minValue } from "vuelidate/lib/validators";

import { CognitoUser } from "@aws-amplify/auth";

import {
  AddCompanyMutation,
  AddCompanyMutationVariables,
  RegistrationCompanyQuery
} from "@/apollo/schema";

import addCompany from "@/apollo/mutations/add_company.gql";
import userQuery from "@/apollo/queries/registration/company.gql";

import vSelect from "vue-select";

@Component({components: { vSelect }})
export default class Registration extends Vue {
  industries?: {id: string, name: string}[];

  submitted = false;
  isActive = false;

  id?: string;

  @Validate({ required })
  name?: string | null | undefined = '';

  @Validate({ required })
  address: string | null | undefined = '';

  @Validate({ required, numeric })
  postalcode?: string | null | undefined = '';

  @Validate({ required, numeric, minValue: 1 })
  employees?: number | null | undefined = 0;

  industry?: string | null | undefined = '';

  @Validate({ required })
  city?: string | null | undefined = '';

  async created() {
    const result = await this.$apollo.query<RegistrationCompanyQuery>({
      query: userQuery
    });

    if (result.data && result.data.me) {
      const me = result.data.me;

      if (me.companies && me.companies.length > 0) {
        const company = me.companies[0];

        this.id = company.id;
        this.name = company.name;
        this.address = company.addressLine1;
        this.city = company.city;
        this.postalcode = company.postalCode;

        this.industry = company.industry?.id;
      }
    }

    if (result.data && result.data.industries) {
      this.industries = result.data.industries;
    }
  }

  back() {
    this.$router.push('/register/user');
  }

  async updateCompany() {
    this.submitted = true;

    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }

    const client = this.$apollo.getClient();
    await this.$apollo.mutate<AddCompanyMutation, AddCompanyMutationVariables>({
      mutation: addCompany,
      variables: {
        id: this.id,
        name: this.name!,
        addressLine1: this.address!,
        postalCode: this.postalcode!,
        city: this.city!
      }
    });

    // this.$store.commit("register_company_state", this.user);
    this.$router.push(`/register/offer/team`);
    // this.$store.dispatch("add_company", this.user); // TODO: save it after validate.vue
  }
}
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

      input,
      label,
      select,
      .error {
        width: 100%;
      }
    }

    .city {
      width: 75%;
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

    .city {
      width: 100% !important;
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
