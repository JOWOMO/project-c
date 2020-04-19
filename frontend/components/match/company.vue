<template>
  <div class="card">
    <div class="left">
      <h2>{{ company.name }}</h2>
      <div class="location">
        <img height="10px" width="10px" src="/icons/pin.svg" alt />
        <span>{{ distance }} entfernt</span>
      </div>

      <p class="highlighted">{{ teaser }} {{ match.quantity }} Mitarbeiter - {{ match.name }}</p>

      <div
          :class="{'tags-label': true, 'full-match': percentage >= 90, 'partial-match': percentage > 60 && percentage < 90}"
        >{{ percentage }}% passend zu {{ subject }}</div>

      <div class="tags">
        <tag
          v-for="skill in matchingSkills"
          :key="skill.id"
          :skill="skill"
          :name="skill.name"
          class="tag"
        />
      </div>

      <div v-if="additionalSkills.length > 0" class="tags-label">Zusätzliche Fähigkeiten</div>
      <div class="tags">
        <tag
          v-for="skill in additionalSkills"
          :key="skill.id"
          :skill="skill"
          :name="skill.name"
          class="tag"
        />
      </div>

      <div v-if="match.description" class="description">
        <h4>Beschreibung</h4>

        <v-clamp autoresize :max-lines="3">
          {{ match.description }}
          <template v-slot:after="section">
            <a v-if="section.clamped" @click="section.expand">
              <div class="text">
                <span>mehr</span>
                <div class="down" />
              </div>
            </a>

            <a v-if="section.expanded" @click="section.collapse">
              <div class="text">
                <span>weniger</span>
                <div class="down up" />
              </div>
            </a>
          </template>
        </v-clamp>
      </div>

      <!-- <div class="bottom">
        <div
          :class="{'full-match': percentage >= 90, 'partial-match': percentage > 60 && percentage < 90}"
        >{{ percentage }}% passend zu {{ subject }}</div>
      </div> -->
    </div>

    <div class="middle">
      <div class="line" />
    </div>

    <div class="right">
      <div class="contact">Deine Kontaktperson</div>

      <img class="contact-image" v-if="contact.pictureUrl" :src="contact.pictureUrl" />

      <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
      <h4>{{ (company.industry || {}).name }}</h4>

      <div class="address">
        <span>{{ company.addressLine1 }}</span>
        <br />
        <span>{{ company.postalCode }}</span>
        <span>{{ company.city }}</span>
      </div>

      <a class="all" @click.prevent="showAllTeams">
        <span>Alle {{ teaserAll }} anzeigen</span>
        <img width="14px" height="14px" src="/icons/arrow-right.svg" />
      </a>

      <div class="bottom">
        <button class="cta" @click.prevent="connect">Jetzt verbinden</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit } from "nuxt-property-decorator";
import tag from "./skill.vue";
import {
  Company,
  CompanyContact,
  DemandMatch,
  Demand,
  Skill
} from "@/apollo/schema";
import VClamp from "vue-clamp";

type MatchSkill = Pick<Skill, "name" | "id">;

type MatchContact = Pick<
  CompanyContact,
  "firstName" | "lastName" | "pictureUrl"
>;

type MatchCompany = Pick<
  Company,
  "name" | "addressLine1" | "postalCode" | "city" | "id"
>;

type MatchClassification = Pick<DemandMatch, "distance" | "percentage">;
type MatchDetails = Pick<Demand, "name" | "description" | "quantity" | "id"> & {
  salary: Demand["maxHourlySalary"];
} & {
  skills: MatchSkill[];
};

@Component({ components: { tag, VClamp } })
export default class extends Vue {
  @Prop() flow!: string;
  @Prop() requestedSkills!: { [id: string]: boolean };
  @Prop() company!: MatchCompany;
  @Prop() contact!: MatchContact;
  @Prop() match!: MatchDetails;
  @Prop() classification!: MatchClassification;

  get percentage() {
    return Math.round(this.classification.percentage);
  }

