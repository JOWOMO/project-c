<template>
  <div class="container">
    <sidebar v-bin:mode="mode" />

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

<<<<<<< HEAD
          <div class="selected" ref="selected" @click="isActive = !isActive">Branche</div>
=======
        <div class="selected" ref="selected" @click="isActive = !isActive">
          Entfernung
>>>>>>> fb1b515b8dc231a257900bfcfb56eef376269192
        </div>
      </div>
    </div>

    <div class="radio">
      <button>Kacheln</button>
      <button>Karte</button>
    </div>

<<<<<<< HEAD
    <div class="matches">
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
=======
  <div class="matches">
    <companyCard
      name="Reformhaus"
      :km="5"
      type="sucht"
      emloyees="5"
      profession="verkäufer-innen"
      class="match"
    />
  </div>

    
>>>>>>> fb1b515b8dc231a257900bfcfb56eef376269192

    <!-- <div class="subheading">
      <img src="/icons/star.svg" alt="">
      <h2>Beste Matches</h2>
    </div>

    <div class="companyCards">
      <CompanyCard
        v-for="match in bestmatches"
        :key="match.name"
        :name="match.name"
        :workers="match.workers"
        :img="match.img"
        :distance="match.distance"
        :requirements="match.requirements"
        :matching="match.matching"
        :link="match.link"
        class="companyCard"
      ></CompanyCard>
    </div>

    <h2>Diese Partner könnten dich auch interessieren</h2>
    <CompanyCard
      v-for="match in lessmatches"
      :key="match.name"
      :name="match.name"
      :workers="match.workers"
      :img="match.img"
      :distance="match.distance"
      :requirements="match.requirements"
      :matching="match.matching"
      :link="match.link"
    ></CompanyCard>-->
  </div>
</template>

<script>
import companyCard from "@/components/company-card.vue";
<<<<<<< HEAD
import sidebar from "@/components/sidebars/sidebar_dashboard.vue";
=======
import sidebar from "@/components/sidebars/sidebar_dashboard.vue"
import getDemands  from "@/apollo/queries/demands"
import demandMatches from "@/apollo/queries/demand_matches"

>>>>>>> fb1b515b8dc231a257900bfcfb56eef376269192
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
              id:1,
              name:"Kundenkontakt"
            },
            {
              id:2,
              name:"Deutsch"
            },
            {
              id:3,
              name:"Führerschein"
            },
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
              id:1,
              name:"Kundenkontakt"
            },
            {
              id:2,
              name:"Deutsch"
            },
            {
              id:3,
              name:"Führerschein"
            },
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
              id:1,
              name:"Kundenkontakt"
            },
            {
              id:2,
              name:"Deutsch"
            },
            {
              id:3,
              name:"Führerschein"
            },
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
              id:1,
              name:"Kundenkontakt"
            },
            {
              id:2,
              name:"Deutsch"
            },
            {
              id:3,
              name:"Führerschein"
            },
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
              id:1,
              name:"Kundenkontakt"
            },
            {
              id:2,
              name:"Deutsch"
            },
            {
              id:3,
              name:"Führerschein"
            },
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
              id:1,
              name:"Kundenkontakt"
            },
            {
              id:2,
              name:"Deutsch"
            },
            {
              id:3,
              name:"Führerschein"
            },
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
        },
<<<<<<< HEAD
        team: {
          editing: false,
          passed: false
=======
      }
    }
  },

 async fetch(){
    console.log("fetching");
    // TODO: need to prove if offer or search flow
    try{
      const demands = await this.$apollo.query({query:getDemands})
      console.log("demands available: ",demands)
      // Try to get matches for given demand ids
      // try{
      //   const matches = await this.$apollo.query({query:demandMatches,variables:{
      //     id:demands
      //   }})
      // }catch(err){
      //   // this will probably not fail because the return code is null and no exception
      //   console.log("no match found",err)
      // }
    }catch(err){
      console.log("could not get demands")
    }




    this.$axios.get("http://localhost:4000/matches")
      .then((response)=>{
        console.log("reponse match: ",response);
        this.bestmatches = response.data.sort((a, b) => (a.matching > b.matching) ? -1 : 1).slice(0,3);
        this.lessmatches = response.data.sort((a, b) => (a.matching > b.matching) ? -1 : 1).slice(3,6);
        
        console.log("bestmatches: ", this.bestmatches)
        console.log("lessmatches",this.lessmatches)
      })
      .catch((err)=>{
        console.log("Err fetching match: ",err)
      });
      try{
        const supply = await this.$axios.get("http://localhost:4000/supply")
        const demand = await this.$axios.get("http://localhost:4000/demand") 
        if(this.supply != null){
          //user is searching
          this.mode.label = "Mein Team"
          this.mode.data = supply
          this.mode.data.link = "Team/s verwalten"
        }else if(demand != null){
          // user is offering
          this.mode.label = "Ich suche"
          this.mode.data = demand
        }else{
          // nothing was set --> user need to set team proberties 
          this.mode.label = "Team ist noch nich fertig Konfiguriert"
          this.mode.data.link = "Eistellungen" 
>>>>>>> fb1b515b8dc231a257900bfcfb56eef376269192
        }
      }
    };
  },
  methods: {
    select() {

    }
  }

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
  grid-template-columns: 400px auto;
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
<<<<<<< HEAD
    justify-content: start;
    align-items: center;
=======
    justify-content: flex-start;
    align-items: flex-start;
>>>>>>> fb1b515b8dc231a257900bfcfb56eef376269192

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
    margin-top: 50px;
    grid-column: 3;
    grid-row: 1 / span 2;
<<<<<<< HEAD
    justify-self: flex-end;
    align-self: center;
=======
    justify-self: center;
    align-self: start;
>>>>>>> fb1b515b8dc231a257900bfcfb56eef376269192

    button {
      border-radius: 0;

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

  // .tag{
  //   border: 1px solid $primary;
  //   border-radius: 30px;
  //   display: inline-block;
  //   margin: 10px;
  //   padding: 3px 10px;

  //   &:hover {
  //     background: $uiComponentHighlighted;
  //   }

  //   &.selected {
  //     background: $primary;

  //     span {
  //       color: #fff;
  //     }
  //   }
  // }
}
</style>
