<template>
  <div class="container">
    <h1>Dein Unternehmen</h1>
    <p>Bitte gib die Adresse des Standortes an, an dem Du Mitarbeiter:innen {{ verb }}. Das ist wichtig um einen passenden Personalpartner in Deiner Region zu finden.</p>

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
import { InjectReactive, Emit } from "vue-property-decorator";

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
import { Workflow } from "../../register.vue";
import { Context } from "@nuxt/types";
import { LoadingAnimation } from "~/components/loadinganimation";

@Component({
  components: {
    formInput,
    formSelect
  },
  middleware: "authenticated"
})
export default class extends Vue {
  @InjectReactive("workflow") workflow!: Workflow;

  industries?: { id: string; name: string }[] = [];

  id?: string;

  @Provide("validation")
  validation() {
    return this.$v;
  }

  get verb() {
    return this.workflow.type === 'supply'
      ? 'suchst'
      : 'stellen kannst';
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

  async asyncData(context: Context) {
    let data: Partial<Pick<
      this,
      | "id"
      | "industries"
      | "name"
      | "address"
      | "city"
      | "postalcode"
      | "industry"
    >> = {};

    // NO ACCESS to this context here
    try {
      const client = context.app.apolloProvider!.defaultClient;

      const result = await client.query<
        RegistrationCompanyQuery,
        RegistrationCompanyQueryVariables
      >({
        query: userQuery,
        fetchPolicy: "network-only"
      });

      if (result.data && result.data.industries) {
        data.industries = result.data.industries;
      }

      if (result.data && result.data.me) {
        const me = result.data.me;

        if (me.companies && me.companies.length > 0) {
          const company = me.companies[0];

          console.log("found company", company);

          data.id = company.id;
          data.name = company.name;
          data.address = company.addressLine1;
          data.city = company.city;
          data.postalcode = company.postalCode;

          data.industry = company.industry?.id;
        }
      }

      // will be merged with local variables
      return data;
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
    }
  }

  back() {
    this.$router.push(`/register/${this.workflow.type}`);
  }

  @LoadingAnimation
  async updateCompany() {
    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      return;
    }

    this.$track('registration', 'company');

    try {
      const client = this.$apollo.getClient();

      console.log(
        "Updating company whith",
        this.id,
        this.name,
        this.address,
        this.postalcode,
        this.city,
        this.industry
      );

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

      this.$router.push(`/register/${this.workflow.type}/team`);
    } catch (err) {
      console.error(err);
      this.$swal.alert("Das hat nicht geklappt", err.message, "error");
    }
  }

  @Emit('selectelement')
  setElement() {
    return 1;
  }

  mounted() {
   this.setElement();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-two";
</style>
