<template>
  <div class="card">
    <div class="left">
      <h3>{{ company_name }}</h3>
      <div class="location">
        <img src="/icons/pin.svg" alt="">
        <span>{{ distance }}km entfernt</span>
      </div>
      <p class="highlighted">{{ type }} {{ employees }} Mitarbeiter - {{ industry_worker }}</p>
      <div class="tags">
        <tag
          v-for="skill in skills"
          :key="skill.id"
          :skill="skill"
          class="tag"
        />
      </div>
      <div class="description">
        <h4>Beschreibung</h4>
        <div class="expansionWrapper" :class="{expanded: expanded}">
          <p>{{ description }}</p>
        </div>
        <button class="link" @click="expanded = !expanded">{{ moreLess }}</button>
      </div>
      <span class="percent" :class="{green: bestMatch}">{{ percentage }}% passent zu deiner Suche</span>
    </div>

    <div class="line" />

    <div class="right">
      <span class="contact">Deine Kontaktperson</span>
      <img :src="img">
      <h3>{{ profile_name }}</h3>
      <h4>{{ industry }}</h4>
      <div class="adress">
        <span>{{ adress.street }}</span>
        <span>{{ adress.number }}</span> <br>
        <span>{{ adress.city }}</span>
      </div>
      <nuxt-link to="/" class="link">
        <span>Alle Teams anzeigen</span>
        <img src="/icons/arrow-left.svg">
      </nuxt-link>
      <button class="cta">Jetzt verbinden</button>
    </div>
  </div>
</template>

<script>
import tag from '@/components/tag_skill.vue'
export default {
  name: 'companyCard',
  data() {
    return {
      expanded: false
    }
  },
  components: {
    tag
  },
  props: {
    company_name: {
      type: String,
      required: false,
      default: 'Bäckerei Max'
    },
    distance: {
      type: Number,
      required: false,
      default: 2
    },
    type: {
      type: String,
      required: false,
      default: 'Bietet'
    },
    employees: {
      type: Number,
      required: false,
      default: 3
    },
    industry_worker: {
      type: String,
      required: false,
      default: 'Verkäufer'
    },
    skills: {
      type:Array,
      required: false,
      default: [
        {
          id: 1,
          name:'Kundenkontakt'
        },
        {
          id: 2,
          name:'Führerschein'
        },
      ]
    },
    description: {
      type: String,
      required: false,
      default: 'Meine tolle Firma.'
    },
    img: String,
    profile_name: {
        required:false,
        default:"John Wick"
    },
    industry: {
        required:false,
        default:"Bäckerei"
    },
    adress: {
        required:false,
        default:{
            street:"Brötchenstaße 17",
            city: "Berlin",
            number:4
        },
    },
    percentage: {
        type: Number,
        required: false,
        default:80
    }
  },  
  computed: {
    bestMatch() {
      return (this.percentage >= 70) ? true : false
    },
    moreLess() {
      return (this.expanded == false) ? 'mehr Anzeigen' : 'weniger Anzeigen'
    }

  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 1000px;
  margin: 30px;
  padding: 20px;
  background: #fff;
  border: 2px solid #00000010;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  .left, .right {
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .left {
    grid-column: 1;
    justify-content: space-between;

    .location {
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        margin-left: 10px;
        color: #00000060;
      }
    }

    .highlighted {
      color: #25A6DA;
      font-weight: bold;
      margin-top: 20px;
    }

    .tags {
      .tag {
        margin: 5px;
      }
    }

    .description {
      margin: 0;
      width: 80%;

      .expansionWrapper {
        overflow: hidden;
        height: 65px;

        p {
          width: 100%;
        }

        &.expanded {
          height: auto;
        }
      }

      button {
        margin: 3px 0 0 0;
        padding: 0;
        background: none;
        color: #25A6DA;
        width: auto;
        height: auto;
        cursor: pointer;
      }
    }

    .percent {
      color: #EDBA38;
      margin-top: 30px;
    }

    .green {
      color: #00DE3E;
    }
  }

  .right {
    grid-column: 2;
    margin-left: 40px;

    .contact {
      color: #00000060;
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #00000010;
      object-fit: cover;
      margin-top: 10px;
    }

    h3 {
      margin-top: 10px;
    }

    .adress {
      margin-top: 20px;
      span {
        color: #00000060;
      }
    }

    a {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      img {
        width: 30px;
        height: auto;
        border: none;
        border-radius: 0;
        margin: 0 0 0 20px;
      }
    }

    button {
      width: 200px;
      height: 40px;
      margin: 20px 0 0 0;
      justify-self: center;
    }
  }

  .line {
    grid-column: 1;
    grid-row: 1;
    justify-self: end;
    width: 2px;
    height: 100%;
    background: #00000040;
    border-radius: 1px;
  }
}

@media only screen and (max-width: 1150px) {
  .card {
    grid-template-columns: 1fr 0fr;
    grid-template-rows: 1fr 1fr;

    .left, .right {
      align-items: center;
      text-align: center;
    }

    .left {
      grid-column: 1;
      grid-row: 1;

      .percent {
        margin: 20px 0;
      }
    }

    .right {
      grid-column: 1;
      grid-row: 2;
      margin: 0;

      .contact {
        margin-top: 20px;
      }

    }

    .line {
      grid-column: 1;
      grid-row: 1;
      align-self: end;
      height: 2px;
      width: 100%;
    }
  }
}

@media only screen and (max-width: 765px) {
  
}
</style>
