<template>
  <div class="root">
    <hdr>Ich suche</hdr>
    <item v-for="(element) in demands" :key="element.id">
      <lnk
        :text="element.name"
        :target="'/dashboard/match/demand/' + element.id"
        :selected="element.id == selected"
      />
    </item>
    <item>
      <lnk :text="'Teams verwalten'" :target="'/register/demand/team'" />
    </item>

    <hdr>Ich biete</hdr>
    <item v-for="(element) in supplies" :key="element.id">
      <lnk
        :text="element.name"
        :target="'/dashboard/match/supply/' + element.id"
        :selected="element.id == selected"
      />
    </item>
    <item>
      <lnk :text="'Teams verwalten'" :target="'/register/supply/team'" />
    </item>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import lnk from "@/components/navbar/link.vue";
import item from "@/components/navbar/item.vue";
import hdr from "@/components/navbar/header.vue";

import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.MenuitemsTeams,
  components: { lnk, item, hdr }
})
export default class extends Vue {
  @Prop() demands!: any[];
  @Prop() supplies!: any[];

  @Prop() flow!: string;
  @Prop() selected!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.root {
  width: 100%;
}
</style>
