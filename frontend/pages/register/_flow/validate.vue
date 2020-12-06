<template>
  <validate @change-state="handleStateChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
import validate from "@/components/auth/validate.vue";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.PagesRegisterFlowValidate,
  components: {
    validate
  },
  middleware: "authenticated"
})
export default class extends Vue {
  mounted() {
    this.$track("registration", "validate:start");
    this.$store.commit("register/position", 0);
  }

  @Emit("change-state")
  handleStateChange(event: string, value: any) {
    if (event === "redirect") {
      this.$track("registration", "validate:ok");
      this.$router.replace(`/register/${this.$route.params.flow}/company`);
    } else if (event === "back") {
      this.$track("registration", "validate:cancel");
      this.$router.replace(`/register/${this.$route.params.flow}`);
    }
  }
}
</script>

<style lang="scss" scoped>
// we normally come from the register flow. we make the container
// the same size

.container {
  min-width: 800px;
}

@import "@/assets/form-layout-responsive";

/deep/ .buttons {
  display: flex;
  justify-content: flex-end !important;

  button {
    max-width: 200px !important;
  }
}
</style>
