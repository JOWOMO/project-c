<template>
  <navBar :key="$route.path">
    <item :selected="isSelected('/info/faq')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'FAQ'" :target="'/info/faq'" />
    </item>
    <item>
      <button class="primary" @click.prevent="logon">Anmelden</button>
    </item>
  </navBar>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Provide,
  Prop,
  Emit,
  Ref
} from "nuxt-property-decorator";
import navBar from "./bar.vue";
import lnk from "./link.vue";
import item from "./item.vue";

@Component({ components: { navBar, lnk, item } })
export default class extends Vue {
  logon() {
    this.$router.push('/login');
  }

  isSelected(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix.startsWith(l);
  }
}
</script>

<style scoped lang="scss">
</style>
