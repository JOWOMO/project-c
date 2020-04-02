<template>
  <div class="form-container">
    <form novalidate>
      <div class="head">
        <h2>Team {{ team }}</h2>
        <input type="checkbox" class="switch">
        <span>aktivieren</span>
      </div>

      <div class="form-group dropdown half-width">
        <div class="select-box">
          <div
            class="options-container"
            ref="optionsContainer"
            :class="{active: oneActive}"
          > <!-- TODO: add v-for - fetch from db -->
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Handwerker">
              <label for="Handwerker">Handwerker</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Verkäufer">
              <label for="Verkäufer">Verkäufer</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Lagerarbeiter">
              <label for="Lagerarbeiter">Lagerarbeiter</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Spediteur">
              <label for="Spediteur">Spediteur</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Landwirt">
              <label for="Landwirt">Landwirt</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Krankenpfleger">
              <label for="Krankenpfleger">Krankenpfleger</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Mechaniker">
              <label for="Mechaniker">Mechaniker</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Andere">
              <label for="Andere">Andere</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="oneActive = !oneActive">
            Bezeichnung
          </div>
        </div>
      </div>

      <div class="form-group dropdown half-width right">
        <div class="select-box">
          <div
            class="options-container"
            ref="optionsContainer"
            :class="{active: twoActive}"
          > <!-- TODO: add v-for - fetch from db -->
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="one">
              <label for="one">1 - 5</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="five">
              <label for="five">5 - 10</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="ten">
              <label for="ten">10 - 20</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="twenty">
              <label for="twenty">20 - 30</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="thirty">
              <label for="thirty">30 - 40</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="fourty">
              <label for="fourty">40 - 50</label>
            </div>
            <div class="option" ref="option">
              <input type="radio" class="radio" name="category" id="fifty">
              <label for="fifty">50 +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="twoActive = !twoActive">
            Anzahl Mitarbeiter
          </div>
        </div>
      </div>

      <div class="form-group info">
        <textarea-autosize name="info" placeholder="Zusätzliche Information" required />
        <label for="info"></label>
      </div>

      <div class="form-group skills">
        <span>Teamprofil</span>
        <button @click.prevent="tagCloud = !tagCloud">
          Bitte wählen
          <img src="/icons/add.svg">
        </button>
      </div>

      <tagCloud
        v-if="tagCloud"
        v-on:changeActive="hide($event)"
        :skills="skills"
      />
    </form>
  </div>
</template>

<script>
import tagCloud from '@/components/tag-cloud.vue'
import tag from '@/components/tag_skill.vue'

export default {
  name: 'team',
  props:[type],
  data() {
    return {
      oneActive: false,
      twoActive: false,
      tagCloud: false,
      team: 1,
      skills: [
        {
          name: 'Security'
        },
        {
          name: 'Handwerklich begabt'
        },
        {
          name: 'Kundenkontakt'
        },
        {
          name: 'Körperliche Arbeit'
        },
        {
          name: 'erste Hilfe'
        },
        {
          name: 'spricht deutsch'
        },
        {
          name: 'Führerschein'
        },
        {
          name: 'Staplerschein'
        }
      ]
    }
  },
  components: {
    tagCloud,
    tag
  },
  methods: {
    hide(active) {
      this.tagCloud = active
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/global';

.form-container {
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    gap: 20px;
    justify-content: center;
    align-items: start;
    max-width: 800px;

    .head {
      grid-column: 1 / span 2;
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;

      h2 {
        display: inline-block;
        width: auto;
      }

      .switch {
        margin-left: 50px;
      }

      span {
        margin-left: 10px;
      }
    }

    .form-group {
      grid-column: 1 / span 2;
    }

    .half-width {
      grid-column: 1;
      width: 100%;
    }

    .right {
      grid-column: 2;
      width: 100%;
    }

    .info {
      label {
        z-index: 99;
      }

      textarea {
        width: 100%;
        z-index: 1;
      }
    }

    .skills {
      span {
        display: block;
      }

      button {
        width: 200px;
        height: 60px;
        padding: 20px;
        margin-top: 10px;
        border: 2px solid $uiComponentHighlighted;

        img {
          display: inline;
          margin-left: 10px;
        }
      }
    }
  }
}

@media only screen and (max-width: 765px) {
  form {
    grid-template-columns: 1fr 0 !important;
    column-gap: 0 !important;
  }
}
</style>
