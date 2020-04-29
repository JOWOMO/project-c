<template>
  <div class="container">
    <h1>{{ $t('ie.title') }}</h1>
    <p>{{ $t('ie.text') }}</p>

    <div class="browserList">
      <div class="browser">
        <a href="https://www.google.com/chrome/">
          <img src="/images/browser/chrome.svg" alt="Chrome browser" />
          Chrome
        </a>
      </div>

      <div class="browser">
        <a href="https://www.mozilla.org/de/firefox/new/">
          <img src="/images/browser/firefox.svg" alt="firefox browser" />
          Firefox
        </a>
      </div>

      <div class="browser">
        <a href="https://www.apple.com/safari/">
          <img src="/images/browser/safari.svg" alt="Safari browser" />
          Safari
        </a>
      </div>

      <div class="browser">
        <a href="https://www.opera.com/de">
          <img src="/images/browser/opera.svg" alt="Opera" />
          Opera
        </a>
      </div>

      <div class="browser">
        <a href="https://www.microsoft.com/de-de/edge">
          <img src="/images/browser/edge.svg" alt="Edge" />
          Edge
        </a>
      </div>
    </div>

    <p class="highlight">{{ $t('ie.mobile') }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, State } from "nuxt-property-decorator";
@Component({
  layout: "ie"
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.container {
  text-align: center;
  flex-direction: column;
  padding: $gridsize;

  h1,
  h2 {
    display: block;
    margin: $gridsize/2 0;
    width: 100%;
  }

  p {
    width: 100%;
  }

  .highlight {
    color: $headercolor;
  }

  .browserList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    padding-top: $gridsize/2;
    padding-bottom: $gridsize/2;

    .browser {
      width: 50px;
      margin: $gridsize/4;

      img {
        width: $gridsize;
        height: $gridsize;
      }

      a {
        font-size: 15px;
      }
    }
  }
}
</style>
