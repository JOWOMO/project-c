<template>
  <div class="container">
    <div class="images">
      <div class="frame">
        <div class="img left" />
      </div>
      <div class="frame">
        <div class="img right" />
      </div>
    </div>

    <h1>{{ $t('response.title', {first: data.firstName, last: data.lastName}) }}</h1>
    <h2>{{ $t('response.text', {first: data.firstName, last: data.lastName}) }}</h2>

    <p class="padding2">{{data.name}}</p>
    <p>{{data.firstName}} {{data.lastName}}</p>
    <p>{{data.addressLine1}}, {{data.postalCode}} {{data.city}}</p>
    <p class="padding email">{{data.email}}</p>

    <div class="padding2 buttons">
      <button class="cta" @click.prevent="email">{{ $t('response.answer') }}</button>
      <button class="primary" @click.prevent="nomatch">{{ $t('response.no_match') }}</button>
    </div>

    <div class="buttons">
      <button class="secondary" @click.prevent="faq">{{ $t('response.faq') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import {
  SetMatchStateMutation,
  SetMatchStateMutationVariables,
  MatchDetails,
  MatchAnswer
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

  faq() {
    this.$track("connect", "faq");
    this.$router.push("/info/faq");
  }

  async response(answer: MatchAnswer) {
    const response = await this.$apollo.mutate<
      SetMatchStateMutation,
      SetMatchStateMutationVariables
    >({
      mutation: connectMutation,
      variables: {
        id: this.$route.params.id!,
        answer: MatchAnswer.Accept,
      },
      errorPolicy: "all"
    });

    return response;
  }

  async email() {
    this.$track("connect", "accept");
    await this.response(MatchAnswer.Accept);

    window.open(
      `mailto:${this.data.email}?subject=${this.$t("response.mail")}`
    );
  }

  created() {
    this.$track("connect", "open");
    this.$store.commit("support/context", `zum Match`);
  }

  async nomatch() {
    this.$track("connect", "reject");
    await this.response(MatchAnswer.Reject);

    this.$swal.alert(
      this.$t('response.thanks.title') as string,
      // this.$t('response.thanks.text', {first: this.data.firstName, last: this.data.lastName}) as string,
      '',
      'success'
    );
  }

  async asyncData(context: Context) {
    let result: Partial<Pick<this, "data">> = {};

    const client = context.app.apolloProvider!.defaultClient;
    const mutation = await client.mutate<
      SetMatchStateMutation,
      SetMatchStateMutationVariables
    >({
      mutation: connectMutation,
      variables: {
        id: context.params.id!,
        answer: MatchAnswer.Opened
      },
      errorPolicy: "all"
    });

    if (mutation.errors && mutation.errors[0].extensions?.code == "NOT_FOUND") {
      context.error({
        statusCode: 404,
        message: context.app.i18n.t("response.errors.notfound") as string
      });
    } else if (mutation.errors) {
      context.error({
        statusCode: 500,
        message: context.app.i18n.t("response.errors.unknown", {
          error: mutation.errors[0].extensions?.requestid ?? mutation.errors[0].message
        }) as string
      });
    } else {
      result.data = mutation.data!.setMatchState!;
    }

    return result;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.container {
  display: block;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  overflow-y: auto;
  padding: 50px;
}

h1 {
  padding-top: $gridsize * 2;
  padding-bottom: $gridsize/2;
  text-align: center;
}

h2 {
  text-align: center;
}

p {
  text-align: center;
}

.email {
  color: $headercolor;
}

.padding2 {
  padding-top: $gridsize;
}

.padding {
  padding-top: $gridsize/2;
}

.padding3 {
  padding-top: $gridsize * 1.5;
}

.buttons {
  text-align: center;

  button {
    width: 260px;
  }

  button + button {
    margin-left: $gridsize/2;
  }
}

.buttons + .buttons {
  padding-top: $gridsize/2;
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

    button + button {
      margin-left: 0;
    }
  }
}
</style>
