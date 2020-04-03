<template>
  <div class="container">
    <sidebar v-bin:mode="mode" class="sidebar" />

    <h1>Finde Personal-Partner</h1>
    <div class="distance">
      <span>{{ location }}</span>
      <div class="form-group half-width dropdown" id="dropdown">
        <div class="select-box">
          <div class="options-container" ref="optionsContainer" :class="{active: isActive}">
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="five" />
              <label for="five">5km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="ten" />
              <label for="ten">10km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="fifteen" />
              <label for="fifteen">15km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="twenty" />
              <label for="twenty">20km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="thirty" />
              <label for="thirty">30km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="fourty" />
              <label for="fourty">40km</label>
            </div>
            <div class="option" ref="option" @click="select">
              <input type="radio" class="radio" name="category" id="fift" />
              <label for="fift">50km +</label>
            </div>
          </div>

          <div class="selected" ref="selected" @click="isActive = !isActive">Entfernung</div>
        </div>
      </div>
    </div>

    <div class="radio">
      <button>Kacheln</button>
      <button>Karte</button>
    </div>

    <div class="matches" v-if="!map">
      <companyCard
        v-for="match in matches"
        :key="match.id"
        :company_name="match.company_name"
        :distance="match.distance"
        :type="match.type"
        :employees="match.employees"
        :industry_worker="match.industry_worker"
        :skills="match.skills"
        :description="match.description"
        :img="match.img"
        :profile_name="match.profile_name"
        :industry="match.industry"
        :adress="match.adress"
        :percentage="match.percentage"
      />
    </div>

    <div class="map" v-else>
      <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="7"
        map-type-id="terrain"
        class="map"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import companyCard from "@/components/company-card.vue";
import sidebar from "@/components/sidebars/sidebar_dashboard.vue";
import getDemands from "@/apollo/queries/demands";
import demandMatches from "@/apollo/queries/demand_matches";

