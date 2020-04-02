
<template>
  <div class="flow-container">
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
      console.debug('handleStateChange', event);
      
      if (event === "redirect") {
        this.$router.push(value || this.target_route || '/');
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
      default: 'login',
    },
    target_route: String,
    flow: {
      type: String,
      default: '',
    },
  }
};
</script>


<style lang="scss" scoped>
.flow-container /deep/ {
  h1 {
    grid-column: 2;
    grid-row: 1;
    justify-self: left;
    margin: 50px 0 0 10px;
  }

  p {
    grid-column: 2;
    grid-row: 2;
    margin-left: 10px;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    gap: 20px;
    justify-content: center;
    align-items: start;
    max-width: 800px;

    .form-group {
      grid-column: 1 / span 2;

      input,
      label,
      .error {
        width: 100%;
      }
    }

    .half-width {
      grid-column: 1;
    }
    .right {
      grid-column: 2;
    }

    .agb {
      grid-column: 1;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;

      input[type="checkbox"] {
        width: 21px;
        // display: inline-block;
        position: static;
      }

      label {
        width: auto;
        position: static;
      }
    }
  }
}

@media only screen and (max-width: 765px) {
  .flow /deep/ form {
    grid-template-columns: 1fr 0 !important;
    column-gap: 0 !important;

    .half-width {
      width: 100% !important;
      grid-column: 1 !important;
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
