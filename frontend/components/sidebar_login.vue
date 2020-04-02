<template>
  <aside class="b2b-register-sidebar">
    <nuxt-link to="/"><img src="/images/logo.svg"></nuxt-link>

    <div v-for="label in labels" :key="label.label" class="b2b-sidebar-element-wrapper">
      <div class="b2b-sidebar-element"> <!-- v-bind:class="{active:this.$store.state.positions.profile}" -->
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

</style>
