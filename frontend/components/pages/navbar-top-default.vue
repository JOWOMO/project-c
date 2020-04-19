<template>
  <navBar :horizontal="horizontal">
    <slot name="header"></slot>

    <hdr v-if="!horizontal">Navigation</hdr>
    <item v-if="!horizontal" :selected="is('/')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Startseite'" :target="'/'" />
    </item>
     <item :selected="isPath('/info/process')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Wie funktionierts?'" :target="'/info/process'" />
    </item>
    <item :selected="isPath('/info/about')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Über uns'" :target="'/info/about'" />
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
import navBar from "@/components/navbar/bar.vue";
import lnk from "@/components/navbar/link.vue";
import item from "@/components/navbar/item.vue";
import hdr from "@/components/navbar/header.vue";

@Component({ components: { navBar, lnk, item, hdr } })
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
@import '@/assets/scales';

.down {
  margin-top: $gridsize/2;
  margin-left: $gridsize/2;
  margin-right: $gridsize/2;
  min-width: calc(100% - #{$gridsize});
}
</style>
