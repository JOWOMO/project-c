<template>
  <navBar :key="$route.path" :horizontal="horizontal">
    <item v-if="!horizontal" :selected="is('/')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Startseite'" :target="'/'" />
    </item>
    <item :selected="isPath('/dashboard')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'Meine Suchergebnisse'" :target="'/dashboard'" />
    </item>
    <item :selected="isPath('/info/faq')" v-slot:default="is">
      <lnk :selected="is.selected" :text="'FAQ'" :target="'/info/faq'" />
    </item>
    <item>
      <lnk @click.native="click({id: 'logout'})" :text="'Ausloggen'" />
    </item>
    <!-- <item v-else>
      <avatar
        ref="avatar"
        size="48"
        :name="name"

        :menu="options"
        @menu-click="click"
      />
    </item> -->
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
import avatar from "./avatar.vue";

@Component({ components: { navBar, lnk, item, avatar } })
export default class extends Vue {
  @Prop() name!: string;
  @Prop({ default: true }) horizontal!: boolean;

  get options() {
    return [{ name: "Ausloggen", id:"logout" }];
  }

  is(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix == '/';
  }

  isPath(l: string) {
    const prefix = this.$route.fullPath.toLowerCase();
    return prefix.startsWith(l);
  }

  async click({id}: {id: string}) {
    console.debug('click', id);
    if (id == 'logout') {
      await this.$store.dispatch('auth/logout');
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
