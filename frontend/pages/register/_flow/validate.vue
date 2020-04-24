<template>
  <validate @change-state="handleStateChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
import validate from "@/components/auth/validate.vue";
import { Workflow } from "../../register.vue";
import { InjectReactive } from "vue-property-decorator";

@Component({
  components: {
    validate
  },
  middleware: "authenticated",
})
export default class extends Vue {
  @InjectReactive("workflow") workflow!: Workflow;

  @Emit('selectelement')
  setElement() {
    return 0;
  }

  mounted() {
   this.setElement();
  }

  @Emit("change-state")
  handleStateChange(event: string, value: any) {
    if (event === "redirect") {
      // user cannot go back here
      this.$router.replace(`/register/${this.workflow.type}/company`);
    } else if (event === "back") {
      this.$router.replace(`/register/${this.workflow.type}`);
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
