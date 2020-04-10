<template>
  <div class="card">
    <div class="left">
      <h2>{{ company.name }}</h2>
      <div class="location">
        <img src="/icons/pin.svg" alt />
        <span>{{ distance }} entfernt</span>
      </div>

      <p class="highlighted">{{ match.quantity }} Mitarbeiter - {{ match.name }}</p>

      <div class="tags">
        <tag
          v-for="skill in match.skills"
          :key="skill.id"
          :skill="skill"
          :name="skill.name"
          class="tag"
        />
      </div>

      <div v-if="description" class="description">
        <h4>Beschreibung</h4>
        <div class="expansionWrapper" :class="{expanded: expanded}">
          <p>{{ match.description }}</p>
        </div>
        <button class="link" @click="expanded = !expanded">{{ moreLess }}</button>
      </div>

      <div class="bottom">
        <div :class="{green: bestMatch}">{{ percentage }}% passent zu deiner Suche</div>
      </div>
    </div>

    <div class="line" />

    <div class="right">
      <span class="contact">Deine Kontaktperson</span>

      <img v-if="contact.pictureUrl" :src="contact.pictureUrl" />

      <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
      <h4>{{ (company.industry || {}).name }}</h4>

      <div class="address">
        <span>{{ company.addressLine1 }}</span>
        <span>{{ company.postalCode }}</span>
        <br />
        <span>{{ company.city }}</span>
      </div>

      <nuxt-link to="/" class="link">
        <span>Alle Teams anzeigen</span>
        <img src="/icons/arrow-left.svg" />
      </nuxt-link>

      <div class="bottom">
        <button class="cta">Jetzt verbinden</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from "nuxt-property-decorator";
import tag from "./skill.vue";
import {
  Company,
  CompanyContact,
  DemandMatch,
  Demand,
  Skill
} from "~/apollo/schema";

type MatchSkill = Pick<Skill, "name" | "id">;

type MatchContact = Pick<
  CompanyContact,
  "firstName" | "lastName" | "pictureUrl"
>;

type MatchCompany = Pick<
  Company,
  "name" | "addressLine1" | "postalCode" | "city"
>;

type MatchClassification = Pick<DemandMatch, "distance" | "percentage">;
type MatchDetails = Pick<Demand, "name" | "description" | "quantity"> & {
  salary: Demand["maxHourlySalary"];
} & {
  skills: MatchSkill[];
};

@Component({ components: { tag } })
export default class extends Vue {
  // @Prop() mode!: string;
  @Prop() company!: MatchCompany;
  @Prop() contact!: MatchContact;
  @Prop() match!: MatchDetails;
  @Prop() classification!: MatchClassification;

  expanded = false;

  get percentage() {
    return Math.round(this.classification.percentage);
  }

  get distance() {
    return this.classification.distance < 1000
      ? Math.round(this.classification.distance) + "m"
      : Math.round(this.classification.distance / 1000) + "km";
  }

  get bestMatch() {
    return this.classification.percentage >= 70 ? true : false;
  }

  get moreLess() {
    return this.expanded == false ? "mehr Anzeigen" : "weniger Anzeigen";
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.card {
  margin-top: 30px;

  background: $secondbackground;
  padding: 27px 30px;

  border: 1px solid $border; // not used anywhere else
  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
}

.left,
.right {
  grid-row: 1;
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  // align-items: flex-start;
}

.left {
  grid-column: 1;

  .location {
    padding-top: 6px;

    display: flex;
    align-items: center;

    span {
      padding-left: 12px;
      font-size: 14px;
      color: $inputlabelcolor;
    }
  }

  .highlighted {
    padding-top: 24px;
    color: $primary;
    font-weight: 500;
  }

  .tags {
    padding-top: 6px;

    display: flex;
    flex-direction: row;
    // align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;

    .tag {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  .description {
    padding-top: 24px;
  }
}

.bottom {
  display: flex;
  flex: 1;
  align-items: flex-end;
}

.line {
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  width: 1px;
  height: 100%;
  background: $border;

  margin-left: 64px;
  margin-right: 64px;
}

.right {
  grid-column: 2;

  .contact {
    color: $textcolor;
    font-size: 14px;
  }

  img {
    padding-top: 24px;
  }

  h3 {
    padding-top: 12px;
  }

  h4 {
    padding-top: 4px;
    color: $textcolor;
    font-weight: 500;
  }

  .address {
    padding-top: 20px;
    font-size: 12px;
    color: $textcolor;
  }

  a {
    font-size: 14px;
  }

  button {
    margin-top: 24px;
    
    min-width: 250px;
    max-width: 250px;
  }
}

// @media only screen and (max-width: 1150px) {
//   .card {
//     grid-template-columns: 1fr 0fr;
//     grid-template-rows: 1fr 1fr;

//     .left, .right {
//       align-items: center;
//       text-align: center;
//     }

//     .left {
//       grid-column: 1;
//       grid-row: 1;

//       .percent {
//         margin: 20px 0;
//       }
//     }

//     .right {
//       grid-column: 1;
//       grid-row: 2;
//       margin: 0;

//       .contact {
//         margin-top: 20px;
//       }

//     }

//     .line {
//       grid-column: 1;
//       grid-row: 1;
//       align-self: end;
//       height: 2px;
//       width: 100%;
//     }
//   }
// }

// @media only screen and (max-width: 765px) {

// }
</style>
