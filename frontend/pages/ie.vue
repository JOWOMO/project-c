<template>
  <div class="container">
    <h1>Zur Zeit unterstützen wir diesen Browser nicht</h1>
    <h2>Bitte nutzen Sie einen der von uns unterstützen Browser</h2>

    <div class="browserList">
      <div class="browser">
        <img src="/images/browser/chrome.svg" alt="Chrome browser">
        <a href="https://www.google.com/chrome/">Chrome</a>
      </div>
      <div class="browser">
        <img src="/images/browser/firefox.svg" alt="firefox browser">
        <a href="https://www.mozilla.org/de/firefox/new/">Firefox</a>
      </div>
      <div class="browser">
        <img src="/images/browser/safari.svg" alt="Safari browser">
        <a href="https://www.apple.com/safari/">Safari</a>
      </div>
      <div class="browser">
        <img src="/images/browser/opera.svg" alt="Opera">
        <a href="https://www.opera.com/de">Opera</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, State } from "nuxt-property-decorator";
@Component({
  layout: "ie"
})
export default class extends Vue {
  
}
</script>
<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";
.container {
  text-align: center;
  flex-direction: column;
  margin: 10px;

  h1, h2 {
    display: block;
    margin: 20px 0;
  }

  .browserList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    .browser {
      width: 50px;
      margin: 10px;

      img {
        width: 40px;
        height: 40px;
      }

      a {
        font-size: 15px;
      }
    }
  }
}
</style>
