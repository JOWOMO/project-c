<template>
  <div>
    <input
      v-if="type !== 'checkbox'"
      :type="type"
      :id="id"
      :name="id"
      :autocomplete="id"
      :checked="value"
      :value="value"
      @input="update"
      :required="true"
      :disabled="disabled"
      class="form-control"
      @keypress.enter.prevent
      :class="{ 'is-invalid': submitted && validation.$error }"
    />

    <input
      v-if="type === 'checkbox'"
      :type="type"
      :id="id"
      :name="id"
      :autocomplete="id"
      :checked="value"
      @input="update"
      :disabled="disabled"
      :required="true"
      class="form-control"
      :class="{ 'is-invalid': submitted && validation.$error }"
    />

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
import { get } from 'lodash';
import  validations from "./validations.vue";

@Component({components: {validations}})
export default class extends Vue {
  @Inject("validation")
  validationAccessor!: any;

  validation: Validation = {} as Validation;
  submitted = false;

  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: String, required: false, default: "text" })
  type!: string;

  @Prop({ type: Boolean, required: false, default: false })
  disabled!: string;

  @Prop({ type: String, required: true })
  label!: string;

  @Prop({ required: true })
  value!: string;

  @Emit("input")
  update(event: any) {
    if (this.type === "checkbox") {
      return event.target.checked;
    }

    return event.target.value || "";
  }

  parentValidate() {
    /*
    console.debug(
      "validate",
      this.id,
      "error",
      this.validation.$error,
      "required",
      this.validation as any
    );
    */

    // we collect the first time submit
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
