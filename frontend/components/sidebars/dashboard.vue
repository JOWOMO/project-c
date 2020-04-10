<template>
  <layout :columns="false">
    <row :height="200">
      <nuxt-link to="/" class="logo">
        <img width="234px" height="37px" src="/images/logo.svg" />
      </nuxt-link>
    </row>
    <row>
      <div v-if="demands && demands.length >= 1">
        <div v-for="(element,index) in demands" :key="element.id" class="sidebar-element-wrapper">
          <div @click="changeTeam(element)" class="sidebar-element">
            <img v-if="selected == index && flow == 'demand'" src="/icons/arrow-left.svg" />
            <p>{{ element.name }}</p>
          </div>
        </div>
      </div>

      <div v-if="supplies && supplies.length >= 1">
        <div v-for="(element,index) in supplies" :key="element.id" class="sidebar-element-wrapper">
          <div @click="changeTeam(element)" class="sidebar-element">
            <img v-if="selected == index && flow == 'supply'" src="/icons/arrow-left.svg" />
            <p>{{ element.name }}</p>
          </div>
        </div>
      </div>
    </row>
  </layout>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";

import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  components: { layout, column, row }
})
export default class extends Vue {
  @Prop() demands!: any[];
  @Prop() supplies!: any[];

  @Prop() flow!: string;
  @Prop() selected!: string;

  changeTeam(team: any) {
    if (team.__typename == "Demand") {
      this.$router.push(`/dashboard/demand/${team.id}`);
    } else {
      this.$router.push(`/dashboard/supply/${team.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "~assets/global.scss";

// aside {
//   width: 350px;
//   height: 100vh;
//   background: #fff;
//   padding: 20px;
//   position: fixed;
//   left: 0;
//   top: 0;

//   .sidebar-element-wrapper {
//     cursor: pointer;
//   }

//   .wrapper-content {
//     margin-top: 50px;
//     .sidebar-element-wrapper {
//       position: relative;
//       transform: translate(5%, -50%);

//       .sidebar-element {
//         display: flex;
//         flex-direction: row;
//         img {
//           margin-right: 10px;
//         }
//         margin: 20px 0;
//         .circle {
//           width: 30px;
//           height: 30px;
//           border-radius: 50%;
//           background: #da2566;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;

//           p {
//             color: #fff;
//             font-size: 18px;
//             font-weight: normal;
//           }
//         }
//       }
//     }
//   }
// }

// @media only screen and (max-width: 1150px) {
//   aside {
//     width: 40vw;
//     z-index: 5;

//     .logo {
//       img {
//         width: 80%;
//       }
//     }
//   }
// }
// @media only screen and (max-width: 550px) {
//   aside {
//     width: 100vw;
//     z-index: 5;
//   }
// }
</style>
