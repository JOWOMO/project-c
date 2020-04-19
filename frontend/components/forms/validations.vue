<template>
  <div v-if="submitted && validation.$error">
    <div
      v-if="validation.required != null && !validation.required"
      class="field-validation"
    >{{ label }} is erforderlich.</div>

    <div v-if="validation.required == null || validation.required">
      <div
        v-if="validation.email != null && !validation.email"
        class="field-validation"
      >{{ label }} ist keine gültige E-Mail Adresse.</div>
      <div
        v-if="validation.sameAs != null && !validation.sameAs"
        class="field-validation"
      >{{ label }} stimmt nicht überein.</div>
      <div
        v-if="validation.between != null && !validation.between"
        class="field-validation"
      >{{ label }} muss zwischen {{validation.$params.between.min}} und {{validation.$params.between.max}} sein.</div>
      <div
        v-if="validation.minLength != null && !validation.minLength"
        class="field-validation"
      >Es müssen mindestens {{validation.$params.minLength.min}} {{ label }} sein.</div>
      <div
        v-if="validation.minValue != null && !validation.minValue"
        class="field-validation"
      >{{ label }} darf nicht kleiner als {{validation.$params.minValue.min}} sein.</div>
      <div
        v-if="validation.contains != null && !validation.contains"
        class="field-validation"
      >Bitte wähle eine {{label}} aus der Liste.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Boolean, required: true })
  submitted!: boolean;

  @Prop({ type: Object, required: true })
  validation!: string;

  @Prop({ type: String, required: true })
  label!: string;
}
</script>

<style lang="scss" scoped>
</style>
