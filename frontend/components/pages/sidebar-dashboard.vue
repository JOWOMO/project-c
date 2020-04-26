<template>
  <sidebar>
    <sec name="Ich suche">
      <item
        v-for="(team) in demands"
        :key="team.id"
        :name="team.name"
        :to="'/dashboard/match/demand/' + team.id"
        :selected="team.id == selected"
      />

      <div class="manage">
      <nuxt-link to="/register/demand/team">Teams verwalten</nuxt-link>
      </div>
    </sec>

    <sec name="Ich biete">
      <item
        v-for="(team) in supplies"
        :key="team.id"
        :name="team.name"
        :to="'/dashboard/match/supply/' + team.id"
        :selected="team.id == selected"
      />

      <div class="manage">
        <nuxt-link to="/register/supply/team">Teams verwalten</nuxt-link>
      </div>
    </sec>
  </sidebar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

import sidebar from "@/components/sidebar/bar.vue";
import item from "@/components/sidebar/item.vue";
import sec from "@/components/sidebar/section.vue";

@Component({
  components: { sidebar, item, sec }
})
export default class extends Vue {
  @Prop() demands!: any[];
  @Prop() supplies!: any[];

  @Prop() flow!: string;
  @Prop() selected!: string;
}
</script>

<style lang="scss" scoped>
.manage {
  padding-top: 24px;
  a { font-size: 14px; }
}
</style>
