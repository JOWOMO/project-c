<template>
  <div class="imprint">
    <div class="links">
      <div v-if="horizontal">&copy; 2020 JOWOMO</div>
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
    <div v-if="!horizontal" class="copy">&copy; 2020 JOWOMO</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.Imprint,
})
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
