<template>
</template>

<script lang="ts">
import { Vue, Component, State } from "nuxt-property-decorator";
import { IState } from "@/store";
import { CognitoUser } from "@aws-amplify/auth";
import { Context } from "@nuxt/types";

@Component
export default class extends Vue {
  // @State((s: IState) => s.auth.user)
  // user!: any;

  // @State((s: IState) => s.match.demands)
  // dem!: { id: string }[];

  // @State((s: IState) => s.match.supplies)
  // sup!: { id: string }[];

  async created() {
    await this.$swal.alert(
      this.$t('register.notfinished.title') as string,
      this.$t('register.notfinished.subtitle') as string,
      'info'
    );

    this.$router.replace(`/`);
  }

  async asyncData(context: Context) {
    console.debug('created called');

    const state: IState = context.store.state;

    if (state.match.demands.length > 0) {
      context.redirect(301, `/dashboard/match/demand/${state.match.demands[0].id}`);
      return;
    }

    if (state.match.supplies.length > 0) {
      context.redirect(301, `/dashboard/match/supply/${state.match.supplies[0].id}`);
      return;
    }

    // @ts-ignore
    if (state.auth.user && state.auth.user?.attributes?.profile) {
      // @ts-ignore
      this.$router.replace(`/register/${state.auth.user.attributes.profile}`);
    }
  }
}
</script>