  get matchingSkills() {
    if (!this.requestedSkills) return [];
    return this.match.skills.filter((s) => this.requestedSkills[s.id] == true);
  }

  get additionalSkills() {
    if (!this.requestedSkills) return this.match.skills;
    return this.match.skills.filter((s) => this.requestedSkills[s.id] != true);
  }

  get distance() {
    return this.classification.distance < 1000
      ? Math.round(this.classification.distance) + "m"
      : Math.round(this.classification.distance / 1000) + "km";
  }

  get bestMatch() {
    return this.classification.percentage >= 70 ? true : false;
  }

  get subject() {
    return this.flow == "demand" ? "Deiner Suche" : "Deinem Angebot";
  }

  get teaserAll() {
    return this.flow !== "demand" ? "Gesuche" : "Verfügbarkeiten";
  }

  get teaser() {
    return this.flow !== "demand" ? "Sucht" : "Bietet";
  }

  @Emit("showall")
  showAllTeams() {
    return {
      flow: this.flow,
      id: this.match.id,
      company: this.company.id,
    }
  }

  @Emit("connect")
  connect() {
    return {
      id: this.match.id,
      name: this.contact.firstName,
      pictureUrl: this.contact.pictureUrl
    };
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.card {
  margin-top: 30px;

  background: $secondbackground;
  padding: 27px 30px;

  border: 1px solid $border; // not used anywhere else
  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr 64px 1fr;
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

  .tags-label {
    color: $textcolor;
    font-size: 12px;
    margin-top: 6px;
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
    font-size: 14px;

    h4 {
      padding-bottom: 14px;
      font-size: $textsize;
    }

    a {
      font-weight: normal;
      font-size: 14px;
      margin-left: 18px;

      display: inline-block;

      .text {
        display: flex;
        flex-direction: row;
      }
    }

    .down {
      margin-top: 4px;
      margin-left: 4px;
      width: 12px;
      height: 12px;

      background-color: $primary;
      -webkit-mask: url(/icons/dropdown.svg) no-repeat center;
      mask: url(/icons/dropdown.svg) no-repeat center;
    }

    .up {
      transform: rotate(180deg);
    }
  }
}

.bottom {
  display: flex;
  flex: 1;
  align-items: flex-end;
  margin-top: 24px;
}

.middle {
  grid-column: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  .line {
    height: 100%;
    width: 1px;
    background: $border;
  }
}

.full-match {
  color: $success !important;
}

.partial-match {
  color: $warning !important;
}

.right {
  grid-column: 3;

  .contact {
    color: $textcolor;
    font-size: 12px;
  }

  .contact-image {
    padding-top: 24px;
  }

  h3 {
    padding-top: 12px;
  }

  h4 {
    padding-top: 4px;
    // color: $textcolor;
    font-weight: 500;
  }

  .address {
    padding-top: 20px;
    font-size: 12px;
    color: $textcolor;
  }

  a {
    font-size: 14px;

    img {
      padding-top: 4px;
      margin-left: 16px;
    }
  }

  .all {
    padding-top: 20px;
  }

  button {
    margin-top: 24px;

    min-width: 250px;
    max-width: 250px;
  }
}

@media only screen and (max-width: 1100px) {
  .card {
    grid-template-columns: 1fr;
  }

  .left {
    grid-column: 1;
    grid-row: 1;
  }

  .middle {
    grid-column: 1;
    grid-row: 2;

    // display: none;
    height: 64px;

    .line {
      height: 1px;
      width: 100%;
    }
  }

  .right {
    grid-column: 1;
    grid-row: 3;
  }
}

@media only screen and (max-width: 800px) {
  .card {
    grid-template-columns: 1fr;
  }

  .left {
    grid-column: 1;
    grid-row: 1;
  }

  .middle {
    grid-column: 1;
    grid-row: 2;

    // display: none;
    height: 64px;

    .line {
      height: 1px;
      width: 100%;
    }
  }

  .right {
    grid-column: 1;
    grid-row: 3;

    button {
      min-width: 100%;
    }
  }
}
</style>
