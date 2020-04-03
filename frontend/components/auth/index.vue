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

<script>
import login from "./login.vue";
import register from "./register.vue";
import validate from "./validate.vue";
import reset from "./reset.vue";
import newpassword from "./new.vue";

export default {
  components: {
    login,
    register,
    validate,
    reset,
    newpassword
  },

  methods: {
    handleStateChange(event, value) {
      console.debug("handleStateChange", event);

      if (event === "redirect") {
        if (!this.target_route) {
          this.$emit("user-authenticated");
        } else {
          this.$router.push(value || this.target_route || "/");
        }
      } else if (event === "back") {
        this.$router.back();
      } else {
        this.state = event;
      }
    }
  },

  data() {
    return {
      state: this.start_component
    };
  },

  props: {
    start_component: {
      type: String,
      default: "login"
    },
    target_route: String
  }
};
</script>
