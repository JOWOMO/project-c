<template>
  <div v-if="isAuthenticated" @click="openform" :class="'style primary ' + styles">
    <div class="text">Feedback</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, State } from "nuxt-property-decorator";

import {
  SupportRequestMutation,
  SupportRequestMutationVariables
} from "@/apollo/schema";

import supportMutation from "@/apollo/mutations/support.gql";
import { IState } from "../store";

@Component
export default class extends Vue {
  @State((s: IState) => s.support.context)
  context!: boolean;

  @State((s: IState) => s.auth.isAuthenticated)
  isAuthenticated!: boolean;

  @Prop({default: 'nav'})
  position!: string;

  get styles() {
    switch (this.$mq) {
      case "sm":
      case "md":
        return "help-right";

        // return "help-left-middle";
      // case "lg":
      // case "vl":

      default:
        // return this.position === 'nav' ?  "help-left-nav" : 'help-left';
        return 'help-left';
    }
  }

  async openform() {
    const result = await this.$swal.feedback(
      'Was können wir besser machen?',
      '',
      'Erzählen uns von Deiner Idee für eine neue Funktion oder Verbesserung. Hat etwas nicht geklappt?'
    );

    if (result.value) {
      try {
        await this.$apollo.mutate<
          SupportRequestMutation,
          SupportRequestMutationVariables
        >({
          mutation: supportMutation,
          variables: {
            summary: `Dein Feedback ${this.context ?? 'zu'} JOWOMO`,
            description: result.value,
            page: window.location.origin + this.$route.fullPath,
          }
        });

        this.$swal.alert(
          'Wir haben Deine Anfrage erhalten!',
          'Vielen Dank für Deine Mühe, wir melden uns natürlich schnellstmöglich bei Dir zurück.',
          'info',
        );
      } catch (err) {
          console.error(err);
          this.$swal.alert("Das hat nicht geklappt", err.message, "error");
      }
    }
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

.help-left-nav, .help-left {
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
