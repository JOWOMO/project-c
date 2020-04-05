<template>
  <div>
    <div v-if="state == 'login'">
      <login @change-state="handleStateChange" />
    </div>
    <div v-if="state == 'register'">
      <register @change-state="handleStateChange" />
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
import register from "./register.vue";
import validate from "./validate.vue";
import reset from "./reset.vue";
import newpassword from "./new.vue";

@Component({
  components: {
    login,
    register,
    validate,
    reset,
    newpassword
  }
})
export default class Auth extends Vue {
  @Prop({ type: String, required: false, default: "Login" })
  readonly start_component!: String;

  @Prop({ type: String, required: false }) 
  readonly target_route!: any;

  state: String = this.start_component;

  handleStateChange(event: string, value?: string) {
    console.debug("handleStateChange", event);
    
    if (event === "redirect") {
      console.log("target route", this.target_route);

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
* /deep/ {
  @import '@/assets/form-layout-single';
}
</style>
