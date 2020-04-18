<template>
  <navBar :horizontal="horizontal">
    <slot name="header"></slot>

    <hdr v-if="!horizontal">Navigation</hdr>
    <item v-if="!horizontal" :selected="is('/')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Startseite'" :target="'/'" />
    </item>
    <item :selected="isPath('/dashboard')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Meine Partner'" :target="'/dashboard'" />
    </item>
    <item :selected="isPath('/info/faq')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Wie funktionierts?'" :target="'/info/faq'" />
    </item>
    <item :selected="isPath('/info/about')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Über uns'" :target="'/info/about'" />
    </item>

    <hdr v-if="!horizontal">Benutzerprofil</hdr>
    <item>
      <lnk @click.native="click({id: 'logout'})" :text="'Abmelden'" />
    </item>
    <slot name="footer"></slot>
    <!-- <item v-else>
      <avatar
        ref="avatar"
        size="48"
        :name="name"

        :menu="options"
        @menu-click="click"
      />
    </item>-->
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
  @Prop() name!: string;
  @Prop({ default: true }) horizontal!: boolean;

  get options() {
    return [{ name: "Ausloggen", id: "logout" }];
  }

  is(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix == "/";
  }

  isPath(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix.startsWith(l);
  }

  async click({ id }: { id: string }) {
    console.debug("click", id);
    if (id == "logout") {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  }

  async created() {
    if (!this.name) {
    }
  }
}
</script>

<style scoped lang="scss">
</style>
