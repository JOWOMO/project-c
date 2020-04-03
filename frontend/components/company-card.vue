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
          :skill="skill.name"
          class="tag"
        />
      </div>
      <div class="description">
        <h4>Beschreibung</h4>
        <p>{{ description }}</p>
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
        <span>{{ adress.number }}</span>
        <span>{{ adress.city }}</span>
      </div>
      <div class="linkIcon">
        <nuxt-link to="/">Alle Teams anzeigen</nuxt-link>
        <img src="/icons/arrow-left.svg">
      </div>
      <button class="cta">Jetzt verbinden</button>
    </div>
  </div>
</template>

<script>
import tag from '@/components/tag_skill.vue'
export default {
  name: 'companyCard',
  components: {
    tag
  },
  props: {
    company_name: String,
    distance: Number,
    type: String,
    employees: Number,
    industry_worker: String,
    skills: Array,
    description: String,
    img: String,
    profile_name: String,
    industry: String,
    adress: Object,
    percentage: Number
  },
  computed: {
    bestMatch() {
      return (this.percentage >= 70) ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 1000px;
  height: 350px;
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

    .adress {
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        margin-left: 10px;
      }
    }

    .highlighted {
      color: #25A6DA;
      font-weight: bold;
    }

    .description {
      width: 80%;
      height: 65px;
      margin: 0 auto;
      overflow: hidden;

      p {
        width: 100%;
      }
    }

    .percent {
      justify-self: flex-end;
      color: #EDBA38;
    }

    .green {
      color: #00DE3E;
    }
  }

  .right {
    grid-column: 2;
    margin-left: 15px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #00000010;
      object-fit: cover;
    }
    .adress {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      span {
        color: #00000060;
      }
    }

    .linkIcon {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      img {
        width: 30px;
        height: auto;
        border: none;
        border-radius: 0;
      }

      span {
        display: inline-block;
      }
    }

    button {
      max-width: 400px;
      height: 40px;
      margin: 0 10px;
      justify-self: center;
    }
  }

  .line {
    grid-column: 1;
    justify-self: end;
    width: 2px;
    height: 100%;
    background: #00000010;
  }
}
</style>
