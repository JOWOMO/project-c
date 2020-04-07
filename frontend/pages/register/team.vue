<template>
  <div>
    <div class="container">
      <h1>{{ workflow().displayName }}</h1>
      <p>Details helfen uns dir Suchvorschläge anzuzeigen</p>

      <div v-for="(team, idx) in supplies" :key="idx">
        <div class="team-container">
          <div v-if="!team.expanded" class="edit" @click="toggleVisibilitySupply(idx)">
            <div class="img" />
          </div>
          <team
            class="team-form"
            v-bind:value="team"
            @input="updateSupply(idx, $event)"
            :topics="topics"
            :skills="skills"
          />
        </div>
        <hr />
      </div>

      <div v-for="(team, idx) in demands" :key="idx">
        <div class="team-container">
          <div v-if="!team.expanded" class="edit" @click="toggleVisibilityDemand(idx)">
            <div class="img" />
          </div>
          <team
            class="team-form"
            v-bind:value="team"
            @input="updateDemand(idx, $event)"
            :topics="topics"
            :skills="skills"
          />
        </div>
        <hr />
      </div>

      <button class="add" @click.prevent="addTeam">
        <div class="circle">
          <img src="/icons/circle.svg" />
        </div>

        <span>Weiteres Team hinzufügen</span>
      </button>

      <div class="buttons">
        <button class="secondary" @click.prevent="back">Zurück</button>
        <button class="primary" @click.prevent="save">Abschließen</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Inject,
  Vue,
  Component,
  Prop,
  State,
  Provide,
  Emit,
  Watch
} from "nuxt-property-decorator";

import team, { TeamDetails } from "@/components/team/index.vue";
import getTeams from "@/apollo/queries/teams.gql";

import updateSupply from "@/apollo/mutations/update_supply.gql";
import updateDemand from "@/apollo/mutations/update_demand.gql";

import {
  GetTeamsQuery,
  GetTeamsQueryVariables,
  Company,
  Skill,
  Demand,
  Supply,
  UpdateSupplyMutation,
  UpdateSupplyMutationVariables,
  UpdateDemandMutation,
  UpdateDemandMutationVariables
} from "@/apollo/schema";

import { WorkflowProvider, RegistrationFlow } from "../register.vue";

@Component({
  components: { team },
  middleware: 'authenticated',
})
export default class extends Vue {
  @Inject("workflow") workflow!: WorkflowProvider;

  company!: Pick<Company, "id">;

  demands: TeamDetails[] = [];
  supplies: TeamDetails[] = [];

  skills: Pick<Skill, "id" | "name">[] = [];
  topics: any[] = [];

  addTeam() {
    const record = {
      number: ++this.counter,
      quantity: 0,
      skills: [],
      isActive: true,
      expanded: true
    };

    if (this.workflow().type === RegistrationFlow.demand) {
      this.demands.push(record);
    } else {
      this.supplies.push(record);
    }
  }

  toggleVisibilitySupply(idx: number) {
    this.$set(this.supplies[idx], "expanded", true);
  }

  toggleVisibilityDemand(idx: number) {
    this.$set(this.demands[idx], "expanded", true);
  }

  updateSupply(idx: number, value: TeamDetails) {
    console.log("Updating", idx, value);

    // if the user canceled the dialog this way, he canceled a new item
    if (value.quantity === 0) {
      this.counter -= 1;
      this.supplies.splice(idx, 1);
    } else {
      this.supplies.splice(idx, 1, value);
    }
  }

  updateDemand(idx: number, value: TeamDetails) {
    console.log("Updating", idx, value);

    // if the user canceled the dialog this way, he canceled a new item
    if (value.quantity === 0) {
      this.counter -= 1;
      this.demands.splice(idx, 1);
    } else {
      this.demands.splice(idx, 1, value);
    }
  }

  back() {
    this.$router.push(`/register/company`);
  }

  async save() {
    try {
      for (const supply of this.supplies.filter(s => s.modified)) {
        console.log("Saving", supply);
        await this.$apollo.mutate<
          UpdateSupplyMutation,
          UpdateSupplyMutationVariables
        >({
          mutation: updateSupply,
          variables: {
            companyId: this.company.id,
            name: supply.name!,
            quantity: supply.quantity,
            skills: supply.skills,
            id: supply.id,
            active: supply.isActive!,
            descriptionExt: supply.description
          }
        });
      }

      for (const supply of this.demands.filter(s => s.modified)) {
        console.log("Saving", supply);
        await this.$apollo.mutate<
          UpdateDemandMutation,
          UpdateDemandMutationVariables
        >({
          mutation: updateDemand,
          variables: {
            companyId: this.company.id,
            name: supply.name!,
            quantity: supply.quantity,
            skills: supply.skills,
            id: supply.id,
            active: supply.isActive!,
            descriptionExt: supply.description
          }
        });
      }

      this.$router.push(`/welcome`);
    } catch (err) {
      console.error(err);
      this.$swal("Das hat nicht geklappt", err.message, "error");
    }
  }

