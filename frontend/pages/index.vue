<template>
  <div class="container">
    <div class="two-columns grow">
      <div class="login">
        <div class="left" />
        <div class="login-cta">
          <div class="text">
            <div>
              Du kannst Deine Mitarbeiter:innen momentan nicht voll beschäftigen? Gib ihnen die Chance, an anderer Stelle zu unterstützen.
            </div>
          </div>

          <div class="grow" />

          <div class="buttons">
            <button @click="supply_register" class="primary">
              <div>
                Ich
                <b>biete</b>
                <br />Mitarbeiter:innen
              </div>
              <div class="arrow" />
            </button>
          </div>
        </div>
      </div>

      <div class="login">
        <div class="right" />
        <div class="login-cta">
          <div class="text">
            <div>Du suchst aktuell zusätzliche Mitarbeiter:innen? Finde hier passende Teams, die Dein Unternehmen temporär unterstützen.</div>
          </div>

          <div class="grow" />

          <div class="buttons">
            <button @click="demand_register" class="cta">
              <div>
                Ich
                <b>suche</b>
                <br />Mitarbeiter:innen
              </div>
              <div class="arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="section center">
      <div class="claim">
        <b>Personal&shy;partnerschaften:</b> Deine Alternative zur Kurzarbeit
      </div>
      <div class="teaser">
        JOWOMO vernetzt Unternehmen für einen temporären Austausch von Personal.
        <br />
        <b>Flexibel. Innovativ. Krisengerecht.</b>
      </div>
    </div>

    <div class="white content">
      <div class="hr">
        <hr />
      </div>

      <h1>Unser Konzept</h1>
      <p>Wir vernetzen Unternehmen um gewinnbringende Personalpartnerschaften zu bilden.</p>
      <p>Mitarbeiter:innen eines Unternehmens, das aktuell von eingeschränkten Betriebsbedingungen betroffen ist, können temporär in Unternehmen arbeiten, die einen aktuellen Mehrbedarf haben. Dies erlaubt eine Entlastung von Unternehmen und den Schutz von Arbeitsplätzen auf der einen Seite und eine schnelle Deckung des erhöhten Bedarfs auf der anderen Seite.</p>

      <!-- <div class="two-columns grow padding">
        <div>
          <h3>Auf der einen Seite:</h3>
          <p>müssen viele Betriebe Kurzarbeit anmelden, MitarbeiterInnen kündigen oder schließen.</p>
        </div>
        <div>
          <h3>Auf der anderen Seite:</h3>
          <p>gibt es Wirtschaftszweige, die in der aktuellen Situation dringend Personal benötigen.</p>
          <p></p>
        </div>
      </div>-->

      <div class="hr">
        <hr />
      </div>

      <h1>Wir vernetzen</h1>

      <div class="fullrow">
        <div class="blue h-padding v-padding">
          Unternehmen, die von der Krise getroffen sind
          und aktuell vor der Entscheidung stehen, ihre
          Mitarbeiter:innen in Kurzarbeit zu schicken
          oder sogar zu entlassen.
        </div>
        <div class="middle"></div>
        <div class="red h-padding v-padding">
          Mit Unternehmen, die aktuell mehr Personal
          benötigen da sie in der Krise besonders
          gefragt sind und durch notwendige Schutzmaßnahmen
          einen zusätzlichen Mehraufwand
          haben.
        </div>
      </div>

      <!-- <div class="hr">
        <hr />
      </div>

      <h2>Unternehmen temporär</h2>-->

      <div class="process">
        <picture>
          <source media="(max-width: 850px)" srcset="/images/process/up.svg" />
          <img src="/images/process/leftright.svg" />
        </picture>
      </div>
    </div>

    <div class="section content">
      <div class="hr">
        <hr />
      </div>

      <h1>Unser Service</h1>
      <p>Temporäre Personalengpässe und Überkapazitäten zwischen Branchen und Unternehmen werden ausgeglichen.</p>

      <div class="three-columns">
        <div>
          <img class="icon" src="/icons/logo.svg" />
          <div class="hr">
            <hr />
          </div>
          <h3 class="padding">Matching</h3>
          <p>Unser Matching basiert auf krisentauglichen Merkmalen, die eine einfache und branchenübergreifende Vermittlung von Arbeitskräften ermöglichen. So schlagen wir Dir relevante Personalpartner vor.</p>
        </div>
        <div>
          <img class="icon" src="/icons/tipps.svg" />
          <div class="hr">
            <hr />
          </div>
          <h3 class="padding">Juristische Umsetzung</h3>
          <p>
            Wie geht es weiter, wenn der richtige Personalpartner gefunden ist? In unseren FAQs
            findest Du hilfreiche Informationen.
          </p>
          <p></p>
        </div>
        <div>
          <img class="icon" src="/icons/support.svg" />
          <div class="hr">
            <hr />
          </div>
          <h3 class="padding">Support</h3>
          <p>Du hast Fragen zur Nutzung der Plattform? Wir sind für Dich da. Wenn Du deine Frage noch nicht in den FAQs beantwortet findest, schreib uns.</p>
          <p><a href="mailto:support@jowomo.de">support@jowomo.de</a></p>
        </div>
      </div>
    </div>

    <div class="spacer" />
    <imprint class="imprint" :horizontal="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, State } from "nuxt-property-decorator";
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
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$fullheight: calc(100vh - #{$pageHeaderHeight});

.container {
  height: $fullheight;

  overflow-y: scroll;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  display: block;
  text-align: center;
}

.hr {
  display: flex;
  flex: 1;
  justify-content: center;

  hr {
    height: 4px;
    background-color: $primary;
    width: $gridsize;
  }
}

.claim,
.teaser {
  font-weight: 100;
  font-size: $h1FontSize;
  color: $headercolor;

  padding-right: $gridsize;
  padding-left: $gridsize;

  hyphens: manual;
}

.teaser {
  font-size: $h2FontSize;
  padding-top: $gridsize;
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
  min-height: $fullheight;

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
    padding-left: $gridsize / 2;
    padding-right: $gridsize / 2;
  }

  img {
    min-height: $gridsize * 2;
  }
}

