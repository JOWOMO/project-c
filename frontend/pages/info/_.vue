<template>
  <div class="container">
    <component class="markdown" :is="content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";
import { Context } from "@nuxt/types";

@Component
export default class extends Vue {
  title: string = "";
  description: string = "";

  content: string = "";

  @Meta
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description }
      ]
    };
  }

  dashboard() {
    this.$router.replace("/dashboard");
  }

  async asyncData(context: Context) {
    try {
      let content = await import(`~/content/${context.params.pathMatch}.md`);

      return {
        title: content.attributes?.title,
        description: content.attributes?.description,
        content: content.vue.component
      };
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 404, message: e.message });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.container {
  justify-content: left;
  align-items: flex-start;

  overflow-y: auto;
  padding: 50px;

  .markdown /deep/ {
    h1 {
      padding-bottom: 48px;
    }

    h2 {
      padding-bottom: 24px;
    }

    p + h2 {
      padding-top: 24px;
    }

    h3 {
      padding-bottom: 12px;
    }

    p {
      padding-bottom: 12px;
    }

    th {
      color: $headercolor;
      font-size: $h3FontSize;
      text-align: left;
    }

    td {
      color: $textcolor;
    }
  }
}
</style>
