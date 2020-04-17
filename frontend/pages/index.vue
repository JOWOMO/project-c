<template>
  <div class="container">
    <h1 class="claim">
      <b>Personalpartnerschaften statt Kurzarbeit</b>
    </h1>
    <div class="teaser">
      jowomo verbindet Unternehmen zu Personalpartnerschaften. Arbeitskräfte werden
      <b>intelligent</b> verteilt, um temporären
      <b>Mehrbedarf</b> in Unternehmen zu decken und so Arbeitsplätze zu schützen.
    </div>

    <div class="two-rows">
      <div class="two-columns grow">
        <div class="login-scale">
          <div class="left" />
          <div class="index-cta">
            <h1>
              Ich
              <b>biete</b>
              <br />Mitarbeiter
            </h1>
            <button @click="supply_register" class="third">
              {{ action_text }}
              <img src="/icons/arrow-right.svg" />
            </button>
          </div>
        </div>

        <div class="login-scale">
          <div class="right" />
          <div class="index-cta">
            <h1>
              Ich
              <b>suche</b>
              <br />Mitarbeiter
            </h1>
            <button v-on:click="demand_register" class="third">
              {{ action_text }}
              <img src="/icons/arrow-right.svg" />
            </button>
          </div>
        </div>
      </div>

      <div class="two-columns">
        <div
          class="text"
        >Du kannst deine Mitarbeiter:innen momentan nicht beschäftigen? Setze sie ein, wo sie gebraucht werden.</div>

        <div
          class="text"
        >Finde hier Arbeitskräfte, um den derzeitigen Mehrbedarf in Deinem Unternehmen zu decken.</div>
      </div>
    </div>

    <div class="section white">
      <div class="hr">
        <hr />
      </div>

      <h1>Unser Konzept: Personalpartnerschaften</h1>
      <p>Unser Plattform entlastet Unternehmen, die von eingeschränkten Betriebsbedingungen betroffen sind und vermittelt Arbeitnehmer:innen an Unternehmen mit freien Kapazitäten über ein intelligentes Matching zu Personalpartnerschaften.</p>

      <div class="two-columns grow padding">
        <div>
          <h3>Auf der einen Seite:</h3>
          <p>müssen viele Betriebe Kurzarbeit anmelden, MitarbeiterInnen kündigen oder schließen.</p>
        </div>
        <div>
          <h3>Auf der anderen Seite:</h3>
          <p>gibt es Wirtschaftszweige, die in der aktuellen Situation dringend Personal benötigen.</p>
          <p></p>
        </div>
      </div>

      <h3 class="padding">Wir bringen Euch zusammen.</h3>

      <div class="padding">
        <img src="/images/process/exchange.svg" />
      </div>
    </div>

    <div class="section white">
      <div class="hr">
        <hr />
      </div>

      <h1>Unser Service</h1>
      <p>Temporäre Personalengpässe und Überkapazitäten zwischen Branchen und Unternehmen werden ausgeglichen.</p>

      <div class="three-columns padding">
        <div>
          <img src="/images/process/algorithm.svg" />
          <h3 class="padding">Matchingalgorithmus</h3>
          <p>Wir verweden einen intelligenten Matchingalgorithmus und krisentaugliche Merkmale, und erreichen so eine einfache und branchenübergreifende Vermittlung von Arbeitskräften.</p>
        </div>
        <div>
          <img src="/images/process/legal.svg" />
          <h3 class="padding">Juristische Umsetzung</h3>
          <p>Wir stellen relevante Informationen zur rechtlichen Umsetzung zur Verfügung bspw. Musterverträge, Standardprozesse, Kontakte zu Partnerkanzleien bei Rückfragen, uvw.</p>
          <p></p>
        </div>
        <div>
          <img src="/images/process/support.svg" />
          <h3 class="padding">Support</h3>
          <p>gibt es für Wirtschaftszweige, die in der aktuellen Situation dringend Personal benötigen.</p>
          <p></p>
        </div>
      </div>
    </div>

    <imprint />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, State } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";
import { IState } from "@/store";
import imprint from "@/components/imprint.vue";

@Component({
  components: { imprint },
  layout: "start"
})
export default class extends Vue {
  @State((s): IState => s.auth.isAuthenticated)
  authenticated!: boolean;

  get action_text() {
    return this.authenticated ? "Teams bearbeiten" : "Kostenlos anmelden";
  }

  demand_register() {
    this.$router.push({ path: "/register/demand" });
  }

  supply_register() {
    this.$router.push({ path: "/register/supply" });
  }

  @Meta
  head() {
    return {
      title: "Willkommen bei Bee2Bee",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Wir bieten eine Plattform für kleine / mittelständige Unternehmen um Mittarbeier vor der Kurzarbeit zu bewahren. Unternehmen können Mitarbeiter an andrere zum gleichen Lohn ausleihen. Eventuelle Unterschiede im Lohn zahlt das Arbeitsamt."
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$padding: 44px;
$fullheight: calc(100vh - 120px);

.container {
  height: calc(100vh - 120px);
  overflow-y: scroll;

  display: block;
  text-align: center;
}

h1 {
  font-weight: 100;
}

.hr {
  display: flex;
  flex: 1;
  justify-content: center;
  margin: $padding 0;

  hr {
    height: 4px;
    background-color: $primary;
    width: 50px;
  }
}

.claim {
  padding: $padding * 3 $padding 0 $padding;
  font-weight: 100;
  font-size: $h1FontSize;
  color: $headercolor;
}

.teaser {
  padding: $padding $padding $padding * 3 $padding;
  font-weight: 100;
  font-size: $h2FontSize;
  color: $headercolor;
}

.two-rows {
  min-height: $fullheight;

  display: flex;
  flex-direction: column;
  position: relative;
}

.two-columns {
  display: flex;
  flex-direction: row;
  position: relative;

  & > * {
    width: 50%;
  }
}

.three-columns {
  display: flex;
  flex-direction: row;
  position: relative;

  & > * {
    width: 33.33%;
    padding-left: $padding / 2;
    padding-right: $padding / 2;
  }

  img {
    min-height: 88px;
  }
}

.grow {
  flex: 1;
}

.text {
  width: 50%;
  background-color: $border;
  padding: 22px 44px;
  font-size: $h3FontSize;
  color: $textcolor;
}

.white {
  background-color: white;
}

.section {
  min-height: $fullheight;
  padding: $padding;

  min-width: 100vw;

  display: block;
  justify-content: center;

  h1 + p, h3 + p {
    padding-top: $padding;
  }

  .padding {
    padding-top: $padding;
  }
}

.login-scale {
  display: flex;
  flex: 1;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    width: 100%;

    img {
      transform: translateY(2px);
      margin-left: 10px;
    }
  }

  h1 {
    color: white;
    font-size: 60px;
    line-height: 60px;
    padding-bottom: 44px;
  }

  .index-cta {
    position: absolute;
  }

  .left,
  .right {
    width: 100%;
    height: 100%;

    background-size: cover;
    -webkit-filter: brightness(90%);
  }

  .left {
    background: url(/images/1.jpg) center center no-repeat;
  }

  .right {
    background: url(/images/2.jpg) center center no-repeat;
  }

  &:hover {
    .left,
    .right {
      -webkit-filter: brightness(60%);
      -webkit-transition: all 1s ease;
      -moz-transition: all 1s ease;
      -o-transition: all 1s ease;
      -ms-transition: all 1s ease;
      transition: all 1s ease;
    }
  }
}

@media only screen and (max-width: 765px) {
  .container {
    flex-direction: column;
    display: block;
  }
}
</style>