.grow {
  display: flex;
  flex: 1;
}

.white {
  background-color: white;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section {
  min-height: $fullheight;
  min-width: 100vw;
  justify-content: center;
}

.login {
  display: flex;
  height: $fullheight;
  position: relative;

  .left,
  .right {
    flex: 1;
    height: 100%;
    width: 100%;
    -webkit-filter: brightness(50%);
  }

  .left {
    background: url(/images/home/1_1080.jpg) no-repeat;
    background-position: top left;
    background-size: cover;
  }

  .right {
    background: url(/images/home/2_1080.jpg) no-repeat;
    background-position: top left;
    background-size: cover;
  }

  .login-cta {
    height: $fullheight;
    position: absolute;

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    .text {
      font-size: $h2FontSize;
      color: white;

      padding: 0px $gridsize;
      min-height: 200px;

      display: flex;
      align-items: center;
    }

    .arrow {
      margin-left: $gridsize/2;
      width: 33px;
      height: 33px;

      background-color: white;
      -webkit-mask: url(/icons/arrow-right.svg) no-repeat center;
      mask: url(/icons/arrow-right.svg) no-repeat center;
    }

    .buttons {
      padding: $gridsize $gridsize*1.5;
      width: 100%;

      display: flex;
      justify-content: center;

      button {
        text-align: left;
        width: 100%;
        max-width: 350px;
        height: auto;

        font-weight: 100;
        font-size: $h2FontSize;

        border-radius: 180px;
        padding: 16px $gridsize;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}

.process {
  padding: $gridsize * 2 $gridsize;
  img {
    width: 100%;
    max-width: $breakpoint_md;
  }
}

.fullrow {
  padding-top: $gridsize / 2;
  display: grid;
  width: 100vw;

  grid-auto-columns: 1fr $gridsize*2 1fr;


  color: white;
  position: relative;

  align-items: stretch;

  .blue {
    padding: $gridsize;
    grid-column: 1;
    align-items: center;
    background-color: $primary;
  }

  .middle {
    grid-column: 2;
    background: url(/icons/split.svg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .red {
    padding: $gridsize;
    grid-column: 3;
    align-items: center;
    background-color: $secondary;
  }
}

.content {
  .hr {
    padding-left: $gridsize;
    padding-right: $gridsize;

    padding-top: $gridsize * 2;
    padding-bottom: $gridsize / 2;
  }

  h1 {
    padding-left: $gridsize;
    padding-right: $gridsize;
    padding-bottom: $gridsize / 2;
  }

  p {
    padding-left: $gridsize;
    padding-right: $gridsize;
    padding-top: $gridsize / 2;
  }

  .icon {
    height: $gridsize;
    margin-top: $gridsize * 2;
    margin-bottom: $gridsize/2;
  }

  .icon + .hr {
    padding-top: $gridsize/4;
  }
}

.spacer {
  height: $pageMarginBottom;
}

.imprint {
  padding-bottom: 10px;
}

// @media only screen and (min-width: $breakpoint_vl) {
//     .login {
//     .login-cta {
//       .text {
//         min-height: 300px;
//         font-size: $h1FontSize;
//       }

//       .buttons {
//         padding: 66px 66px;

//         button {
//           font-size: $h1FontSize;
//         }
//       }
//     }
//   }
// }

@media only screen and (max-width: $breakpoint_sm) {
  .process {
    img {
      max-width: 100%;
    }
  }
}

@media only screen and (max-width: $breakpoint_vl) {
  .left {
    background-position: left center;
    margin-left: -100px;
  }
}

@media only screen and (max-width: $breakpoint_md) {
  .container {
    overflow: unset;
  }

  .login {
    .login-cta {
      height: 50vh;

      .text {
        padding: $gridsize $pageMarginMin;
      }

      .buttons {
        padding: $gridsize $pageMarginMin;
      }
    }
  }

  .claim,
  .teaser {
    padding-left: $pageMarginMin;
    padding-right: $pageMarginMin;
  }

  .content {
    h1,
    p {
      padding-left: $pageMarginMin;
      padding-right: $pageMarginMin;
    }
  }

  .process {
    padding-left: $pageMarginMin;
    padding-right: $pageMarginMin;
  }

  .fullrow {
    grid-auto-columns: 1fr;

    .blue {
      grid-row: 1;
      grid-column: 1;
      padding: $pageMarginMin;
    }

    .middle {
      display: none;
    }

    .red {
      padding: $pageMarginMin;
      grid-row: 3;
      grid-column: 1;
    }
  }

  .two-columns {
    flex-direction: column;

    & > * {
      width: 100%;
      height: 50vh;
    }
  }

  .three-columns {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }

  .section {
    min-height: 100vh;
  }

  .imprint {
    margin-left: -$pageMarginMin;
  }
}

@media only screen and (max-height: 700px) {
  .login {
    .login-cta {
      .text {
        padding: $pageMarginMin;
      }

      .buttons {
        padding: $pageMarginMin;
      }
    }
  }
}
</style>
