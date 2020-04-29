<template>
  <div class="container">
    <h1>Internet Explorer wird momentan nicht von unserer Plattform unterstützt.</h1>
    <p>Aber über einen der folgenden Browser kannst Du schnell Deinen Personalpartner auf JOWOMO finden:</p>

    <div class="browserList">
      <div class="browser">
        <a href="https://www.google.com/chrome/">
        <img src="/images/browser/chrome.svg" alt="Chrome browser">
        Chrome</a>
      </div>
      <div class="browser">
        <a href="https://www.mozilla.org/de/firefox/new/">
        <img src="/images/browser/firefox.svg" alt="firefox browser">
        Firefox</a>
      </div>
      <div class="browser">
        <a href="https://www.apple.com/safari/">
        <img src="/images/browser/safari.svg" alt="Safari browser">
        Safari</a>
      </div>
      <div class="browser">
        <a href="https://www.opera.com/de">
        <img src="/images/browser/opera.svg" alt="Opera">
        Opera</a>
      </div>
            <div class="browser">
        <a href="https://www.microsoft.com/de-de/edge">
        <img src="/images/browser/edge.svg" alt="Edge">
        Edge</a>
      </div>

      
    </div>
    <p class="highlight">Oder ruf jowomo.de einfach direkt auf Deinem Smartphone auf! </p>
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
  .highlight {
      color: black;
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
