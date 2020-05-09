<template>
  <div class="imprint">
    <div class="links">
      <div v-if="horizontal">&copy; 2020 JOWOMO</div>
      <div>
        <a href="/info/imprint" target="_blank" >Impressum</a>
      </div>
      <div>
        <a href="/info/privacy"  target="_blank">Datenschutz</a>
      </div>
      <div>
        <a href="/info/agb" target="_blank">AGB</a>
      </div>
    </div>
    <div v-if="!horizontal" class="copy">&copy; 2020 JOWOMO</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({default: false}) horizontal!: boolean;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

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
    margin-left: $gridsize;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    div {
      margin-right: $pageMarginMin;
    }
  }
}
</style>
