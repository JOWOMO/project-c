<template>
  <auth v-bind:start_component="'register'" v-bind:target_route="'/register/company'" @back="back" />
</template>

<script lang="ts">
import { Vue, Component, Inject } from "nuxt-property-decorator";

import auth from "@/components/auth/index.vue";
import { WorkflowProvider } from "../register.vue";

@Component({
  components: {
    auth
  }
})
export default class extends Vue {
  @Inject("workflow") workflow!: WorkflowProvider;

  back() {
    this.$router.push("/");
  }

  created() {
    this.workflow().setStage(0);
  }
}
</script>

<style scoped lang="scss">
</style>
