<template>
  <div class="container">
    <div v-if="!error">
      <div class="images" v-if="!error">
        <img src="/icons/user.svg" />
        <img src="/images/profile.jpg" />
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
} from "../../apollo/schema";

import connectMutation from "@/apollo/mutations/connect.gql";

export type ConnectParams = {
  match: string;
  name: string;
  flow: string;
  pictureUrl?: string;
  origin: string;
};

@Component
export default class extends Vue {
  name: string = "";
  error: string = "";

  @Meta
  head() {
    return {
      title: "Wikommen",
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  dashboard() {
    this.$router.replace("/dashboard");
  }

  async asyncData(context: Context) {
    try {
      let result: Partial<Pick<this, "error" | "name">> = {};

      const params: ConnectParams = JSON.parse(atob(context.params.pathMatch));

      result.name = params.name;

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
        result.error = `Du hast ${params.name} schon einmal wegen ${"demand" ? 'dieses Gesuchs' : 'diesem Team'} kontaktiert. Wir haben Deine Anfrage nicht noch einmal weitergleitet. Bitte hab etwas Geduld.`;
      } else if (
        mutation.errors &&
        mutation.errors[0].message == "TOO_MANY_REQUESTS"
      ) {
        result.error = `Du hast heute schon zu viele Anfragen gestellt. Bitte versuch es Morgen noch einmal.`;
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

  img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 3px solid #00000010;
    object-fit: cover;

    &:nth-of-type(odd) {
      transform: translateX(20px);
    }
    &:nth-of-type(even) {
      transform: translateX(-20px);
    }
  }
}

@media only screen and (max-width: 765px) {
  .images {
    img {
      width: 150px !important;
      height: 150px !important;
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
