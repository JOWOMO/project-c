
<template>
  <div :class="{'autocomplete': true, 'open': isOpen && matches.length > 0}">
    <input
      class="form-control"
      type="text"
      :value="value"
      @input="change"
      @keypress.enter.prevent
      @keydown.enter="enter"
      @keydown.down="down"
      @keydown.up="up"
      @focus="open"
      @blur="close"
      :class="{ 'is-invalid': submitted && validation.$error }"
    />

    <label :for="id">
      <slot v-bind:label="label">{{ label }}</slot>
    </label>

    <div
      ref="scroller"
      v-if="isOpen && matches.length > 0"
      class="dropdown-menu"
      style="width:100%"
    >
      <div
        ref="suggestions"
        class="dropdown-menu-element"
        v-for="(suggestion, index) in matches"
        v-bind:key="suggestion"
        v-bind:class="{'active': isActive(index)}"
        @mousedown="suggestionClick(index)"
      >{{ suggestion }}</div>
    </div>

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

  isOpen = false;
  current = 0;

  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: String, required: true })
  label!: string;

  @Prop({ required: true })
  value!: string;

  @Emit("input")
  update(str: string) {
    return str;
  }

  @Prop({ required: true })
  suggestions!: string[];

  get matches() {
    if (!this.value || this.value === "") {
      return this.suggestions;
    }

    return this.suggestions.filter(str => {
      return str.toLowerCase().indexOf(this.value.toLowerCase()) >= 0;
    });
  }

  open() {
    this.current = -1;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  enter(event: KeyboardEvent) {
    if (!this.open || this.current === -1 || this.matches.length === 0) {
      return;
    }

    this.update(this.matches[this.current]);
    this.isOpen = false;

    event.cancelBubble = true;
    event.stopPropagation();
  }

  scrollToElement() {
    if (this.$refs.scroller && this.$refs.suggestions) {
      const sugg = this.$refs.suggestions as HTMLElement[];
      if (sugg.length - 1 > this.current && this.current !== -1) {
        (this.$refs.scroller as HTMLElement).scrollTop =
          sugg[this.current].offsetTop;
      }
    }
  }

  up() {
    if (this.current > 0) {
      this.current--;
      this.scrollToElement();
    }
  }

  down() {
    if (this.current < this.matches.length - 1) {
      this.current++;
      this.scrollToElement();
    }
  }

  isActive(index: number) {
    return index === this.current;
  }

  change(event: any) {
    if (this.isOpen == false) {
      this.isOpen = true;
      this.current = 0;
      this.scrollToElement();
    }

    this.update(event.target.value || "");
  }

  suggestionClick(index: number) {
    this.update(this.matches[index]);
    this.close();
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

$radius: 8px;

.autocomplete {
  position: relative;
}

.open {
  input {
    border-radius: $radius $radius 0px 0px;
  }
}

.dropdown-menu {
  user-select: none;
  box-shadow: 0 10px 6px 0 rgba(#000000, 0.2);

  z-index: 999;
  max-height: 210px;
  overflow-y: scroll;
  position: absolute;
  background: $uiComponent;

  border: 1px solid $primary;
  border-top: 0;
  border-radius: 0px 0px $radius $radius;

  .dropdown-menu-element {
    padding: 10px;
    padding-left: 20px;
    font-size: $textsize;

    &:hover {
      background-color: darken($primary, 10);
      color: white;
    }
  }

  .active {
    background-color: darken($primary, 10);
    color: white;
  }
}
</style>