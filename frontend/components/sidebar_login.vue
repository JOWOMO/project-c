<template>
  <aside class="b2b-register-sidebar">
    <img src="/images/logo.svg">

    <div class="b2b-sidebar-element-wrapper">
      <div class="b2b-sidebar-element"> <!-- v-bind:class="{active:this.$store.state.positions.profile}" -->
        <img v-if="active" src="/icons/arrow-left.svg">
        <img v-elese src="/icons/checkmark.svg">
        <p>Deine Profildaten</p>
      </div>

      <div class="b2b-sidebar-element">
        <img v-if="active" src="/icons/arrow-left.svg">
        <img v-elese src="/icons/checkmark.svg">
        <p>Zum Unternehmen</p>
      </div>

      <div class="b2b-sidebar-element">
        <img v-if="active" src="/icons/arrow-left.svg">
        <img v-elese src="/icons/checkmark.svg">
        <p>Mein Team</p>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "sidebarLogin",
  computed: {
    ...mapGetters(["get_sidebar_position"])
  },
  watch: {
    positions: function(val) {
      console.log("val: ", val);
    }
  }
};
</script>

<style lang="scss" scoped>
aside {
  width: 400px;
  height: 100vh;
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;

  .b2b-sidebar-element-wrapper {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);

    .b2b-sidebar-element {
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
</style>
