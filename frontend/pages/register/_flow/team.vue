<template>
  <div class="container">
    <h1>{{ workflow.displayName }}</h1>
    <p>Gib hier an, welche Mitarbeiter:innen Du aktuell {{ subject }}. Fasse bitte alle Mitarbeiter:innen mit der gleichen Tätigkeit in ein Team zusammen. Solltest Du Mitarbeiter:innen aus unterschiedlichen Bereichen {{ verb }}, lege bitte mehrere Teams an (z.B. Team 01 Service, Team 02 Küche).</p>

    <div v-for="(team, idx) in supplies" :key="idx">
      <div class="team-container">
        <div class="action" v-if="!team.expanded">
          <div class="button">
            <div @click="toggleVisibility('supply', idx)" class="img edit" />
          </div>
          <div class="button">
            <div @click="remove('supply', idx)" class="img rm" />
          </div>
        </div>

        <team
          class="team-form"
          v-bind:value="team"
          @input="update('supply', idx, $event)"
          :topics="topics"
          :skills="skills"
        />
      </div>
      <hr />
    </div>

    <div v-for="(team, idx) in demands" :key="idx">
      <div class="team-container">
        <div class="action" v-if="!team.expanded">
          <div class="button">
            <div @click="toggleVisibility('demand', idx)" class="img edit" />
          </div>
          <div class="button">
            <div @click="remove('demand', idx)" class="img rm" />
          </div>
        </div>

        <team
          class="team-form"
          v-bind:value="team"
          @input="update('demand', idx, $event)"
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
import getTeams from "@/apollo/queries/registration/teams.gql";

import updateSupply from "@/apollo/mutations/update_supply.gql";
import updateDemand from "@/apollo/mutations/update_demand.gql";

import removeDemand from "@/apollo/mutations/remove_demand.gql";
import removeSupply from "@/apollo/mutations/remove_supply.gql";

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
  UpdateDemandMutationVariables,
  RemoveDemandMutation,
  RemoveDemandMutationVariables,
  RemoveSupplyMutation,
  RemoveSupplyMutationVariables
} from "@/apollo/schema";
import { InjectReactive } from "vue-property-decorator";

import { RegistrationFlow, Workflow } from "../../register.vue";
import { Context } from "@nuxt/types";
import { LoadingAnimation } from "@/components/loadinganimation";

const EMPTY_TEAM: TeamDetails = {
  number: 1,
  quantity: 0,
  skills: [],
  isActive: true,
  expanded: true
};

@Component({
  components: { team },
  middleware: "authenticated"
})
export default class extends Vue {
  @InjectReactive("workflow") workflow!: Workflow;

  company!: Pick<Company, "id">;

  demands: TeamDetails[] = [];
  supplies: TeamDetails[] = [];
  skills: Pick<Skill, "id" | "name">[] = [];
  topics: string[] = [];

  get verb() {
    return this.workflow.type === 'supply'
      ? 'anbieten können'
      : 'suchen';
  }

  get subject() {
    return this.workflow.type === 'supply'
      ? 'zur Verfügung stellen kannst'
      : 'suchst';
  }

  counter = 0;
  addTeam() {
    const record = {
      ...EMPTY_TEAM,
      number: ++this.counter
    };

    record.expanded = true;

    if (this.workflow.type === RegistrationFlow.demand) {
      this.demands.push(record);
    } else {
      this.supplies.push(record);
    }
  }

  toggleVisibility(type: "supply" | "demand", idx: number) {
    const array = type === "supply" ? this.supplies : this.demands;
    this.$set(array[idx], "expanded", true);
  }

  update(type: "supply" | "demand", idx: number, value: TeamDetails) {
    console.log("Updating", type, idx, value);
    const array = type === "supply" ? this.supplies : this.demands;

    // if the user canceled the dialog this way, he canceled a new item
    if (value.quantity === 0) {
      this.counter -= 1;
      array.splice(idx, 1);
    } else {
      array.splice(idx, 1, value);
    }
  }

  async remove(type: "supply" | "demand", idx: number) {
    const array = type === "supply" ? this.supplies : this.demands;

    const action = await this.$swal.confirm(
      `Möchtest Du das Team '${array[idx].name}' wirklich löschen?`,
      "Diese Aktion kann nicht rückgängig gemacht werden.",
      true
    );

    // if .id is not set, the record has not been created yet, we can ignore that
    if (action.value == true && array[idx].id != null) {
      try {
        await this.$apollo.mutate<
          RemoveSupplyMutation, // types are equal
          RemoveSupplyMutationVariables
        >({
          mutation: type === "supply" ? removeSupply : removeDemand,
          variables: { id: array[idx].id! }
        });

        array.splice(idx, 1);
      } catch (err) {
        console.error(err);
        this.$swal.alert("Das hat leider nicht geklappt.", err.message, 'error');
      }
    } else if (action.value == true) {
      array.splice(idx, 1);
    }
  }

  checkModifiedTeams() {
    return [
      ...this.demands.filter(t => t.expanded).map(t => t.name || 'Team ' + t.number),
      ...this.supplies.filter(t => t.expanded).map(t => t.name || 'Team ' + t.number)
    ]
  }

