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
            <div @click="selected_topic('Handwerker')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Handwerker">
              <label for="Handwerker">Handwerker</label>
            </div>
            <div @click="selected_topic('Verkäufer')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Verkäufer">
              <label for="Verkäufer">Verkäufer</label>
            </div>
            <div @click="selected_topic('Lagerarbeiter')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Lagerarbeiter">
              <label for="Lagerarbeiter">Lagerarbeiter</label>
            </div>
            <div @click="selected_topic('Spediteur')"  class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Spediteur">
              <label for="Spediteur">Spediteur</label>
            </div>
            <div @click="selected_topic('Landwirt')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Landwirt">
              <label for="Landwirt">Landwirt</label>
            </div>
            <div  @click="selected_topic('Krankenpfleger')"  class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Krankenpfleger">
              <label for="Krankenpfleger">Krankenpfleger</label>
            </div>
            <div @click="selected_topic('Mechaniker')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Mechaniker">
              <label for="Mechaniker">Mechaniker</label>
            </div>
            <div  @click="selected_topic('Andere')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Andere">
              <label for="Andere">Andere</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="oneActive = !oneActive">
            {{ selectedTopic }}
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
            <div @click="selected_number(1)"  class="option" ref="option">
              <input type="radio" class="radio" name="category" id="one">
              <label for="one">1 - 5</label>
            </div>
            <div @click="selected_number(5)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="five">
              <label for="five">5 - 10</label>
            </div>
            <div @click="selected_number(10)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="ten">
              <label for="ten">10 - 20</label>
            </div>
            <div @click="selected_number(20)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="twenty">
              <label for="twenty">20 - 30</label>
            </div>
            <div @click="selected_number(30)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="thirty">
              <label for="thirty">30 - 40</label>
            </div>
            <div @click="selected_number(40)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="fourty">
              <label for="fourty">40 - 50</label>
            </div>
            <div @click="selected_number(50)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="fifty">
              <label for="fifty">50 +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="twoActive = !twoActive">
            {{ selectedNumber }}
          </div>
        </div>
      </div>

      <div class="form-group info">
        <textarea-autosize v-mode="extraInfo" name="info" placeholder="Zusätzliche Information" required />
        <label for="info"></label>
      </div>

      <div class="form-group skills">
        <span>Teamprofil</span>
        <button @click.prevent="tagCloud = !tagCloud">
          Bitte wählen
          <img src="/icons/add.svg">
        </button>
      </div>

      <div class="selectedSkills">
        <tag
          v-for="skill in selectedTags"
          :key="skill.name"
          :skill="skill.name"
          selected
        />
      </div>

      <tagCloud
        v-if="tagCloud"
        v-on:changeActive="hide($event)"
        :skills="skills"
        @selectedTags="getTags"
      />

      <button class="add" @click.prevent="">
        <div class="circle">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.84615 0H9.15385V14H4.84615V0Z" fill="white"/>
            <path d="M1.88295e-07 9.15385L0 4.84615L14 4.84615V9.15385L1.88295e-07 9.15385Z" fill="white"/>
          </svg>
        </div>

        <span>Weiteres Team hinzufügen</span>
      
      </button>
    </form>
  </div>
</template>

<script>
import tagCloud from '@/components/tag-cloud.vue'
import tag from '@/components/tag_skill.vue'
import getSkills from '@/apollo/queries/skills'
export default {
  name: 'team',
  props:{
    type:String 
  },
  data() {
    return {

      oneActive: false,
      twoActive: false,
      tagCloud: false,
      team: 1,
      selectedTags: [],
      extraInfo:'',
      selectedNumber:'Anzahl Mitarbeiter',
      selectedTopic: 'Bezeichnung 22',
      skills: [ // TODO: Fetch from db
        // {
        //   name: 'Security'
        // },
        // {
        //   name: 'Handwerklich begabt'
        // },
        // {
        //   name: 'Kundenkontakt'
        // },
        // {
        //   name: 'Körperliche Arbeit'
        // },
        // {
        //   name: 'erste Hilfe'
        // },
        // {
        //   name: 'spricht deutsch'
        // },
        // {
        //   name: 'Führerschein'
        // },
        // {
        //   name: 'Staplerschein'
        // }
      ]
    }
  },
  components: {
    tagCloud,
    tag
  },
  methods: {
    selected_number(number){
      this.selectedNumber = number.toString()
      this.twoActive = false
    },
    selected_topic(topic){
      this.selectedTopic = topic
      this.oneActive = false
    },
    save(selectedTags,selectedTopic,selectedNumber,extraInfo){
      
    },
    hide(active) {
      this.tagCloud = active
    },
    getTags(tags, active) {
      this.tagCloud = active
      this.selectedTags = tags // TODO: Write to db
    }
  },
 async beforeCreate(context){
   const client = this.$apollo.getClient();

  this.$apollo
    .query({
      query: getSkills
    })
    .then(({ data }) => {
      console.log(data);
      return this.skills = data.skills
    });

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

    .selectedSkills {
      width: 100%;
      grid-column: 1 / span 2;
    }

    .add {
      grid-column: 1;
      display: flex;
      align-items: center;
      width: auto;
      background: none;
      cursor: pointer;

      .circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: $primary;

        svg {
          margin-top: 13px;
        }
      }

      span {
        color: $primary;
        font-weight: bold;
        margin-left: 10px;
        display: inline-block;
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
