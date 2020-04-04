<template>
  <div class="form-container">
    <form novalidate>
      <div class="head">
        <h2>Team {{ id }}</h2>
        <div class="checkbox">
          <input 
            v-model="active" 
            type="checkbox" 
            class="switch"
          />
          <span>aktivieren</span>
        </div>
      </div>

      <div class="form-group dropdown half-width">
        <div class="select-box">
          <div class="options-container" ref="optionsContainer" :class="{active: oneActive}">
            <!-- TODO: add v-for - fetch from db -->
            <div @click="selected_topic('Handwerker')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Handwerker" />
              <label for="Handwerker">Handwerker</label>
            </div>
            <div @click="selected_topic('Verkäufer')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Verkäufer" />
              <label for="Verkäufer">Verkäufer</label>
            </div>
            <div @click="selected_topic('Lagerarbeiter')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Lagerarbeiter" />
              <label for="Lagerarbeiter">Lagerarbeiter</label>
            </div>
            <div @click="selected_topic('Spediteur')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Spediteur" />
              <label for="Spediteur">Spediteur</label>
            </div>
            <div @click="selected_topic('Landwirt')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Landwirt" />
              <label for="Landwirt">Landwirt</label>
            </div>
            <div @click="selected_topic('Krankenpfleger')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Krankenpfleger" />
              <label for="Krankenpfleger">Krankenpfleger</label>
            </div>
            <div @click="selected_topic('Mechaniker')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Mechaniker" />
              <label for="Mechaniker">Mechaniker</label>
            </div>
            <div @click="selected_topic('Andere')" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="Andere" />
              <label for="Andere">Andere</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="oneActive = !oneActive">{{ selectedTopic }}</div>
        </div>
      </div>

      <div class="form-group dropdown half-width right">
        <div class="select-box">
          <div class="options-container" ref="optionsContainer" :class="{active: twoActive}">
            <!-- TODO: add v-for - fetch from db -->
            <div @click="selected_number(1)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="one" />
              <label for="one">1 - 5</label>
            </div>
            <div @click="selected_number(5)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="five" />
              <label for="five">5 - 10</label>
            </div>
            <div @click="selected_number(10)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="ten" />
              <label for="ten">10 - 20</label>
            </div>
            <div @click="selected_number(20)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="twenty" />
              <label for="twenty">20 - 30</label>
            </div>
            <div @click="selected_number(30)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="thirty" />
              <label for="thirty">30 - 40</label>
            </div>
            <div @click="selected_number(40)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="fourty" />
              <label for="fourty">40 - 50</label>
            </div>
            <div @click="selected_number(50)" class="option" ref="option">
              <input type="radio" class="radio" name="category" id="fifty" />
              <label for="fifty">50 +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="twoActive = !twoActive">{{ selectedNumber }}</div>
        </div>
      </div>

      <div class="form-group info">
        <textarea-autosize
          v-model="extraInfo"
          name="info"
          placeholder="Zusätzliche Information"
          required
        />
        <label for="info"></label>
      </div>

      <div class="form-group skills">
        <span>Teamprofil</span>
        <button @click.prevent="tagCloud = !tagCloud">
          Bitte wählen
          <img src="/icons/add.svg" />
        </button>
      </div>

      <div class="selectedSkills">
        <tag v-for="skill in selectedTags" :key="skill.name" :skill="skill" selected />
      </div>

      <tagCloud
        v-if="tagCloud"
        v-on:changeActive="hide($event)"
        :skills="skills"
        :selected="selectedTags"
        @selectedTags="getTags"
        :id="id"
      />
      <p>{{ error }}</p>
    </form>
  </div>
</template>

<script>
import tagCloud from "@/components/tag-cloud.vue";
import tag from "@/components/tag_skill.vue";
import getSkills from "@/apollo/queries/skills";
import addSupply from "@/apollo/mutations/add_supply";
import getUser from "@/apollo/queries/user";
import addDemand from "@/apollo/mutations/add_demand";
import getDemands from "@/apollo/queries/demands";


