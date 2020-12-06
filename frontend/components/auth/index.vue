<template>
  <div>
    <div v-if="state == 'login'">
      <login @change-state="handleStateChange" />
    </div>
    <div v-if="state == 'newPassword'">
      <newPassword @change-state="handleStateChange" />
    </div>
    <div v-if="state == 'validate'">
      <validate @change-state="handleStateChange" />
    </div>
    <div v-if="state == 'reset'">
      <reset @change-state="handleStateChange" />
    </div>
    <div v-if="state == 'new'">
      <newpassword @change-state="handleStateChange" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from "nuxt-class-component";
import { Vue, Prop } from "nuxt-property-decorator";

import login from "./login.vue";
import validate from "./validate.vue";
import reset from "./reset.vue";
import newpassword from "./new.vue";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.AuthIndex,
  components: {
    login,
    validate,
    reset,
    newpassword,
  }
})
export default class extends Vue {
  @Prop({ type: String, required: false, default: "login" })
  readonly start_component!: String;

  @Prop({ type: String, required: false })
  readonly target_route!: any;

  @Prop({ type: Object, required: false })
  readonly registration!: any;

  state: String = '';

  mounted() {
    this.state = this.start_component;
    this.$track("authentication", this.start_component as string);
  }

  handleStateChange(event: string, value?: string) {
    this.$track('authentication', event, value);

    if (event === "redirect") {
      // console.log("target route", this.target_route);

      if (!this.target_route) {
        this.$emit("user-authenticated");
      } else {
        this.$router.push(value || this.target_route as string || "/");
      }
    } else if (event === "back") {
        this.$emit("back");
    } else {
      this.state = event;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
