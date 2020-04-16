<template>
  <div class="team">  
    <div v-if="!editTeam.expanded">
      <div class="team-header">
        <h2>Team {{ formattedNumber }}</h2>
      </div>

      <div class="display">
        <div class="row">
          <div class="field">Bezeichnung</div>
          <div>{{ editTeam.name || '-' }}</div>
        </div>

        <div class="row">
          <div>Anzahl Mitarbeiter</div>
          <div>{{ editTeam.quantity }}</div>
        </div>

        <div class="nobr">
          <formSwitch class="sw" :id="'editTeam.isActive'" disabled v-model="editTeam.isActive" />

          <div class="lbl" v-if="editTeam.isActive">aktiviert</div>
          <div class="lbl" v-if="!editTeam.isActive">deaktiviert</div>
        </div>
      </div>
    </div>

    <div v-if="editTeam.expanded">
      <div class="team-header">
        <h2>Team {{ formattedNumber }}</h2>

        <formSwitch class="sw" :id="'editTeam.isActive'" v-model="editTeam.isActive" />

        <div class="lbl" v-if="editTeam.isActive">deaktivieren</div>
        <div class="lbl" v-if="!editTeam.isActive">aktivieren</div>
      </div>

      <form novalidate @submit.prevent>
        <div class="form-group half-width">
          <formAutoComplete
            id="editTeam.name"
            v-model="editTeam.name"
            :label="'Bezeichnung (Freitext)'"
            :suggestions="topics"
            
          />
        </div>

        <div class="form-group right">
          <formInput
            :id="'editTeam.quantity'"
            v-model="editTeam.quantity"
            :label="'Anzahl Mitarbeiter'"
          />
        </div>

        <div class="form-group">
          <formTextArea
            :id="'editTeam.description'"
            v-model="editTeam.description"
            name="editTeam.description"
            required
          />
          <label for="editTeam.description">Zusätzliche Informationen</label>
        </div>

        <div class="form-group lbl">
          Teamprofil (min. 3)
          <validations
            :label="'Teamprofil'"
            :validation="$v['editTeam']['skills']"
            :submitted="true"
          />
        </div>

        <div class="form-group">
          <div class="skills">
            <button class="third" @click.prevent="showTagCloud = !showTagCloud">
              Bitte wählen
              <span>+</span>
            </button>

            <tag class="tag" v-for="skill in skillWithNames" :key="skill.id" :name="skill.name" />
          </div>
        </div>

        <tagCloud
          v-if="showTagCloud"
          :skills="skills"
          v-model="editTeam.skills"
          @close-dialog="closeDialog"
        />

        <div class="form-group save-buttons">
          <button class="secondary" @click.prevent="cancel">Abbrechen</button>
          <button class="primary" @click.prevent="confirm">OK</button>
        </div>
      </form>
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
  Watch,
  On
} from "nuxt-property-decorator";

import tagCloud from "./cloud.vue";
import tag from "./skill.vue";
import validations from "@/components/forms/validations.vue";

import formInput from "@/components/forms/input.vue";
import formSelect from "@/components/forms/select.vue";
import formTextArea from "@/components/forms/textarea.vue";
import formSwitch from "@/components/forms/switch.vue";
import formAutoComplete from "@/components/forms/autocomplete.vue";

import {
  required,
  numeric,
  minValue,
  minLength
} from "vuelidate/lib/validators";
import { Validate, Validations } from "vuelidate-property-decorators";

type KeyValuePair = {
  id: string;
  name: string;
};

export type TeamDetails = {
  number: number;

  id?: string;
  isActive?: boolean;
  name?: string;
  quantity: number;
  skills: string[];
  description?: string;

  modified?: boolean;
  expanded?: boolean;
};

@Component({
  components: {
    tagCloud,
    tag,
    formInput,
    formSelect,
    formTextArea,
    formSwitch,
    formAutoComplete,
    validations
  }
})
export default class extends Vue {
  @Provide("validation")
  validation() {
    return this.$v;
  }

  @Prop({ type: Array, required: true, default: () => [] })
  skills!: KeyValuePair[];

  @Prop({ type: Array, required: true, default: () => [] })
  topics!: string[];

  @Prop({ type: Object, required: true, default: {} })
  value!: TeamDetails;

  //@ts-ignore
  editTeam!: TeamDetails = {};
  showTagCloud: boolean = false;

  @Validations()
  validations() {
    return {
      editTeam: {
        quantity: {
          required,
          numeric,
          minValue: minValue(1)
        },
        name: {
          required
        },
        skills: {
          required,
          minLength: minLength(3)
        }
      }
    };
  }

  get formattedNumber() {
    return ("0" + this.editTeam.number).slice(-2);
  }

  get skillWithNames() {
    const result = this.editTeam.skills.map(ts =>
      this.skills.find(sk => sk.id == ts)
    );

    return result;
  }

  @Emit("input")
  update(team: any) {
    return team;
  }

  closeDialog() {
    this.showTagCloud = false;
  }

  @Watch("value", { deep: true, immediate: true })
  teamUpdated(newVal: TeamDetails) {
    this.editTeam = JSON.parse(JSON.stringify(this.value));
  }

  created() {
    // make deep copy
    this.editTeam = JSON.parse(JSON.stringify(this.value));
  }

  cancel() {
    this.value.expanded = false;
    this.update(this.value);
  }

  confirm() {
    this.$v.$touch();
    this.$emit("validate");

    if (this.$v.$invalid) {
      return;
    }

    this.editTeam.modified = true;
    this.editTeam.expanded = false;

    this.update(this.editTeam);
  }
}
</script>

<style lang="scss" scoped>
@import "assets/form-layout-two";
@import "assets/colors";
@import "assets/scales";

.lbl {
  color: $inputlabelcolor;
}

.team-header {
  display: flex;
  flex-direction: row;
  align-items: center;

  .sw {
    margin-left: 50px;
  }

  .lbl {
    margin-left: 19px;
    font-size: $textsize;
  }

  margin-bottom: 20px;
}

.display {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .row {
    flex-basis: 0;
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    font-size: $textsize;
    color: $inputlabelcolor;

    :first-child {
      font-size: 12px;
    }
  }

  .nobr {
    display: flex;
    flex-direction: row;
    align-items: center;

    .lbl {
      display: flex;
      justify-content: flex-end;

      width: 100px;
    }
  }
}

.skills {
  display: flex;
  flex-direction: row;
  // align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;

  .tag {
    margin-right: 12px;
    margin-bottom: 20px;
  }

  button {
    min-width: auto !important;
    width: auto !important;

    padding-left: 20px;
    padding-right: 20px;
    margin-right: 12px;

    span {
      margin-left: 10px;
    }
  }
}

@media only screen and (max-width: 580px) {
  .display {
    flex-direction: column;

    min-width: 100vw;
    max-width: 100vw;

    .row {
      flex: 1;
      padding-bottom: 10px;

      min-width: 100vw;
      max-width: 100vw;

      flex-direction: row;

      :first-child {
        width: 120px;
      }
    }

    .nobr {
      min-width: 100vw;
      max-width: 100vw;

      align-items: baseline;
      justify-content: flex-end;
      font-size: 12px;
      flex-direction: row-reverse;

      .switch {
        margin-left: 20px;
      }

      .lbl {
        justify-content: flex-start;
      }
    }
  }

  .save-buttons {
    margin-top: 0px;
    display: flex;
    flex-direction: column-reverse;

    button {
      margin-top: 21px;
      min-width: 100%;
    }
  }

  .skills {
    // correct the margin given by the formgroup
    margin-bottom: -20px;
  }
}
</style>
