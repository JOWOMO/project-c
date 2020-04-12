<template>
  <div class="imprint">
    <div>&copy; 2020 Hackathon</div>
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.imprint {
  height: 40px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: 14px;
  color: $textcolor;

  div {
    margin-left: 20px;
  }

  a {
    font-size: 14px;
    color: $textcolor;
    font-weight: normal;
  }
}
</style>