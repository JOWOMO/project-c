<template>
  <top class="top">
    <div class="title">
      <h1>So funtioniert's</h1>
      <p>Hier ein schneller Überblick über den Prozess.</p>
    </div>

    <div class="workflow">
      <pe title="Arbeitskräfte anbieten" titleRight="Arbeitskräfte suchen">
        <template #number-left>
          <img height="100px" src="/icons/supply.svg" />
        </template>
        <template #number-right>
          <img height="100px" src="/icons/demand.svg" />
        </template>
      </pe>

      <pe number="1" title="Melde Dich an">
        <template #both>Mit ein paar Clicks bei JOWOMO anmelden und E-Mail-Adresse bestätigen.</template>
      </pe>

      <pe number="2" title="Erstelle Dein Profil">
        <template #both>Registrier Dein Unternehmen bei JOWOMO.</template>
      </pe>

      <pe number="3" title="Stelle Team(s) ein">
        <template #left>Lass andere Unternehmen wissen, welche Arbeitskräfte Du suchst.</template>
        <template #right>Lass andere Unternehmen wissen, welche Arbeitskräfte gerade bei Dir verfügbar sind.</template>
      </pe>

      <pe number="4" title="Starte Deine Suche">
        <template #both>Über die Suchfunktion findest Du Angebote in Deiner Umgebung.</template>
      </pe>

      <pe number="5" title="Wir verbinden Euch">
        <template #both>
          Du einen passenden Personalpartner entdeckt? Sende per Klick direkt eine Anfrage, damit ihr Details besprechen könnt.
        </template>
      </pe>

      <pe number="6" title="Match">
        <template #number>
          <img height="52px" src="/icons/logo.svg" />
        </template>
        <template
          #both
        >Glückwunsch! Ihr entscheidt Euch für die Partnerschaft und leitet die nächsten Schritte ein.</template>
      </pe>

      <pe number="7" title="Triff eine vertragliche Regelung">
        <template
          #both
        >Es gibt verschiedene Möglichkeiten zur Umsetzung, die Du für Deinen Fall rechtlich prüfen lassen solltest. <nuxt-link to="/info/faq">Siehe auch unsere FAQs</nuxt-link></template>
      </pe>

      <pe number="8" title="Boarde deine Mitarbeiter:innen off " titleRight="Boarde deine Mitarbeiter:innen on">
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

.top {
  display: block;
}

.title {
  text-align: center;
}

h1 {
  padding-top: 0;
  padding-bottom: $gridsize / 2;
}

p {
  padding-bottom: $gridsize;
}


</style>
