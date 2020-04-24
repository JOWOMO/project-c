<template>
  <div class="container">
    <div>
      <div class="images">
        <div class="frame">
          <div class="img left" />
        </div>
        <div class="frame">
          <div class="img right" />
        </div>
      </div>

      <h1>{{data.firstName}} hat Dich gefunden!</h1>

      <h2>{{data.firstName}} {{data.lastName}}</h2>
      <p class="padding">{{data.name}}</p>
      <p>{{data.addressLine1}}, {{data.postalCode}} {{data.city}}</p>
      <p class="padding email">{{data.email}}</p>
    </div>

    <div class="buttons">
      <button class="primary" @click.prevent="email">Per E-Mail antworten</button>
      <button class="secondary" @click.prevent="faq">Fragen zur Abwicklung</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";
import { Context } from "@nuxt/types";
import {
  SetMatchStateMutation,
  SetMatchStateMutationVariables,
  MatchDetails,
} from "@/apollo/schema";

import connectMutation from "@/apollo/mutations/connect_state.gql";

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
  data!: MatchDetails;

  @Meta
  head() {
    return {};
  }

  faq() {
    this.$track('connect', 'faq');
    this.$router.push('/info/faq');
  }

  email() {
    this.$track('connect', 'mail');
    window.open(`mailto:${this.data.email}?subject=Ihre Nachricht über JOWOMO!`)
  }

  created() {
    this.$track('connect', 'response');
    this.$store.commit('support/context', `zum Match`);
  }

  async asyncData(context: Context) {
    try {
      let result: Partial<Pick<this, "data" >> = {};

      const client = context.app.apolloProvider!.defaultClient;
      const mutation = await client.mutate<
        SetMatchStateMutation,
        SetMatchStateMutationVariables
      >({
        mutation: connectMutation,
        variables: {
          id: context.params.id!,
        },
        errorPolicy: "all"
      });

      if (
        mutation.errors &&
        mutation.errors[0].message == "NOT_FOUND"
      ) {
        context.error({ statusCode: 404, message: 'Der Datensatz konnte nicht gefunden werden' });
      } else if (mutation.errors) {
        context.error({ statusCode: 500, message: `Es ist ein unbekannter Fehler aufgetreten: ` + mutation.errors[0].message });
      } else {
        result.data = mutation.data!.setMatchState!;
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

h2 {
  text-align: center;
}

p {
  max-width: 600px;
  text-align: center;
}

.email {
  color: $headercolor;
}

.padding {
  padding-top: $gridsize/2;
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
