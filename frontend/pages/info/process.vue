<template>
  <top class="top">
    <div class="title">
      <h1>So funtioniert's</h1>
      <p>Hier ein schneller Überblick über den Prozess.</p>
    </div>

    <div class="workflow">
      <pe title="Arbeitskröfte anbieten" titleRight="Arbeitskräfte suchen">
        <template #number-left>
          <img height="100px" src="/icons/supply.svg" />
        </template>
        <template #number-right>
          <img height="100px" src="/icons/demand.svg" />
        </template>
      </pe>

      <pe number="1" title="Anmelden">
        <template #both>Mit ein paar Clicks bei JOWOMO anmelden und E-Mail-Adresse bestätigen.</template>
      </pe>

      <pe number="2" title="Profil erstellen">
        <template #both>Registrier Dein Unternehmen bei JOWOMO.</template>
      </pe>

      <pe number="3" title="Team(s) erstellen">
        <template #left>Lass uns wissen, welche Arbeitskräfte Du suchst.</template>
        <template #right>Lass uns wissen, welche Arbeitskräfte gerade bei Dir verfügbar sind.</template>
      </pe>

      <pe number="4" title="Suchen">
        <template #both>Über die Suchfunktion findest Du Angebote in Deiner Umgebung.</template>
      </pe>

      <pe number="5" title="Anfrage">
        <template
          #left
        >Eine Firma möchte Dein Team einstellen. Hier hast Du Gelegenheit Details zu besprechen.</template>
        <template #right>Lass uns wissen, welche Arbeitskräfte gerade verfügbar sind.</template>
      </pe>

      <pe number="6" title="Match">
        <template #number>
          <img height="52px" src="/icons/logo.svg" />
        </template>
        <template
          #both
        >Glückwunsch! Ihr entscheidt Euch für die Partnerschaft und leitet die nächsten Schritte ein.</template>
      </pe>

      <pe number="7" title="Vertragliche Regelung">
        <template
          #both
        >Glückwunsch! Ihr entscheidt Euch für die Partnerschaft und leitet die nächsten Schritte ein.</template>
      </pe>

      <pe number="8" title="Offboarding" titleRight="Einarbeitung">
        <template #left>Hilf Deinen Arbeitskräften in der Übergangsphase.</template>
        <template #right>Hilf Deinen neuen Arbeitskräften sich in Deinem Betrieb wohl zu fühlen.</template>
      </pe>
    </div>
  </top>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";
import { Context } from "@nuxt/types";

import top from "@/components/pages/navbar-top.vue";
import pe from "@/components/about/pe.vue";

@Component({
  components: { top, pe }
})
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$grid: 44px;

.top {
  display: block;
}

.title {
  text-align: center;
}

h1 {
  padding-top: 0;
  padding-bottom: $grid / 2;
}

p {
  padding-bottom: $grid;
}


</style>
