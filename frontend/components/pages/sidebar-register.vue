<template>
  <sidebar class="sidebar">
    <sec name="Kostenlos registrieren" class="menu">
      <item
        v-for="(label, index) in labels"
        :key="index"
        :name="label"
        :selected="index === selectedElement"
        :checked="index < selectedElement"
      />
    </sec>
  </sidebar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";

import sidebar from "@/components/sidebar/bar.vue";
import item from "@/components/sidebar/item.vue";
import sec from "@/components/sidebar/section.vue";

@Component({ components: { sidebar, item, sec } })
export default class extends Vue {
  @Prop({ type: Number, required: true }) readonly selectedElement!: Number;
  @Prop({ type: Array, required: true }) readonly labels!: string[];
}
</script>

<style lang="scss" scoped>
</style>
