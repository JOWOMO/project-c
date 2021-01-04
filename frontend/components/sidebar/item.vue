<template>
  <div class="element" :class="{'-selected': selected}">
    <div class="element__inner">
      <img
        class="element__img -arrow"
        v-if="selected"
        height="16"
        width="16"
        src="/icons/arrow-right.svg"
      />
      <a
        class="element__link"
        v-if="to && to.startsWith('#')"
        :class="{'-selected': selected}"
        :href="to"
      >
        {{ name }}
      </a>
      <nuxt-link
        class="element__link"
        v-else-if="to"
        :class="{'-selected': selected}"
        :to="to"
      >
        {{ name }}
      </nuxt-link>
      <p
        v-else
        class="element__text"
      >{{ name }}</p>
      <img
        class="element__img -checkmark"
        v-if="checked"
        height="18"
        width="18"
        src="/icons/checkmark.svg"
      />
    </div>
    <sidebar-item
      class="-deep"
      v-if="items.length"
      v-for="item in (items || [])"
      :key="item.label"
      :name="item.label"
      :to="item.to"
      :items="item.items"
    />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.SidebarItem,
})export default class extends Vue {
  @Prop({default: false}) checked!: boolean;
  @Prop({default: false}) selected!: boolean;
  @Prop() to!: string;
  @Prop({default: () => []}) items!: string;
  @Prop() name!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.element {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  overflow: hidden;
  width: 100%;

  &__img {
    margin-right: 5px;

    &.-arrow {
      width: 16px;
      height: 16px;
    }
  }

  &__inner {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  &__link {
    color: $textcolor;
    font-size: $textsize;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:hover {
      color: darken($primary, 10);
    }

    &.-selected {
      color: $inputtextcolor;

      &:hover {
        color: $inputtextcolor;
      }
    }
  }

  &.-deep {
    margin-left: 20px;
  }
}
</style>
