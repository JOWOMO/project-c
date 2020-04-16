<template>
  <navBar :key="$route.path" :horizontal="horizontal">
    <slot name="header"></slot>

    <hdr v-if="!horizontal">Navigation</hdr>
    <item v-if="!horizontal" :selected="is('/')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Startseite'" :target="'/'" />
    </item>
    <item :selected="isPath('/info/faq')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'FAQ'" :target="'/info/faq'" />
    </item>

    <item v-if="horizontal">
      <button :class="{'primary': true, 'down': !horizontal}" @click.prevent="logon">Einloggen</button>
    </item>
    <button v-else :class="{'primary': true, 'down': !horizontal}" @click.prevent="logon">Einloggen</button>

    <slot name="footer"></slot>
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
import hdr from "./header.vue";

@Component({ components: { navBar, lnk, item, hdr } })
export default class extends Vue {
  @Prop({ default: true }) horizontal!: boolean;

  logon() {
    this.$router.push("/login");
    this.$track('navigation', 'login from nav bar')
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
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  min-width: calc(100% - 48px);
}
</style>
