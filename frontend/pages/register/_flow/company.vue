<template>
  <div class="container">
    <h1>{{ $t('register.' + $route.params.flow + '.company.title') }}</h1>
    <p>{{ $t('register.' + $route.params.flow + '.company.subtitle') }}</p>

    <form method="POST" novalidate>
      <div class="form-group half-width">
        <formInput :id="'name'" :label="'Name'" v-model="name" />
      </div>

      <div class="form-group half-width right">
        <formSelect :id="'industry'" :label="'Industrie'" :values="industries" v-model="industry" />
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
import { Emit } from "vue-property-decorator";

import { Validate } from "vuelidate-property-decorators";
import {required, numeric, minValue, maxLength} from "vuelidate/lib/validators";

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
import { Context } from "@nuxt/types";
import { LoadingAnimation } from "~/components/loadinganimation";
import {ComponentName} from "@/constants/componentName";
import Validations from "~/components/forms/validations.vue";
import {InputLengths} from "~/constants/inputLengths";

@Component({
  name: ComponentName.PagesRegisterFlowCompany,
  components: {
    Validations,
    formInput,
    formSelect
  },
  middleware: "authenticated"
})
export default class extends Vue {
  industries?: { id: string; name: string }[] = [];

  id?: string;

  @Provide("validation")
  validation() {
    return this.$v;
  }

  @Validate({
    required,
    maxLength: maxLength(InputLengths.SHORT_STRING)
  })
  name?: string | null | undefined = "";

  @Validate({
    required,
    maxLength: maxLength(InputLengths.MIDDLE_STRING)
  })
  address: string | null | undefined = "";

  @Validate({
    required,
    numeric
  })
  postalcode?: string | null | undefined = "";

  @Validate({
    required
  })
  industry?: string | null | undefined = "";

  @Validate({
    required,
    maxLength: maxLength(InputLengths.SHORT_STRING)
  })
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
  }

  back() {
    this.$track("registration", "company:back");
    this.$router.push(`/register/${this.$route.params.flow}`);
  }

  @LoadingAnimation
  async updateCompany() {
    this.$track("registration", "company:next");

    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      this.$track("registration", "company:next:invalid");
      return;
    }

    try {
      const client = this.$apollo.getClient();

      // console.debug(
      //   "Updating company whith",
      //   this.id,
      //   this.name,
      //   this.address,
      //   this.postalcode,
      //   this.city,
      //   this.industry
      // );

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

      this.$router.push(`/register/${this.$route.params.flow}/team`);
    } catch (err) {
      console.error(err);
      this.$sentry.captureException(err);
      this.$track("registration", "company:update:failed");

      this.$swal.alert("Das hat nicht geklappt", err.message, "error");
    }
  }

  mounted() {
    this.$store.commit('register/position', 1);
    this.$track("registration", "company:start");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/form-layout-two";
</style>
