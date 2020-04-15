<template>
  <div class="container">
    <h1>{{ workflow.displayName }}</h1>
    <p>Details helfen uns Dir passende Suchvorschläge anzuzeigen</p>

    <div v-for="(team, idx) in supplies" :key="idx">
      <div class="team-container">
        <div class="action">
          <div v-if="!team.expanded" class="edit">
            <div @click="toggleVisibilitySupply(idx)" class="img_edit" />
          </div>
          <div v-if="!team.expanded" class="rm">
            <div @click="removeSupply(idx,$event)" class="img_rm" />
          </div>
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
        <div class="action">
          <div v-if="!team.expanded" class="edit">
            <div @click="toggleVisibilityDemand(idx)" class="img_edit" />
          </div>
          <div v-if="!team.expanded" class="rm">
            <div @click="removeDemand(idx)" class="img_rm" />
          </div>
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

  counter = 0;
  addTeam() {
    const record = {
      ...EMPTY_TEAM,
      number: ++this.counter
    };

    if (this.workflow.type === RegistrationFlow.demand) {
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
  async removeSupply(idx: number) {
    // remove i supply
     this.$swal(
      this.supplies[idx].name + " löschen",
      "dieses Team wirklich löschen?",
      "warning",
      true
    )
      .then(async (action: any) => {
        if (action.value == true) {
          try {
            await this.$apollo.mutate<
              RemoveSupplyMutation,
              RemoveSupplyMutationVariables
            >({
              mutation: removeSupply,
              variables: { id: this.supplies[idx].id! }
            });
            this.supplies.splice(idx, 1);
          } catch (err) {
            // Supplies could not be delet ed
          }
        }
      })
      .catch(err => {
        console.log("error: ", err);
      });
  }
  async removeDemand(idx: number) {
    // remove i demand
    this.$swal(
      this.demands[idx].name + " löschen",
      "dieses Team wirklich löschen?",
      "warning",
      true
    )
      .then(async (action: any) => {
        if (action.value == true) {
          try {
            await this.$apollo.mutate<
              RemoveDemandMutation,
              RemoveDemandMutationVariables
            >({
              mutation: removeDemand,
              variables: { id: this.demands[idx].id! }
            });
            this.demands.splice(idx, 1);
          } catch (err) {
            // Demand could not be deleted
          }
        }
      })
      .catch(err => {
        console.log("error: ", err);
      });
  }

  back() {
    this.$router.push(`/register/${this.workflow.type}/company`);
  }

  @LoadingAnimation
  async save() {
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
      this.$swal("Das hat nicht geklappt", err.message, "error");
    }
  }

  async asyncData(context: Context) {
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
      data.topics = result.data?.teamNames;
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
          data.demands.push(EMPTY_TEAM);
        }
      } else {
        // @ts-ignore
        data.supplies = (data.company.supplies || []).map(map);

        if (data.supplies.length === 0) {
          data.supplies.push(EMPTY_TEAM);
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

  .action {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;

    .edit {
      width: 44px;
      height: 44px;
      border-radius: 22px;

      background-color: white !important;
      border: 1px solid $border !important;

      display: flex;
      justify-content: center;
      align-items: center;

      transform: translateX(-88px);

      .img_edit {
        width: 22px;
        height: 22px;

        background-color: $textcolor;
        -webkit-mask: url(/icons/edit.svg) no-repeat center;
        mask: url(/icons/edit.svg) no-repeat center;
      }

      &:hover {
        color: #ffffff !important;
        background-color: darken($primary, 10%) !important;

        .img_edit {
          background-color: white;
        }
      }
    }
    .rm {
      // left: 0;

      width: 44px;
      height: 44px;
      border-radius: 22px;

      background-color: white !important;
      border: 1px solid $border !important;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      transform: translateX(-88px);
      .img_rm {
        width: 22px;
        height: 22px;

        background-color: $textcolor;
        -webkit-mask: url(/icons/remove.svg) no-repeat center;
        mask: url(/icons/remove.svg) no-repeat center;
      }

      &:hover {
        color: #ffffff !important;
        background-color: darken($primary, 10%) !important;

        .img_rm {
          background-color: white;
        }
      }
    }
  }
}

@media only screen and (max-width: 1321px) {
  .team-container {
    .action {
      flex-direction: row;
      transform: translate(+200px, -6px);
      .edit {
        margin: 5px;
      }
      .rm {
        margin: 5px;
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
