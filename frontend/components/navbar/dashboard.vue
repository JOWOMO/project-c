<template>
  <div class="root">
    <hdr>Ich suche</hdr>
    <item v-for="(element) in demands" :key="'d_' + element.id">
      <lnk
        :text="element.name"
        :target="'/dashboard/demand/' + element.id"
        :selected="element.id == selected && flow == 'demand'"
      />
    </item>
    <item>
      <lnk :text="'Teams verwalten'" :target="'/register/demand/team'" />
    </item>

    <hdr>Ich biete</hdr>
    <item v-for="(element) in supplies" :key="'s_' + element.id">
      <lnk
        :text="element.name"
        :target="'/dashboard/supply/' + element.id"
        :selected="element.id == selected && flow == 'supply'"
      />
    </item>
    <item>
      <lnk :text="'Teams verwalten'" :target="'/register/supply/team'" />
    </item>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import lnk from "./link.vue";
import item from "./item.vue";
import hdr from "./header.vue";

import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
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
