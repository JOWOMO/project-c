<template>
  <div>
    <div class="container">
      <h1>Dein Unternehmen</h1>
      <p>Erzähle uns mehr über dein Unternehmen</p>

      <form method="POST" novalidate>
        <div class="form-group half-width">
          <formInput :id="'name'" :label="'Name'" v-model="name" />
        </div>

        <div class="form-group half-width right">
          <formSelect :id="industry" :label="'Industrie'" :values="industries" v-model="industry" />
        </div>

        <div class="form-group">
          <formInput :id="'address'" :label="'Adresse'" v-model="address" />
        </div>

        <div class="form-group half-width">
          <formInput :id="'postalcode'" :label="'Postleitzahl'" v-model="postalcode" />
        </div>

        <div class="form-group half-width right">
          <formInput :id="'city'" :label="'Ort'" v-model="city" />
        </div>
      </form>

      <div class="buttons">
        <button class="secondary" @click.prevent="back">Zurück</button>
        <button class="primary" @click.prevent="updateCompany">Weiter</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Inject,
  Vue,
  Component,
  Prop,
  State,
  Provide
} from "nuxt-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import { required, numeric, minValue } from "vuelidate/lib/validators";

import { CognitoUser } from "@aws-amplify/auth";

import {
  AddCompanyMutation,
  AddCompanyMutationVariables,
  RegistrationCompanyQuery,
  RegistrationCompanyQueryVariables
} from "@/apollo/schema";

import addCompany from "@/apollo/mutations/add_company.gql";
import userQuery from "@/apollo/queries/registration/company.gql";

import formInput from "@/components/forms/input.vue";
import formSelect from "@/components/forms/select.vue";
import { WorkflowProvider } from "../register.vue";

@Component({
  components: {
    formInput,
    formSelect
  }
})
export default class extends Vue {
  @Inject("workflow") workflow!: WorkflowProvider;

  industries?: { id: string; name: string }[] = [];

  id?: string;

  @Provide("validation")
  validation() {
    return this.$v;
  }

  @Validate({ required })
  name?: string | null | undefined = "";

  @Validate({ required })
  address: string | null | undefined = "";

  @Validate({ required, numeric })
  postalcode?: string | null | undefined = "";

  @Validate({ required })
  industry?: string | null | undefined = "";

  @Validate({ required })
  city?: string | null | undefined = "";

  async created() {
    this.workflow().setStage(1);

    const result = await this.$apollo.query<
      RegistrationCompanyQuery,
      RegistrationCompanyQueryVariables
    >({
      query: userQuery
    });

    if (result.data && result.data.industries) {
      this.industries = result.data.industries;
    }

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
  }

  back() {
    this.$router.push(`/register`);
  }

  async updateCompany() {
    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      return;
    }

    try {
      const client = this.$apollo.getClient();

      await this.$apollo.mutate<
        AddCompanyMutation,
        AddCompanyMutationVariables
      >({
        mutation: addCompany,
        variables: {
          id: this.id,
          name: this.name!,
          addressLine1: this.address!,
          postalCode: this.postalcode!,
          city: this.city!,
          industry: this.industry!
        }
      });

      this.$router.push(`/register/team`);
    } catch (err) {
      console.error(err);
      this.$swal( 
        "Das hat nicht geklappt", 
        err.message, 
        "error"
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-two";
</style>
