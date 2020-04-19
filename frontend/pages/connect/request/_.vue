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

      <h1>{{ name }} wurde kontaktiert</h1>
      <p>Wir haben {{ name }} benachrichtigt. Wenn es klappt könnt ihr Euch persönlich über alle weiteren Details austauschen.</p>
    </div>
    <div v-else>
      <h1 class="error">Das hat leider nicht geklappt!</h1>
      <p>{{error}}</p>
    </div>

    <div class="buttons">
      <button class="primary" @click.prevent="dashboard">Meine Suchergebnisse</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";
import { Context } from "@nuxt/types";
import {
  ConnectMutation,
  ConnectMutationVariables,
  MatchType
} from "@/apollo/schema";

import connectMutation from "@/apollo/mutations/connect.gql";

export type ConnectParams = {
  match: string;
  name: string;
  flow: string;
  pictureUrl?: string;
  origin: string;
};

@Component({
  middleware: "authenticated"
})
export default class extends Vue {
  name: string = "";
  error: string = "";
  route: string = "";

  @Meta
  head() {
    return {
      title: "Wikommen",
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  dashboard() {
    this.$router.replace(this.route || "/welcome");
  }

  created() {
    this.$track('connect', this.error ? 'failed' : 'success', this.error);
  }

  async asyncData(context: Context) {
    try {
      let result: Partial<Pick<this, "error" | "name" | "route">> = {};

      const params: ConnectParams = JSON.parse(atob(context.params.pathMatch));
      console.debug('connect', params);

      result.name = params.name;
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
        mutation.errors[0].message == "TOO_MANY_RECIPIENT"
      ) {
        result.error = `Du hast ${params.name} schon einmal wegen ${
          "demand" ? "dieses Gesuchs" : "diesem Team"
        } kontaktiert. Wir haben Deine Anfrage nicht noch einmal weitergleitet. Bitte hab etwas Geduld.`;
      } else if (
        mutation.errors &&
        mutation.errors[0].message == "TOO_MANY_REQUESTS"
      ) {
        result.error = `Du hast heute schon zu viele Anfragen gestellt. Bitte versuch es Morgen noch einmal.`;
      } else if (
        mutation.errors
      ) {
        result.error = `Es ist ein unbekannter Fehler aufgetreten: ` + mutation.errors[0].message;
      }

      return result;
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
    }
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
