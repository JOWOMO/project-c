<template>
  <navBar :horizontal="horizontal">
    <slot name="header"></slot>

    <hdr v-if="!horizontal">Navigation</hdr>
    <item v-if="!horizontal" :selected="is('/')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Startseite'" :target="'/'" />
    </item>

    <item :selected="isPath('/dashboard')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Deine Suche'" :target="'/dashboard'" />
    </item>

    <item :selected="isPath('/info/process')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Wie funktionierts?'" :target="'/info/process'" />
    </item>

    <item :selected="isPath('/info/about')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Über uns'" :target="'/info/about'" />
    </item>

    <item :selected="isPath('/info/press')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Presseinformationen'" :target="'/info/press'" />
    </item>

    <item :selected="isPath('/info/faq')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'FAQ'" :target="'/info/faq'" />
    </item>

    <hdr v-if="!horizontal">Benutzerprofil</hdr>
    <item>
      <lnk @click.native="click({id: 'logout'})" :text="'Abmelden'" />
    </item>
    <slot name="footer"></slot>
  </navBar>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from "nuxt-property-decorator";
import navBar from "@/components/navbar/bar.vue";
import lnk from "@/components/navbar/link.vue";
import item from "@/components/navbar/item.vue";
import hdr from "@/components/navbar/header.vue";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.PagesNavbarTopAuthenticated,
  components: { navBar, lnk, item, hdr }
})
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
@import "@/assets/colors";

.link-dashboard {
  .link {
    font-weight: bold;
    color: $secondary;

    &:hover {
      color: darken($secondary, 10);
    }
  }
}
</style>
