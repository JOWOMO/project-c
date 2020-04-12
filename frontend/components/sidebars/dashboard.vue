<template>
  <layout class="dashboard-sidebar" :columns="false">
    <row :height="216">
      <nuxt-link to="/" class="logo">
        <img width="234px" height="37px" src="/images/logo.svg" />
      </nuxt-link>
    </row>
    <row class="menu">
      <div class="section">
        <h4>Mein Bedarf</h4>
        <div v-for="(element) in demands" :key="'d_' + element.id">
          <div
            @click="changeTeam(element)"
            :class="{'element': true, 'selected': element.id == selected && flow == 'demand'}"
          >
            <img
              v-if="selected == element.id && flow == 'demand'"
              height="16"
              width="16"
              src="/icons/arrow-right.svg"
            />
            <p>{{ element.name }}</p>
          </div>
        </div>
        <div class="link">
          <nuxt-link to="/register/demand/team">Teams verwalten</nuxt-link>
        </div>
      </div>

      <div class="section">
        <h4>Meine Gesuche</h4>
        <div v-for="(element) in supplies" :key="'s_' + element.id">
          <div
            @click="changeTeam(element)"
            :class="{'element': true, 'selected': element.id == selected && flow == 'supply'}"
          >
            <img
              v-if="selected == element.id && flow == 'supply'"
              height="16"
              width="16"
              src="/icons/arrow-right.svg"
            />
            <p>{{ element.name }}</p>
          </div>
        </div>
        <div class="link">
          <nuxt-link to="/register/supply/team">Teams verwalten</nuxt-link>
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

  created() {
    console.log("navbar", this.flow, this.selected);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.dashboard-sidebar {
  background: $uiComponent;
  min-height: 100vh;

  .logo {
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 39px;
  }
}

.menu {
  display: flex;
  width: 100%;

  margin-left: 48px;

  flex-direction: column;
  justify-content: center;

  .section + .section {
    padding-top: 44px;
  }

  .element {
    display: flex;
    flex-direction: row;
    cursor: pointer;

    margin-top: 16px;

    img {
      margin: 4px 0;
    }

    p {
      margin-left: 20px;
    }

    p:hover {
      color: $primary;
    }
  }

  .selected p {
    margin-left: 10px;
    color: $inputtextcolor;
    font-weight: 500;

    &:hover {
      color: $inputtextcolor;
    }
  }

  .link {
    padding-top: 24px;
  }

  a {
    font-size: 14px;
  }
}
</style>
