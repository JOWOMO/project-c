<template>
  <div class="container">
    <div v-if="!error">
      <div class="images">
        <div class="frame">
          <div class="img left" />
        </div>
        <div class="frame">
          <div class="img right" />
        </div>
      </div>

      <h1>{{ $t('connect.title', {first, last}) }}</h1>
      <p>{{ $t('connect.message', {first, last}) }}</p>
    </div>
    <div v-else>
      <h1 class="error">{{ $t('connect.errors.title') }}</h1>
      <p>{{error}}</p>
    </div>

    <div class="buttons">
      <button class="primary" @click.prevent="dashboard">{{ $t('connect.button') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import {
  ConnectMutation,
  ConnectMutationVariables,
  MatchType
} from "@/apollo/schema";

import connectMutation from "@/apollo/mutations/connect.gql";

export type ConnectParams = {
  match: string;
  firstName: string;
  lastName: string;
  flow: string;
  pictureUrl?: string;
  origin: string;
};

@Component({
  middleware: "authenticated"
})
export default class extends Vue {
  first: string = "";
  last: string = "";

  error: string = "";
  route: string = "";

  dashboard() {
    this.$router.replace(this.route || "/dashboard");
  }

  created() {
    this.$track('connect', this.error ? 'failed' : 'success');
    this.$store.commit('support/context', `zum Match`);
  }

  async asyncData(context: Context) {
    let result: Partial<Pick<this, "error" | "first" | "last" | "route">> = {};

    const params: ConnectParams = JSON.parse(atob(context.params.pathMatch));
    // console.debug('connect', params);

    result.first = params.firstName;
    result.last = params.lastName;

    result.route = `/dashboard/match/${params.flow}/${params.origin}`;

    const client = context.app.apolloProvider!.defaultClient;
    const mutation = await client.mutate<
      ConnectMutation,
      ConnectMutationVariables
    >({
      mutation: connectMutation,
      variables: {
        id: params.match,
        origin: params.origin,
        type: params.flow === "demand" ? MatchType.Demand : MatchType.Supply
      },
      errorPolicy: "all"
    });

    if (
      mutation.errors &&
      mutation.errors[0].extensions?.code == "TOO_MANY_RECIPIENT"
    ) {
      result.error = context.app.i18n.t('connect.errors.recipient_' + params.flow, result) as string;
    } else if (
      mutation.errors &&
      mutation.errors[0].extensions?.code == "TOO_MANY_REQUESTS"
    ) {
      result.error = context.app.i18n.t('connect.errors.stop') as string;
    } else if (
      mutation.errors
    ) {
      result.error = context.app.i18n.t('connect.errors.unkown', {
        error: mutation.errors[0].extensions?.requestid ?? mutation.errors[0].message,
      }) as string;
    }

    return result;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  overflow-y: auto;
  padding: 50px;
}

h1 {
  padding-top: 81px;
  padding-bottom: 21px;
  text-align: center;
}

.error {
  color: $secondary;
}

p {
  max-width: 600px;
  text-align: center;
}

.buttons {
  padding-top: 76px;

  button {
    width: 260px;
    margin-left: 24px;
  }
}

.images {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .frame {
    width: 250px;
    height: 250px;

    border-radius: 50%;
    border: 5px solid $border;

    &:nth-of-type(odd) {
      transform: translateX(20px);
    }

    &:nth-of-type(even) {
      transform: translateX(-20px);
    }
  }

  .img {
    margin: 50px;
    width: 150px;
    height: 150px;

    object-fit: cover;

    -webkit-mask: url(/icons/user.svg) no-repeat center;
    mask: url(/icons/user.svg) no-repeat center;
  }

  .left {
    background-color: $primary;
  }

  .right {
    background-color: $secondary;
  }
}

@media only screen and (max-width: $breakpoint_sm) {
 .images {
    .frame {
      border: 3px solid $border;
      width: 150px !important;
      height: 150px !important;
    }

    .img {
      margin: 35px;
      width: 80px !important;
      height: 80px !important;
    }
  }

  .buttons {
    text-align: center;

    button {
      margin-top: 12px;
    }
  }
}
</style>