export default {
  name: "team",
 

  data() {
    return {
      active:false,
      oneActive: false,
      twoActive: false,
      tagCloud: false,
      team: 1,
      selectedTags: [],
      extraInfo: "",
      selectedNumber: "Anzahl Mitarbeiter",
      selectedTopic: "Bezeichnung",
      skills: [],
      error: ""
    };
  },
  components: {
    tagCloud,
    tag
  },
  props: {
    id: {
      type: [String, Number],
      required: false
    },
    flow: {
      type: String,
      required: false,
    },
    edit:{
      type:Boolean,
      required:false,
      default:false
    },
    savedTeam:{
      type:Object,
      required:false
    }
  },
  methods: {
    selected_number(number) {
      this.selectedNumber = number.toString();
      this.twoActive = false;
    },
    selected_topic(topic) {
      this.selectedTopic = topic;
      this.oneActive = false;
    },
    async getTagIds() {
      let tagIds = [];
      await this.selectedTags.forEach(tag => {
        tagIds.push(tag.id);
      });
      return tagIds;
    },
   async submit() {
      // validation
      if (this.selectedTopic === "Bezeichnung") {
        this.error = "Das Team benötigt eine Bezeichnung";
        return;
      } else if (this.selectedNumber === "Anzahl Mitarbeiter") {
        this.error = "Die Anzahl der Mitabreiter wird benötigt";
        return;
      } else if (this.selectedTags.length < 3) {
        this.error = "Das Team benötigt min. 3 Eigentschaften ";
        return;
      }
      console.log("stateeeeee: ",this.flow)
      console.log(this.active,this.$store.state.user.companies[0].id)
      
      if(this.edit){
         if (this.flow === "offer") {
        this.$apollo
          .mutate({
            mutation: addSupply,
            variables: {
              id:this.savedTeam.id,
              companyId: this.$store.state.user.companies[0].id,
              name: this.selectedTopic,
              quantity: parseInt(this.selectedNumber),
              skills: await this.getTagIds(),
              descriptionInt:this.extraInfo,
              active:this.active
            }
          })
          .then(({ data }) => {
            console.log("db response: ", data);
          });
      } else {
        this.$apollo
          .mutate({
            mutation: addDemand,
            variables: {
              id:this.savedTeam.id,
              companyId: this.$store.state.user.companies[0].id,
              name: this.selectedTopic,
              quantity: parseInt(this.selectedNumber),
              skills: await this.getTagIds(),
              descriptionInt:this.extraInfo,
              active:this.active
            }
          })
          .then(({ data }) => {
            console.log("db response: ", data);
          });
      }
      }else{
        if (this.flow === "offer") {
        this.$apollo
          .mutate({
            mutation: addSupply,
            variables: {
              companyId: this.$store.state.user.companies[0].id,
              name: this.selectedTopic,
              quantity: parseInt(this.selectedNumber),
              skills: await this.getTagIds(),
              descriptionInt:this.extraInfo,
              active:this.active
            }
          })
          .then(({ data }) => {
            console.log("db response: ", data);
          });
      } else {
        this.$apollo
          .mutate({
            mutation: addDemand,
            variables: {
              companyId: this.$store.state.user.companies[0].id,
              name: this.selectedTopic,
              quantity: parseInt(this.selectedNumber),
              skills: await this.getTagIds(),
              descriptionInt:this.extraInfo,
              active:this.active
            }
          })
          .then(({ data }) => {
            console.log("db response: ", data);
          });
      }
      }
      // this.$router.push("/dashboard")
    },
    hide(active) {
      this.tagCloud = active;
    },
    getTags(tags, active) {
      this.tagCloud = active;
      this.selectedTags = tags; // TODO: Write to db
    }
  },
  async created() {
    const client = this.$apollo.getClient();
    this.$apollo
      .query({
        query: getSkills
      })
      .then(({ data }) => {
        return (this.skills = data.skills);
      });
   if(this.edit){
     this.selectedTags = this.savedTeam.skills
   }
   
  }
};
</script>

<style lang="scss" scoped>
@import "assets/global";

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

      .checkbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 50px;

        span {
          margin-left: 10px;
        }

        input {
          margin: 0;
        }
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

    .overflow {
      overflow: hidden;
    }
  }
}

@media only screen and (max-width: 765px) {
  form {
    grid-template-columns: 1fr 0 !important;
    column-gap: 0 !important;

    .head {
      justify-content: space-around !important;
    }

    .right {
      grid-column: 1 !important;
    }
  }
}
</style>
