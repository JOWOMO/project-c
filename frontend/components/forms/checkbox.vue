<template>
  <div class='outer'>
    <label class="container">
      <slot v-bind:label="label">{{ label }}</slot>

      <input
        type="checkbox"
        :id="id"
        :name="id"
        :autocomplete="id"
        :checked="value"
        @input="update"
        class="form-control"
      />

      <span :class="['checkmark', submitted && validation.$error ? 'is-invalid' : '' ]"></span>
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

  @Prop({ type: String, required: true })
  label!: string;

  @Prop({ required: true })
  value!: string;

  @Emit("input")
  update(event: any) {
    return event.target.checked;
  }

  parentValidate() {
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
@import "@/assets/colors";
@import "@/assets/scales";

.outer {
  min-height: $gridsize;
}

// need to reset all styles coming from form
label {
  animation: none;
  animation-delay: 0;
  animation-direction: normal;
  animation-duration: 0;
  animation-fill-mode: none;
  animation-iteration-count: 1;
  animation-name: none;
  animation-play-state: running;
  animation-timing-function: ease;
  backface-visibility: visible;
  background: 0;
  background-attachment: scroll;
  background-clip: border-box;
  background-color: transparent;
  background-image: none;
  background-origin: padding-box;
  background-position: 0 0;
  background-position-x: 0;
  background-position-y: 0;
  background-repeat: repeat;
  background-size: auto auto;
  border: 0;
  border-style: none;
  border-width: medium;
  border-color: inherit;
  border-bottom: 0;
  border-bottom-color: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-style: none;
  border-bottom-width: medium;
  border-collapse: separate;
  border-image: none;
  border-left: 0;
  border-left-color: inherit;
  border-left-style: none;
  border-left-width: medium;
  border-radius: 0;
  border-right: 0;
  border-right-color: inherit;
  border-right-style: none;
  border-right-width: medium;
  border-spacing: 0;
  border-top: 0;
  border-top-color: inherit;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-style: none;
  border-top-width: medium;
  bottom: auto;
  box-shadow: none;
  box-sizing: content-box;
  caption-side: top;
  clear: none;
  clip: auto;
  color: inherit;
  columns: auto;
  column-count: auto;
  column-fill: balance;
  column-gap: normal;
  column-rule: medium none currentColor;
  column-rule-color: currentColor;
  column-rule-style: none;
  column-rule-width: none;
  column-span: 1;
  column-width: auto;
  content: normal;
  counter-increment: none;
  counter-reset: none;
  cursor: auto;
  direction: ltr;
  display: inline;
  empty-cells: show;
  float: none;
  font: normal;
  font-family: inherit;
  font-size: medium;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  height: auto;
  hyphens: none;
  left: auto;
  letter-spacing: normal;
  line-height: normal;
  list-style: none;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: disc;
  margin: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  max-height: none;
  max-width: none;
  min-height: 0;
  min-width: 0;
  opacity: 1;
  orphans: 0;
  outline: 0;
  outline-color: invert;
  outline-style: none;
  outline-width: medium;
  overflow: visible;
  overflow-x: visible;
  overflow-y: visible;
  padding: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  page-break-after: auto;
  page-break-before: auto;
  page-break-inside: auto;
  perspective: none;
  perspective-origin: 50% 50%;
  position: static;
  /* May need to alter quotes for different locales (e.g fr) */
  quotes: "\201C""\201D""\2018""\2019";
  right: auto;
  tab-size: 8;
  table-layout: auto;
  text-align: inherit;
  text-align-last: auto;
  text-decoration: none;
  text-decoration-color: inherit;
  text-decoration-line: none;
  text-decoration-style: solid;
  text-indent: 0;
  text-shadow: none;
  text-transform: none;
  top: auto;
  transform: none;
  transform-style: flat;
  transition: none;
  transition-delay: 0s;
  transition-duration: 0s;
  transition-property: none;
  transition-timing-function: ease;
  unicode-bidi: normal;
  vertical-align: baseline;
  visibility: visible;
  white-space: normal;
  widows: 0;
  width: auto;
  word-spacing: normal;
  z-index: auto;
  /* basic modern patch */
  all: initial;
  all: unset;
}

/* The container */
.container {
  display: block !important;
  position: relative !important;

  padding-left: $gridsize*1.5;
  // margin-bottom: 12px;

  cursor: pointer;
  font-size: $textsize;
  // padding-top: 10px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;

  top: 0;
  left: 0;

  height: $gridsize;
  width: $gridsize;

  border-radius: 8px;
  background-color: $uiComponent;
  border: 1px solid $border;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  border: 1px solid $primary;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $primary;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 15px;
  top: 2x;

  width: 15px;
  height: 30px;

  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