  async back() {
    const names = this.checkModifiedTeams();

    // check if one team is expanded and if list not empty
    if (names.length > 0) {
      this.$track("registration", "modified", "Zurück");

      const result = await this.$swal.confirm(
        `Möchtest Du die Änderungen wirklich verwerfen?`,
        `Du hast die Bearbeitung ${names.length > 1 ? 'der' : 'des'} Teams '${names.join(', ')}' nicht abgeschlossen. Bitte schließe die Bearbeitungsmaske mit 'Abbrechen' oder 'OK' ab, bevor Du fortfährst.`,
      );

      // user canceled the dialog
      if (!result.value) {
        return;
      }
    }

    this.$router.push(`/register/${this.workflow.type}/company`);
  }

  @LoadingAnimation
  async save() {
    console.log("supply :", this.supplies);

    const names = this.checkModifiedTeams();

    // check if one team is expanded and if list not empty
    if (names.length > 0) {
      this.$track("registration", "modified", "Abschließen");

      this.$swal.alert(
        `Noch nicht fertig?`,
        `Du hast die Bearbeitung ${names.length > 1 ? 'der' : 'des'} Teams '${names.join(', ')}' nicht abgeschlossen. Bitte schließe die Bearbeitungsmaske mit 'Abbrechen' oder 'OK' ab, bevor Du fortfährst.`,
        'question'
      );

      return;
    }

    this.$track("registration", "team");

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
      this.$swal.alert("Das hat nicht geklappt", err.message, "error");
    }
  }

  async asyncData(context: Context) {
    console.log("async data");
    let data: Pick<
      this,
      "counter" | "demands" | "supplies" | "skills" | "company" | "topics"
    > = {
      counter: 0,
      demands: [],
      supplies: [],
      skills: [],
      topics: [],
      company: {} as Company
    };

    // NO ACCESS to this context here
    try {
      const flow: RegistrationFlow = context.params.flow as RegistrationFlow;

      const client = context.app.apolloProvider!.defaultClient;
      const result = await client.query<GetTeamsQuery, GetTeamsQueryVariables>({
        query: getTeams,
        fetchPolicy: "network-only"
      });

      const companies = result?.data?.companies;
      if (!companies || companies.length == 0) {
        throw new Error("we can't be here.");
      }

      data.skills = result.data?.skills;
      data.topics = result.data?.teamNames.sort(); // sort topics lexicographically

      data.company = companies[0]!;

      const map = (r: Demand | Supply): TeamDetails => {
        return {
          number: ++data.counter,
          id: r.id,
          isActive: r.isActive,
          name: r.name,
          quantity: r.quantity,
          skills: r.skills.map(s => s.id),
          description: r.description || undefined
        } as TeamDetails;
      };

      if (flow === RegistrationFlow.demand) {
        // @ts-ignore
        data.demands = (data.company.demands || []).map(map);

        if (data.demands.length === 0) {
          ++data.counter;
          data.demands.push(EMPTY_TEAM);
          data.demands[0].expanded = true;
        }
      } else {
        // @ts-ignore
        data.supplies = (data.company.supplies || []).map(map);

        if (data.supplies.length === 0) {
          ++data.counter;
          data.supplies.push(EMPTY_TEAM);
          data.supplies[0].expanded = true;
        }
      }

      return data;
    } catch (e) {
      console.error(e);
      context.error({ statusCode: 500, message: e.message });
    }
  }

  @Emit("selectelement")
  setElement() {
    return 2;
  }

  mounted() {
    this.setElement();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";
@import "@/assets/scales";

.container {
  h1 {
    text-align: left;
    padding-bottom: 14px;
  }

  p {
    padding-bottom: $gridsize*1.5;
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

@media only screen and (max-width: $breakpoint_vl) {
  // we first make the grid smaller
  .container {
    min-width: 550px;
    max-width: 550px;
  }
}

@media only screen and (max-width: $breakpoint_sm) {
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

  .action {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    cursor: pointer;

    .button {
      width: 44px;
      height: 44px;
      border-radius: 22px;

      background-color: white !important;
      border: 1px solid $border !important;

      display: flex;
      justify-content: center;
      align-items: center;

      transform: translate(-88px, -11px);

      .img {
        width: 22px;
        height: 22px;
        background-color: $textcolor;
      }

      .edit {
        -webkit-mask: url(/icons/edit.svg) no-repeat center;
        mask: url(/icons/edit.svg) no-repeat center;
      }

      .rm {
        -webkit-mask: url(/icons/remove.svg) no-repeat center;
        mask: url(/icons/remove.svg) no-repeat center;
      }

      &:hover {
        color: #ffffff !important;
        background-color: darken($primary, 10%) !important;

        .img {
          background-color: white;
        }
      }
    }

    .button + .button {
      margin-top: 11px;
    }
  }
}

@media only screen and (max-width: $breakpoint_vl + 180px) {
  .team-container {
    .action {
      flex-direction: row;
      transform: translate(+210px, 0px);

      .button + .button {
        margin-top: 0;
        margin-left: 11px;
      }
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
