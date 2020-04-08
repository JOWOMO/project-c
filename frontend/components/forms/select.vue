<template>
  <div>
    <select
      class="form-control"
      :class="{ 'is-invalid': submitted && validation.$error }"
      :id="id"
      :name="id"
      :value="value"
      @input="update"
    >
      <option hidden disabled value>- Bitte auswählen -</option>
      <option
        v-for="ind in values"
        :key="ind.id"
        :value="ind.id"
        :selected="ind.id == value"
      >{{ ind.name }}</option>
    </select>

    <label :for="id">
      <slot v-bind:label="label">{{ label }}</slot>
    </label>

    <slot
      v-if="submitted && validation.$error"
      name="validation"
      v-bind:validation="validation"
      v-bind:label="label"
    >
      <validations :label="label" :validation="validation" :submitted="submitted" />
    </slot>
  </div>
</template>

<script lang="ts">
import Component from "nuxt-class-component";
import {
  Vue,
  Prop,
  State,
  Inject,
  Watch,
  Emit,
  On
} from "nuxt-property-decorator";
import { Validation } from "vuelidate";
import { get } from "lodash";
import validations from "./validations.vue";

@Component({ components: { validations } })
export default class extends Vue {
  @Inject("validation")
  validationAccessor!: any;

  validation: Validation = {} as Validation;
  submitted = false;

  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: Array, required: true, default: [] })
  values!: string;

  @Prop({ type: String, required: true })
  label!: string;

  @Prop({ required: true })
  value!: string;

  @Emit("input")
  update(event: any) {
    return event.target.value || "";
  }

  parentValidate() {
    this.submitted = true;
    this.$forceUpdate();
  }

  mounted() {
    // we need to bind to the validation event as
    // injected properties are not reactive
    const accessor = this.validationAccessor();
    this.validation = accessor ? get(accessor, this.id, {}) : {};
    this.$parent.$on("validate", this.parentValidate.bind(this));
  }

  beforeDestroy() {
    this.$parent.$off("validate");
  }
}
</script>

<style lang="scss" scoped>
</style>
