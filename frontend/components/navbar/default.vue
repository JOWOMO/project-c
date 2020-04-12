<template>
  <navBar :key="$route.path" :horizontal="horizontal">
    <item v-if="!horizontal" :selected="is('/')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Startseite'" :target="'/'" />
    </item>
    <item :selected="isPath('/info/faq')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'FAQ'" :target="'/info/faq'" />
    </item>
    <item>
      <button :class="{'primary': true, 'down': !horizontal}" @click.prevent="logon">Einloggen</button>
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
  @Prop({ default: true }) horizontal!: boolean;

  logon() {
    this.$router.push("/login");
  }

  is(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix == '/';
  }

  isPath(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix.startsWith(l);
  }
}
</script>

<style scoped lang="scss">
.down {
  margin-top: 48px;
}
</style>
