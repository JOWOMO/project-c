<template>
  <aside class="b2b-register-sidebar">
    <span>logo</span>
    <h3>In nur drei Schritten geeignete Personalpartner finden</h3>

    <div class="b2b-sidebar-element-wrapper">
      <div class="b2b-sidebar-element" v-bind:class="{active:this.$store.state.positions.profile}">
        <div class="b2b-circle">
          <span>1</span>
        </div>
        <p>Deine Profildaten</p>
      </div>

      <div class="b2b-sidebar-element" v-bind:class="{active:this.$store.state.positions.company}">
        <div class="b2b-circle">
          <span>2</span>
        </div>
        <p>Zum Unternehmen</p>
      </div>

      <div class="b2b-sidebar-element" v-bind:class="{active:this.$store.state.positions.team}">
        <div class="b2b-circle">
          <span>3</span>
        </div>
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
  background: deepskyblue;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;

  span {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }

  h3 {
    color: #fff;
    margin: 40px 0 60px 0;
    font-size: 24px;
    font-weight: normal;
  }

  .b2b-sidebar-element {
    display: flex;
    flex-direction: row;
    margin: 20px 0 20px 0;

    .b2b-circle {
      border-radius: 50%;
      border: 2px solid #fff;
      width: 50px;
      height: 50px;
      display: inline-block;
      margin: 15px;

      span {
        color: #fff;
        font-size: 18px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
      }
    }

    p {
      margin-left: 20px;
      color: #fff;
      font-size: 20px;
      line-height: 80px;
      font-weight: normal;
    }
  }

  .active {
    .b2b-circle {
      background: #fff;

      span {
        color: deepskyblue;
        font-weight: bold;
      }
    }

    p {
      font-weight: bold;
    }
  }
}
</style>
