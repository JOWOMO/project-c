<template>
  <div class="imprint">
    <div class="links">
      <div>
        <nuxt-link to="/info/imprint">Impressum</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/info/privacy">Datenschutz</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/info/agb">AGB</nuxt-link>
      </div>
    </div>
    <div class="copy">&copy; 2020 JOWOMO</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.imprint {
  font-size: 14px;
  color: $textcolor;

  a {
    font-size: 14px;
    color: $textcolor;
    font-weight: normal;
  }

  .links,
  .copy {
    margin-left: 48px;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    div {
      margin-right: 20px;
    }
  }
}
</style>
