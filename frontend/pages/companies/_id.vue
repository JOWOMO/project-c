<template>
  <div class="container">
    <div class="card_company">
      <img :src="img" alt />
      <h2>{{ profile_name }}</h2>
      <p class="highlighed">Reformhaus - Kleinhandel</p>

      <p>
        <span>{{ street }}</span>
        <span>{{ plz }}</span>
      </p>

      <p>
        <a :href="web">{{ web }}</a>
        <a :href="'mailto:' + email">{{ email }}</a>
        <a :href="'tel:' + tel">{{ tel }}</a>
      </p>

      <a :href="'mailto:' + email + '?subject=Hello from Bee2Bee'">Kontakt aufnehmen</a>
    </div>

    <div class="left">
      <h1>{{ name }}</h1>
      <p class="highlighed">sucht {{ workers }} Mitarbeiter</p>

      <!-- <hr> -->

      <div class="description">
        <h2>Beschreibung</h2>
        <p>{{ description }}</p>
      </div>

      <div class="details">
        <h3>Art der Beschäftigung</h3>
        <p>{{ employment }}</p>
      </div>

      <div class="details">
        <h3>Vergütung pro Stunde</h3>
        <p>{{ salery }}</p>
      </div>

      <div class="details">
        <h3>Körperliche Arbeit</h3>
        <p>{{ physical_work }}</p>
      </div>

      <div class="details">
        <h3>Wie viele Leih-Arbeiter werden benötigt</h3>
        <p>{{ workers }}</p>
      </div>

      <div class="details">
        <h3>Führerschein</h3>
        <p>{{ driving_license }}</p>
      </div>

      <div class="details">
        <h3>Wird ein Auto/Fahrrad benötigt?</h3>
        <p>{{ car_bike }}</p>
      </div>
    </div>

    <!-- <hr> -->

    <h3>Diese Partner könnten dich auch interessieren</h3>

    <CompanyCard
      v-for="match in matches"
      :key="match.name"
      :name="match.name"
      :workers="match.workers"
      :img="match.img"
      :distance="match.distance"
      :requirements="match.requirements"
      :matching="match.matching"
      :link="match.link"
    />
  </div>
</template>

<script>
import CompanyCard from "@/components/company_card.vue";

export default {
  components: {
    CompanyCard
  },
  async asyncData({ params, app }) {
    const { data } = await app.$axios.get(`http://localhost:5000/companies/${params.id}`);
    const matches = await app.$axios.get(`http://localhost:5000/matches`);
    return {
      name: data.name,
      profile_name: data.profile_name,
      workers: data.workers,
      description: data.description,
      street: data.street,
      plz: data.plz,
      web: data.web,
      email: data.email,
      tel: data.tel,
      img: data.img,
      employment: data.job_posts[0].employment,
      salery: data.job_posts[0].salery,
      physical_work: data.job_posts[0].physical_work,
      driving_license: data.job_posts[0].driving_license,
      car_bike: data.job_posts[0].car_bike,
      matches: matches.data
    };
  }
};
</script>

<style lang="scss" scoped>
.card_company {
  background: #00000007;
  border-radius: 5px;
  border: 1px solid grey;
  float: right;
  width: 35vw;
  padding: 40px;
  margin: 20px;

  img {
    width: 50%;
    height: auto;
    object-fit: cover;
    position: relative;
    left: 25%;
  }

  .highlighed {
    color: deepskyblue;
    margin-bottom: 20px;
  }

  p {
    margin: 20px 0;

    a {
      display: block;
      // margin: 2px 0;
      background: none;
      color: deepskyblue;
      text-decoration: none;
      padding: 2px 10px;
      text-align: center;
      width: 100%;
    }
  }

  a {
    width: 80%;
    position: relative;
    left: 10%;
    background: deepskyblue;
    color: #fff;
    padding: 10px;
    border-radius: 20px;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }
}

.left {
  margin-left: 40px;

  .highlighed {
    color: deepskyblue;
  }

  // hr {
  //     margin: 10px 0;
  //     background: #00000005;
  // }

  h2 {
    margin-top: 50px;
  }

  p {
    margin: 10px 0;
  }

  .description {
    margin-left: 20px;
  }

  .details {
    display: inline-block;
    margin: 20px;

    h3 {
      margin: 0;
    }
  }
}

h3 {
  margin-left: 40px;
}

@media only screen and (max-width: 786px) {
  .container {
    text-align: center;
    overflow-x: hidden;

    .card_company {
      float: none;
      width: 80vw;
      position: relative;
      left: 10vw;
      margin: 0;

      a {
        left: auto;
      }
    }

    .left {
      margin: 30px 0 0 0;

      p {
        margin: 0;
      }
    }

    h3 {
      margin: 20px 0 0 0;
    }
  }
}
</style>
