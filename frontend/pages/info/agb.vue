<template>
  <div>
    <h1>AGB</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";

@Component
export default class extends Vue {
  @Meta
  head() {
    return {
      title: "Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: ""
        }
      ]
    };
  }
}
</script>

<style>
</style>
