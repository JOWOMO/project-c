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

<style lang="scss" scoped>
.container {
  text-align: center;

  .browserList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    .browser {
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
