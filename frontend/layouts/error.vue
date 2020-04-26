<template>
  <div class="container">
    <div class="message">{{ message }}</div>

    <div class="buttons">
      <button @click="home" class="primary">{{ $t('errorpage.home') }}</button>

      <button v-if="supportAvailable" @click="feedback" class="cta">Feedback</button>
    </div>

    <div class="background">
      <div class="code">{{ code }}</div>

      <img src="/images/error/ship.svg" />
    </div>
  </div>
</template>

<script lang="ts">
const DURATION = 10;
import { Vue, Component, Prop, State } from "nuxt-property-decorator";
import { GraphQLError } from "graphql";
import { IState } from "../store";

@Component
export default class extends Vue {
  @State((s: IState) => s.support.available)
  supportAvailable!: any;

  @Prop()
  error!: any;

  get code() {
    return this.error.statusCode || 500;
  }

  feedback() {
    this.$store.commit("support/show");
  }

  home() {
    this.$router.replace("/");
  }

  get id() {
    // hard failure
    if (this.error.networkError?.result?.requestid) {
      return this.error.networkError?.result?.requestid;
    }

    // graphQL error
    if (this.error.graphQLErrors && this.error.graphQLErrors.length > 0) {
      const first = this.error.graphQLErrors[0] as GraphQLError;
      if (first.extensions?.requestid) {
        return first.extensions?.requestid;
      }
    }

    if (this.error.statusCode === 404) {
      return this.$route.fullPath;
    }

    return null;
  }

  get message() {
    try {
      // CORS error or server not reachable
      if (this.error.networkError?.message == "Failed to fetch") {
        return this.$t("errorpage.noservice");
      }

      // hard failure
      if (this.error.networkError?.result || this.error.graphQLErrors) {
        return this.$t("errorpage.trace", {
          code: this.id
        });
      }

      if (
        this.error.statusCode === 404 &&
        this.error.message == "This page could not be found"
      ) {
        return this.$t("errorpage.notfound");
      }
    } catch (e) {
      console.error("Failed to extract error", e);
    }

    return this.error.message;
  }

  capture() {
    if (this.error.networkError) {
      this.$sentry.captureException(this.error.networkError);
    }

    if (this.error.graphQLErrors) {
      for (const err of this.error.graphQLErrors) {
      }
    }

    if (this.error instanceof Error) {
      this.$sentry.captureException(this.error);
    }
  }

  created() {
    console.error("Unhandeled exception", this.error);

    this.$store.commit("support/context", {
      text: `Fehler ${this.id}`,
      isError: true
    });

    this.capture();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.container {
  display: block;
  flex-direction: column;
  padding-bottom: 0 !important;

  .background {
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100vw;
    height: 100px;

    background: url(/images/error/ocean.svg) no-repeat top center;
    z-index: 1;

    img {
      position: fixed;

      bottom: 20px;
      left: $gridsize;

      width: 150px;
      animation: moveShip 10s infinite;
    }
  }

  .code {
    position: fixed;
    z-index: 3;

    color: $secondary;
    font-size: 20px;

    bottom: $gridsize/4;
    left: $gridsize/4;
  }

  .message {
    width: 100vw;
    text-align: center;
    z-index: 3;

    padding-left: $gridsize/2;
    padding-right: $gridsize/2;

    font-size: 24px;
    font-weight: 500;

    color: $headercolor;

    padding-bottom: $gridsize;
  }

  .buttons {
    display: flex;

    button + button {
      margin-left: $gridsize / 2;
    }
  }
}

@media only screen and (max-width: $breakpoint_sm) {
  .container {
    .buttons {
      flex-direction: column;

      button + button {
        margin-left: 0;
        margin-top: $gridsize / 2;
      }
    }
  }
}

@keyframes moveShip {
  0% {
    transform: translateX(0);
  }

  50% {
    // need to compensate ship size and left padding
    transform: translateX(calc(100vw - 150px - #{$gridsize + $gridsize/2}));
  }

  100% {
    transform: translateX(0);
  }
}
</style>
