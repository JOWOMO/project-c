<template>
  <div v-if="isAuthenticated" @click="openform" :class="'style ' + styles">
    <div class="text">Feedback</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, State, Watch } from "nuxt-property-decorator";

import {
  SupportRequestMutation,
  SupportRequestMutationVariables
} from "@/apollo/schema";

import supportMutation from "@/apollo/mutations/support.gql";
import { IState } from "../store";

@Component
export default class extends Vue {
  @State((s: IState) => s.support.show)
  show!: boolean;

  @State((s: IState) => s.support.context)
  context!: string;

  @State((s: IState) => s.support.isError)
  isError!: boolean;

  @State((s: IState) => s.auth.isAuthenticated)
  isAuthenticated!: boolean;

  @Watch('isAuthenticated', {immediate: true})
  updateStore(val: boolean) {
    this.$store.commit('support/available', val);
  }

  @Prop({ default: "nav" })
  position!: string;

  get styles() {
    if (this.position === "tag") {
      return "help-tags cta";
    }

    switch (this.$mq) {
      case "sm":
      case "md":
        return "help-right primary";

      // return "help-left-middle";
      // case "lg":
      // case "vl":

      default:
        // return this.position === 'nav' ?  "help-left-nav" : 'help-left';
        return "help-left primary";
    }
  }

  @Watch('show', {immediate: true})
  showChanged(newVal: boolean) {
    if (newVal == true) {
      this.openform();
    }
  }

  async openform() {
    this.$track("support", "open");

    const title = this.isError
      ? "feedback.errorreport.title"
      : this.position === "tag"
        ? "feedback.tag.title"
        : "feedback.title";

    const text = this.isError
      ? "feedback.errorreport.text"
      : this.position === "tag"
        ? "feedback.tag.text"
        : "feedback.text";

    const result = await this.$swal.feedback(
      this.$t(title) as string,
      "",
      this.$t(text) as string
    );

    const context =
      this.position === "tag"
        ? this.$t("feedback.tag.context")
        : this.context ?? "zu JOWOMO";

    if (result.value) {
      this.$track("support", "ok");

      try {
        await this.$apollo.mutate<
          SupportRequestMutation,
          SupportRequestMutationVariables
        >({
          mutation: supportMutation,
          variables: {
            summary: this.$t("feedback.message", { context }) as string,
            description: result.value,
            page: window.location.origin + this.$route.fullPath
          }
        });

        this.$swal.alert(
          this.$t("feedback.success.title") as string,
          this.$t("feedback.success.text") as string,
          "info"
        );
      } catch (err) {
        this.$sentry.captureException(err);
        this.$track("support", "failed");

        this.$swal.alert(
          this.$t("feedback.error.title") as string,
          err.message,
          "error"
        );
      }
    } else {
      this.$track("support", "cancel");
    }

    this.$store.commit('support/close')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scales";
@import "@/assets/colors";

.style {
  cursor: pointer;
  display: flex;
  flex: 1;

  white-space: nowrap;

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;

  justify-content: center;
  align-items: center;

  font-size: 12px;

  background-color: $primary;
  color: white;

  box-shadow: 0 3px 3px 0 rgba(#000000, 0.2);
  z-index: 1000;
}

.help-right {
  position: fixed;

  width: $gridsize/2 - 4px;
  margin-right: -3px;

  height: $gridsize * 2;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  right: 0;
  // top: 120px + 10px;
  top: calc(50% - #{$gridsize});

  .text {
    transform: rotate(90deg);
  }
}

.help-left-nav,
.help-left {
  position: fixed;

  width: $gridsize/2;
  height: $gridsize * 2;

  top: calc(50% - #{$gridsize});

  .text {
    transform: rotate(-90deg);
  }
}

.help-left-nav {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  left: 330px - $gridsize/2;
}

.help-left {
  left: 0;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.help-tags {
  position: fixed;

  width: $gridsize * 2 - 10px;
  height: $gridsize/2;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  right: 52px;
  top: 119px;

  // .text {
  //   transform: rotate(-90deg);
  // }
}

@media only screen and (max-width: $breakpoint_sm) {
  .help-tags {
    right: 28px;
  }
}

// .help-left-middle {
//   position: fixed;

//   width: $gridsize/2 - 4px;
//   margin-right: -3px;

//   height: $gridsize * 2;

//   border-top-right-radius: 8px;
//   border-bottom-right-radius: 8px;

//   left: 0;
//   top: calc(50% - #{$gridsize});

//   .text {
//     transform: rotate(-90deg);
//   }
// }

// .help-bottom {
//   position: fixed;

//   width: $gridsize * 2;
//   height: $gridsize/2;

//   border-top-left-radius: 8px;
//   border-top-right-radius: 8px;

//   left: calc(50% - #{$gridsize});
//   bottom: 0;
// }
</style>
