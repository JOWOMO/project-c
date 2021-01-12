<template>
  <div
    class="panel"
    ref="panel"
    :class="{
      '-hasShadow': hasShadow,
      '-isBlue': isBlue,
      '-isExpandable': isExpandable,
      '-isRound': isRound
    }"
  >
    <slot />
    <div
      class="panel__expandableButton"
      :class="{'-hasShadow': !open}"
      v-if="isExpandable"
      @click="toggleExpand"
    >
      <img
        class="panel__arrow"
        :class="{'-up': open}"
        src="/icons/arrow.svg"
        alt="Erweitern"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Prop, Component, Ref} from "nuxt-property-decorator";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.Panel,
})
export default class extends Vue {
  @Ref('panel') readonly panel!: HTMLDivElement;
  @Prop({default: true}) hasShadow!: boolean;
  @Prop({default: false}) isBlue!: boolean;
  @Prop({default: false}) isExpandable!: boolean;
  @Prop({default: false}) isRound!: boolean;
  @Prop({default: '300'}) maxHeight!: string;

  private open = true;
  private maxHeightAdditionalAmount = 98; // $toggle-size + $gridsize for padding

  private mounted() {
    if (this.isExpandable) {
      this.toggleExpand();
    }
  }

  private toggleExpand() {
    this.open = !this.open;
    this.panel.style.maxHeight = this.open ? `${this.panel.scrollHeight + this.maxHeightAdditionalAmount}px` : `${this.maxHeight}px`;
    if (!this.open) {
      this.panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$svg-size: 32px;
$toggle-size: 50px;

.panel {
  background-color: $secondbackground;
  overflow: hidden;
  padding: $gridsize / 2;
  position: relative;

  &__expandableButton {
    align-items: center;
    background: #FFFFFF;
    bottom: 0;
    cursor: pointer;
    display: flex;
    height: $toggle-size;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;

    &.-hasShadow {
      box-shadow: 0 0 26px 3px rgba(0,0,0,0.39);
    }
  }

  &__arrow {
    height: $svg-size;
    width: $svg-size;

    &.-up {
      transform: rotate(180deg);
    }
  }

  &.-hasShadow {
    box-shadow: 0 0 26px 3px rgba(0,0,0,0.39);
  }

  &.-isBlue {
    background-color: $primary;
    color: $uiComponent !important;

    * {
      color: $uiComponent !important;
    }
  }

  &.-isRound {
    border-radius: 12px;
  }

  &.-isExpandable {
    transition: max-height 0.5s ease-out;
    padding-bottom: $gridsize / 2 + $toggle-size;
  }
}
</style>
