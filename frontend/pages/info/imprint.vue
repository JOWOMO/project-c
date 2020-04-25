<template>
  <top class="top">
      <component class="markdown" :is="content" />
  </top>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

import top from "@/components/pages/navbar-top.vue";
import pe from "@/components/about/pe.vue";

@Component({
  components: { top, pe }
})
export default class extends Vue {
  title: string = "";
  description: string = "";
  content: string = "";

  head() {
    return {
      title: this.$t('process.seo.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('process.seo.description'),
        }
      ],
    };
  }

  created() {
    this.$store.commit('support/context', `zu '${this.title}'`);
  }

  async asyncData(context: Context) {
    try {
      // @ts-ignore
      let content = await import('@/content/imprint.md');

      const other = {
        extends: content.vue.component,
        components: {
        }
      };

      return {
        title: content.attributes?.title,
        description: content.attributes?.description,
        seo: content.attributes?.seo || content.attributes?.title,
        content: other,
      };
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 404, message: e.message });
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: block;
}

@import "./markdown.scss";
</style>