  counter = 0;
  map(r: Demand | Supply): TeamDetails {
    return {
      number: ++this.counter,
      id: r.id,
      isActive: r.isActive,
      name: r.name,
      quantity: r.quantity,
      skills: r.skills.map(s => s.id),
      description: r.description || undefined
    };
  }

  async mounted() {
    this.workflow().setStage(2);

    this.topics = [
      "Demand Team 2",
      "Handwerker",
      "Verköufer",
      "Lagerarbeiter",
      "Krankenpfleger"
    ].map(e => ({ id: e, name: e }));

    try {
      const client = this.$apollo.getClient();
      const result = await this.$apollo.query<
        GetTeamsQuery,
        GetTeamsQueryVariables
      >({
        query: getTeams
      });

      const companies = result?.data?.companies;
      if (!companies || companies.length == 0) {
        throw new Error("we can't be here.");
      }

      this.skills = result.data?.skills;
      this.company = companies[0]!;

      // other code does work for both arrays
      // by just leaving one unfilled we achieve what we want
      if (this.workflow().type === RegistrationFlow.demand) {
        this.counter = 0;
        //@ts-ignore
        this.demands = (this.company.demands || []).map(this.map.bind(this));

        if (this.demands.length === 0) {
          this.addTeam();
        }
      } else {
        this.counter = 0;
        //@ts-ignore
        this.supplies = (this.company.supplies || []).map(this.map.bind(this));

        if (this.supplies.length === 0) {
          this.addTeam();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";

.container {
  h1 {
    text-align: left;
    padding-bottom: 14px;
  }

  p {
    padding-bottom: 75px;
  }

  .buttons {
    padding-top: 21px;
    display: flex;
    justify-content: space-between;

    button {
      max-width: 200px;
      width: auto;
    }

    margin-bottom: 50px;
    margin-top: 50px;
  }

  hr {
    margin-top: 30px; // 20px coming from tags
    margin-bottom: 30px;

    border-top: 1px solid $border;
  }

  max-width: 800px;
  min-width: 800px;
}

@media only screen and (max-width: 1150px) {
  // we first make the grid smaller
  .container {
    min-width: 550px;
    max-width: 550px;
  }
}

@media only screen and (max-width: 580px) {
  .container {
    min-width: 100vw;
    max-width: 100vw;

    padding-left: 20px;
    padding-right: 20px;

    .buttons {
      margin-top: 0px;
      flex-direction: column-reverse;

      button {
        margin-top: 21px;
        min-width: 100%;
      }
    }
  }
}

.team-container {
  position: relative;

  .edit {
    position: absolute;
    left: 0;

    width: 44px;
    height: 44px;
    border-radius: 22px;

    background-color: white !important;
    border: 1px solid $border !important;

    display: flex;
    justify-content: center;
    align-items: center;

    transform: translateX(-88px);

    .img {
      width: 22px;
      height: 22px;

      background-color: $textcolor;
      -webkit-mask: url(/icons/edit.svg) no-repeat center;
      mask: url(/icons/edit.svg) no-repeat center;
    }

    &:hover {
      color: #ffffff !important;
      background-color: darken($primary, 10%) !important;

      .img {
        background-color: white;
      }
    }
  }
}

@media only screen and (max-width: 1321px) {
  .team-container {
    .edit {
      transform: translate(+150px, -6px);
    }
  }
}

@media only screen and (max-width: 1090px) {
  .team-container {
    .edit {
      transform: translate(+150px, -6px);
    }
  }
}

.add {
  grid-column: 2;
  display: flex;
  align-items: center;
  width: auto;
  background: none;
  cursor: pointer;

  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #25a6da;

    img {
      width: 20px;
      height: 20px;
      margin-top: 10px;
    }
  }

  span {
    color: #25a6da;
    font-weight: 500;
    margin-left: 44px;
    display: inline-block;
  }
}
</style>
