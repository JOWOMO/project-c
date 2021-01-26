<template>
  <div class="card">
    <div class="left">
      <h2>{{ teaser }} {{ match.quantity }} Mitarbeiter</h2>
      <p class="highlighted heading">{{ match.name }}</p>

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

      <div v-if="!disableConnect" class="bottom">
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
import {ComponentName} from "@/constants/componentName";

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

@Component({
  name: ComponentName.MatchTeam,
  components: { tag, VClamp }
})
export default class extends Vue {
  @Prop() flow!: string;
  @Prop() match!: MatchDetails;
  @Prop() contact!: MatchContact;
  @Prop() requestedSkills!: { [id: string]: boolean };
  @Prop({ default: false }) disableConnect!: boolean;

  get matchingSkills() {
    if (!this.requestedSkills) return [];
    return this.match.skills.filter(s => this.requestedSkills[s.id] == true);
  }

  get additionalSkills() {
    if (!this.requestedSkills) return this.match.skills;
    return this.match.skills.filter(s => this.requestedSkills[s.id] != true);
  }

  get teaserAll() {
    return this.flow !== "demand" ? "Gesuche" : "Verfügbarkeiten";
  }

  get teaser() {
    return this.flow !== "demand" ? "Sucht" : "Bietet";
  }

  @Emit("connect")
  connect() {
    this.$track("dashboard", "company:connect", "Jetzt verbinden");

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
  grid-template-columns: 1fr;
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

.full-match {
  color: $success !important;
}

.partial-match {
  color: $warning !important;
}

@media only screen and (max-width: $breakpoint_vl) {
  .card {
    grid-template-columns: 1fr;
  }

  .left {
    grid-column: 1;
    grid-row: 1;
  }
}

@media only screen and (max-width: $breakpoint_md) {
  .card {
    grid-template-columns: 1fr;
  }

  .left {
    grid-column: 1;
    grid-row: 1;
  }
}
</style>
