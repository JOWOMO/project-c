<template>
  <div :class="{'element': true, 'selected': selected}">
    <slot>
      <img v-if="selected" height="16" width="16" src="/icons/arrow-right.svg" />
      <a
        v-if="to && to.startsWith('#')"
        :class="{'selected': selected}"
        :href="to"
      >
        {{name}}
      </a>
      <nuxt-link
        v-else-if="to"
        :class="{'selected': selected}"
        :to="to"
      >
        {{name}}
      </nuxt-link>
      <p v-else>{{ name }}</p>
      <img v-if="checked" height="18" width="18" src="/icons/checkmark.svg" />
    </slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: false }) checked!: boolean;
  @Prop({ default: false }) selected!: boolean;
  @Prop() to!: string;
  @Prop() name!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.element {
  display: flex;
  flex-direction: row;
  cursor: pointer;

  margin-top: 16px;

  img {
    margin: 4px 0;
  }

  a, p {
    color: $textcolor;
    font-weight: normal;
    font-size: $textsize;
    margin-left: 20px;
    margin-right: 10px;

    &:hover {
      color: darken($primary, 10);
    }
  }

  a.selected {
    color: $inputtextcolor;

    &:hover {
      cursor: default;
      color: $inputtextcolor;
    }
  }
}
</style>
