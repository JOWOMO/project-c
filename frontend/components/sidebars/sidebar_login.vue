<template>
  <aside class="register-sidebar">
    <nuxt-link to="/"><img src="/images/logo.svg"></nuxt-link>

    <div v-for="label in labels" :key="label.label" class="sidebar-element-wrapper">
      <div class="sidebar-element"> <!-- v-bind:class="{active:this.$store.state.positions.profile}" -->
        <img v-if="label.state.editing" src="/icons/arrow-left.svg">
        <img v-if="label.state.passed" src="/icons/checkmark.svg">
        <p>{{ label.label }}</p>
      </div>

    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "sidebar",
  computed: {
    ...mapGetters(["get_sidebar_position"])
  },
  watch: {
    positions: function(val) {
      console.log("val: ", val);
    }
  },
  props:{
   labels:Array
  }
};
</script>

<style lang="scss" scoped>
aside {
  width: 350px;
  height: 100vh;
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;

  .sidebar-element-wrapper {
    position: relative;
    top: 10%;
    transform: translate(0, -50%);

    .sidebar-element {
      display: flex;
      flex-direction: row;
      margin: 20px 0;

      p {
        margin-left: 20px;
        color: #000;
        font-size: 18px;
        font-weight: normal;
      }
    }
  }
}

@media only screen and (max-width: 950px){
  aside {
    display: none;
  }
}
</style>
