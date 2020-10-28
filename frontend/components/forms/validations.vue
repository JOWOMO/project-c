<template>
  <div v-if="submitted && validation.$error">
    <div
      v-if="validation.required != null && !validation.required"
      class="field-validation"
    >{{ $t('validations.required', { label }) }}</div>

    <div v-if="validation.required == null || validation.required">
      <div
        v-if="validation.email != null && !validation.email"
        class="field-validation"
      >{{ $t('validations.email') }}</div>
      <div
        v-if="validation.sameAs != null && !validation.sameAs"
        class="field-validation"
      >{{ $t('validations.sameAs', { label }) }}</div>
      <div
        v-if="validation.samePassword != null && !validation.samePassword"
        class="field-validation"
      >{{ $t('validations.samePassword') }}</div>
      <div
        v-if="validation.between != null && !validation.between"
        class="field-validation"
      >{{ $t('validations.between', { label, min:validation.$params.between.min, max: validation.$params.between.max}) }}</div>
      <div
        v-if="validation.minSkillCount != null && !validation.minSkillCount"
        class="field-validation"
      >{{ $t('validations.minSkillCount', { label, min: validation.$params.minSkillCount.min }) }}</div>
      <div
        v-if="validation.minValue != null && !validation.minValue"
        class="field-validation"
      >{{ $t('validations.minValue', { label, min: validation.$params.minValue.min }) }}</div>
      <div
        v-if="validation.contains != null && !validation.contains"
        class="field-validation"
      >{{ $t('validations.contains', { label }) }}</div>
      <div
        v-if="validation.passwordComplexity != null && !validation.passwordComplexity"
        class="field-validation"
      >{{ $t('validations.passwordComplexity', {label}) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.FormsValidations,
})
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
