<template></template>

<script lang="ts">
import { Vue, Component, State } from "nuxt-property-decorator";
import { InjectReactive } from "vue-property-decorator";
import { IState } from "@/store";
import { CognitoUser } from "@aws-amplify/auth";

@Component
export default class extends Vue {
  @State((s: IState) => s.auth.user)
  user!: any;

  @InjectReactive("all-demands")
  dem!: { id: string }[];

  @InjectReactive("all-supplies")
  sup!: { id: string }[];

  async created() {
    if (this.dem.length > 0) {
      this.$router.replace(`/dashboard/demand/${this.dem[0].id}`);
      return;
    } else {
      this.$track('dashboard', 'found no demands')
    }

    if (this.sup.length > 0) {
      this.$router.replace(`/dashboard/supply/${this.sup[0].id}`);
      return;
    } else {
      this.$track('dashboard', 'found no supplies')
    }

    this.$router.replace(`/register`);
    this.$track('dashboard', 'redirect to register')
  }
}
</script>
