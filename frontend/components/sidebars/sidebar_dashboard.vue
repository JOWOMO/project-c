<template>
  <aside class="register-sidebar">
    <nuxt-link to="/" class="logo">
      <img src="/images/logo.svg" />
    </nuxt-link>
    <div class="wrapper-content">
      <div @click="print" v-if="demand">
        <p v-if="demand.length >= 1">Ich suche</p>
        <div v-for="(element,index) in demand" :key="element.id" class="sidebar-element-wrapper">
          <div @click="changeTeam(element,index)" class="sidebar-element">
            <img v-if="pointerDemands[index]" src="/icons/arrow-left.svg" />
            <p>{{ element.name }}</p>
          </div>
        </div>
      </div>

      <div @click="print" v-if="supply">
        <p v-if="supply.length >= 1">Ich biete</p>
        <div v-for="(element,index) in supply" :key="element.name" class="sidebar-element-wrapper">
          <div @click="changeTeam(element,index)" class="sidebar-element">
            <img v-if="pointerSupplies[index]" src="/icons/arrow-left.svg" />
            <p>{{ element.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <nuxt-link to="/edit/team?flow=search">Teams verwalten</nuxt-link>
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
  props: {
    demand: Array,
    supply: Array,
    flow: String
  },
  data() {
    return {
      pointerDemands: [true],
      pointerSupplies: []
    };
  },
  updated() {
    this.print();
    console.log("demand/supply", this.demand, this.supply);
  },
  methods: {
    print() {
      console.log("demands", this.demand);
    },
    changeTeam(team, index) {
      this.pointerDemands = [];
      this.pointerSupplies = [];
      console.log("type:", team.__typename);
      if (team.__typename == "Demand") {
        this.pointerDemands[index] = { active: true };
      } else {
        this.pointerSupplies[index] = { active: true };
      }
      this.$emit("handel-state", team, index);
    }
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
    cursor: pointer;
  }

  .wrapper-content {
    margin-top: 50px;
    .sidebar-element-wrapper {
      position: relative;
      transform: translate(5%, -50%);

      .sidebar-element {
        display: flex;
        flex-direction: row;
        img {
          margin-right: 10px;
        }
        margin: 20px 0;
        .circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #da2566;
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
}

@media only screen and (max-width: 1150px) {
  aside {
    width: 40vw;
    z-index: 5;

    .logo {
      img {
        width: 80%;
      }
    }
  }
}
@media only screen and (max-width: 550px) {
  aside {
    width: 100vw;
    z-index: 5;
  }
}
</style>
