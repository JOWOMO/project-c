<template>
  <aside class="register-sidebar">
    <nuxt-link to="/"><img src="/images/logo.svg"></nuxt-link>
    <p>Hallo</p>
     <p>{{ model }}</p>
     <!-- <div v-for="label in model" :key="label.label" class="sidebar-element-wrapper">
      <div class="sidebar-element"> 
        <img v-if="label.state.editing" src="/icons/arrow-left.svg">
        <img v-if="label.state.passed" src="/icons/checkmark.svg">
        <div class="circle">
          <p>{{ label.number }}</p>
        </div>
      </div> -->

    <!-- </div> -->
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
   model:Object
  }
};
</script>

<style lang="scss" scoped>
// @import "~assets/global.scss";

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

      .circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #DA2566;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          color: #fff;
          font-size: 18px;
          font-weight: normal;
        }
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