export default {
  head() {
    return {
      title: "Dein Dashboard",
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  },
  middleware: "authenticated",
  components: {
    companyCard,
    sidebar
  },
  data() {
    return {
      map: false,
      isActive: false,
      location: "601234 Köln",
      bestmatches: [],
      lessmatches: [],
      matches: [
        {
          id: 1,
          company_name: "Reformhaus Müller",
          distance: 1,
          type: "Bietet",
          employees: 4,
          industry_worker: "Verkäufer",
          skills: [
            {
              id: 1,
              name: "Kundenkontakt"
            },
            {
              id: 2,
              name: "Deutsch"
            },
            {
              id: 3,
              name: "Führerschein"
            }
          ],
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa reiciendis qui, sit dolorum possimus? Eaque, mollitia aliquid. Modi hic voluptas impedit dolorem tempore vitae dolores laudantium quos eveniet veniam consectetur, facere sapiente atque quidem molestias, fuga nemo esse.",
          img: "/images/profile2.jpg",
          profile_name: "John Wick",
          industry: "Einzelhandel",
          adress: {
            street: "Neue Str.",
            number: 1,
            city: "60123 Köln"
          },
          percentage: 100
        },
        {
          id: 2,
          company_name: "Reformhaus Müller",
          distance: 1,
          type: "Bietet",
          employees: 4,
          industry_worker: "Verkäufer",
          skills: [
            {
              id: 1,
              name: "Kundenkontakt"
            },
            {
              id: 2,
              name: "Deutsch"
            },
            {
              id: 3,
              name: "Führerschein"
            }
          ],
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa reiciendis qui, sit dolorum possimus? Eaque, mollitia aliquid. Modi hic voluptas impedit dolorem tempore vitae.",
          img: "/images/profile2.jpg",
          profile_name: "John Wick",
          industry: "Einzelhandel",
          adress: {
            street: "Neue Str.",
            number: 1,
            city: "60123 Köln"
          },
          percentage: 90
        },
        {
          id: 3,
          company_name: "Reformhaus Müller",
          distance: 1,
          type: "Bietet",
          employees: 4,
          industry_worker: "Verkäufer",
          skills: [
            {
              id: 1,
              name: "Kundenkontakt"
            },
            {
              id: 2,
              name: "Deutsch"
            },
            {
              id: 3,
              name: "Führerschein"
            }
          ],
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa!",
          img: "/images/profile2.jpg",
          profile_name: "John Wick",
          industry: "Einzelhandel",
          adress: {
            street: "Neue Str.",
            number: 1,
            city: "60123 Köln"
          },
          percentage: 70
        },
        {
          id: 4,
          company_name: "Reformhaus Müller",
          distance: 1,
          type: "Bietet",
          employees: 4,
          industry_worker: "Verkäufer",
          skills: [
            {
              id: 1,
              name: "Kundenkontakt"
            },
            {
              id: 2,
              name: "Deutsch"
            },
            {
              id: 3,
              name: "Führerschein"
            }
          ],
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa reiciendis qui, sit dolorum possimus? Eaque, mollitia aliquid. Modi hic voluptas impedit dolorem tempore vitae dolores laudantium.",
          img: "/images/profile2.jpg",
          profile_name: "John Wick",
          industry: "Einzelhandel",
          adress: {
            street: "Neue Str.",
            number: 1,
            city: "60123 Köln"
          },
          percentage: 60
        },
        {
          id: 5,
          company_name: "Reformhaus Müller",
          distance: 1,
          type: "Bietet",
          employees: 4,
          industry_worker: "Verkäufer",
          skills: [
            {
              id: 1,
              name: "Kundenkontakt"
            },
            {
              id: 2,
              name: "Deutsch"
            },
            {
              id: 3,
              name: "Führerschein"
            }
          ],
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa reiciendis qui, sit dolorum possimus? Eaque, mollitia aliquid.",
          img: "/images/profile2.jpg",
          profile_name: "John Wick",
          industry: "Einzelhandel",
          adress: {
            street: "Neue Str.",
            number: 1,
            city: "60123 Köln"
          },
          percentage: 60
        },
        {
          id: 6,
          company_name: "Reformhaus Müller",
          distance: 1,
          type: "Bietet",
          employees: 4,
          industry_worker: "Verkäufer",
          skills: [
            {
              id: 1,
              name: "Kundenkontakt"
            },
            {
              id: 2,
              name: "Deutsch"
            },
            {
              id: 3,
              name: "Führerschein"
            }
          ],
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa reiciendis qui, sit dolorum possimus? Eaque, mollitia aliquid. Modi hic voluptas impedit dolorem tempore vitae dolores laudantium quos eveniet veniam consectetur, facere sapiente atque quidem molestias, fuga nemo esse quia velit laboriosam vero!",
          img: "/images/profile2.jpg",
          profile_name: "John Wick",
          industry: "Einzelhandel",
          adress: {
            street: "Neue Str.",
            number: 1,
            city: "60123 Köln"
          },
          percentage: 60
        }
      ],
      // mode = offer, supply
      mode: {
        label: {},
        data: {}
      },
      tags: [
        { val: "Distanz in km" },
        { val: "Körperliche Arbeit" },
        { val: "Anzahl Leih-Mitarbeiter" },
        { val: "Führerschein" },
        { val: "Auto" },
        { val: "Fahrrad" },
        { val: "Vollzeit" }
      ],
      positions: {
        profile: {
          editing: false,
          passed: true
        },
        company: {
          editing: true,
          passed: false
        }
      }
    };
  },

  async fetch() {
    console.log("fetching");
    // TODO: need to prove if offer or search flow
    try {
      const demands = await this.$apollo.query({ query: getDemands });
      console.log("demands available: ", demands);
      // Try to get matches for given demand ids
      // try{
      //   const matches = await this.$apollo.query({query:demandMatches,variables:{
      //     id:demands
      //   }})
      // }catch(err){
      //   // this will probably not fail because the return code is null and no exception
      //   console.log("no match found",err)
      // }
    } catch (err) {
      console.log("could not get demands");
    }

    this.$axios
      .get("http://localhost:4000/matches")
      .then(response => {
        console.log("reponse match: ", response);
        this.bestmatches = response.data
          .sort((a, b) => (a.matching > b.matching ? -1 : 1))
          .slice(0, 3);
        this.lessmatches = response.data
          .sort((a, b) => (a.matching > b.matching ? -1 : 1))
          .slice(3, 6);

        console.log("bestmatches: ", this.bestmatches);
        console.log("lessmatches", this.lessmatches);
      })
      .catch(err => {
        console.log("Err fetching match: ", err);
      });

    try {
      const supply = await this.$axios.get("http://localhost:4000/supply");
      const demand = await this.$axios.get("http://localhost:4000/demand");
      if (this.supply != null) {
        //user is searching
        this.mode.label = "Mein Team";
        this.mode.data = supply;
        this.mode.data.link = "Team/s verwalten";
      } else if (demand != null) {
        // user is offering
        this.mode.label = "Ich suche";
        this.mode.data = demand;
      } else {
        // nothing was set --> user need to set team proberties
        this.mode.label = "Team ist noch nich fertig Konfiguriert";
        this.mode.data.link = "Eistellungen";
      }
    } catch {}
  }
  // methods: {
  //   select() {

  //   }
  // }

  // async fetch() {
  //   console.log("fetching");
  //   this.$axios
  //     .get("http://localhost:4000/matches")
  //     .then(response => {
  //       console.log("reponse match: ", response);
  //       this.bestmatches = response.data
  //         .sort((a, b) => (a.matching > b.matching ? -1 : 1))
  //         .slice(0, 3);
  //       this.lessmatches = response.data
  //         .sort((a, b) => (a.matching > b.matching ? -1 : 1))
  //         .slice(3, 6);

  //       console.log("bestmatches: ", this.bestmatches);
  //       console.log("lessmatches", this.lessmatches);
  //     })
  //     .catch(err => {
  //       console.log("Err fetching match: ", err);
  //     });
  //   try {
  //     const supply = await this.$axios.get("http://localhost:4000/supply");
  //     const demand = await this.$axios.get("http://localhost:4000/demand");
  //     if (this.supply != null) {
  //       //user is searching
  //       this.mode.label = "Mein Team";
  //       this.mode.data = supply;
  //       this.mode.data.link = "Team/s verwalten";
  //     } else if (demand != null) {
  //       // user is offering
  //       this.mode.label = "Ich suche";
  //       this.mode.data = demand;
  //     } else {
  //       // nothing was set --> user need to set team proberties
  //       this.mode.label = "Team ist noch nich fertig Konfiguriert";
  //       this.mode.data.link = "Eistellungen";
  //     }
  //   } catch (err) {
  //     console.log("could not fetch data from api", err);
  //   }
  // },
  // fetchOnServer: false
};
</script>

<style scoped lang="scss">
@import "~assets/global.scss";

.container {
  display: grid;
  grid-template-columns: 400px minmax(400px, 800px) auto;
  grid-template-rows: 1fr 1fr 10fr;
  height: 100vh;
  padding: 0;

  .sidebar {
    grid-column: 1;
    grid-row: 1 / span 3;
  }

  h1 {
    grid-column: 2;
    grid-row: 1;
    justify-self: left;
    margin: 50px 0 0 10px;
  }

  .distance {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    align-items: flex-start;

    span {
      margin: 5px 10px 0 10px;
    }

    #dropdown {
      width: 200px;

      .selected {
        border-radius: 30px;
        border-color: $primary;
        padding: 5px 15px;

        &::after {
          top: 12px;
        }
      }

      .options-container.active + .selected::after {
        top: -12px;
      }
    }
  }

  .radio {
    width: 100%;
    grid-column: 3;
    grid-row: 1 / span 2;
    justify-self: center;
    align-items: center;
    margin-top: 50px;

    button {
      border-radius: 0;
      width: 90px;

      &:nth-of-type(even) {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }

      &:nth-of-type(odd) {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
      }
    }
  }

  .matches {
    grid-column: 2 / span 3;
  }
}

@media only screen and (max-width: 1150px) {
  .container {
    margin: 0 auto;
    justify-content: center;
    grid-template-columns: 1fr 0fr;
    width: 80%;

    .sidebar, .radio {
      display: none;
    }

    h1, .distance, .matches  {
      grid-column: 1;
    }

    h1 {
      justify-self: center;
    }

    .distance {
      justify-content: center;
    }
  }
}

@media only screen and (max-width: 765px) {
  .distance {
    flex-direction: column !important;
    align-items: center !important;
  }
}
</style>
