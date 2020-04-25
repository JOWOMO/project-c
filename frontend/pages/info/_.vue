<template>
  <leftNav>
    <template slot="navbar">
      <topBar :hideLogo="true" />
    </template>

    <template slot="left">
      <sidebar class="sidebar">
        <sec :name="menu.label">
          <item v-for="m in (menu.items || [])" :key="m.label" :name="m.label" :to="m.to" />
        </sec>
      </sidebar>
    </template>

    <template slot="body">
      <component class="markdown" :is="content" />
    </template>
  </leftNav>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import leftNav from "@/components/pages/navbar-left.vue";
import topBar from "@/components/pages/topbar.vue";

import sidebar from "@/components/sidebar/bar.vue";
import item from "@/components/sidebar/item.vue";
import sec from "@/components/sidebar/section.vue";

import faq from "@/components/faq.vue";
import about from "@/components/about/block.vue";
import sponsor from "@/components/about/sponsor.vue";


@Component({
  components: { sidebar, item, sec, leftNav, topBar },
  layout: "main-left"
})
export default class extends Vue {
  title: string = "";
  seo: string = "";
  description: string = "";
  content: string = "";
  menu: any;

  head() {
    return {
      title: this.seo,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        }
      ]
    };
  }

  created() {
    this.$store.commit('support/context', `zu '${this.title}'`);
  }

  async asyncData(context: Context) {
    try {
      let content = await import(`~/content/${context.params.pathMatch}.md`);

      const other = {
        extends: content.vue.component,
        components: {
          faq, about, sponsor,
        }
      };

      return {
        title: content.attributes?.title,
        description: content.attributes?.description,
        seo: content.attributes?.seo || content.attributes?.title,
        content: other,
        menu: content.attributes?.menu || {}
      };
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 404, message: e.message });
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
}

@import "./markdown.scss";
</style>
