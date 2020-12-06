<template>
  <div :class="['goTop', isVisible ? 'isVisible' : '']" @click.prevent="backToTop">
      <div class="image" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import {ComponentName} from "~/constants/componentName";

const MINIMUM = 1000;

@Component({
  name: ComponentName.GotoTop,
})
export default class extends Vue {
  @Prop({default: false}) useBody!: boolean;

  isVisible = false;
  scroller!: any;

  backToTop() {
    this.scroller.scrollTo(0, 0);
  }

  scrolled(evt: any) {
    const offset = this.scroller.scrollTop || this.scroller.scrollY;

    if (!this.isVisible && offset > MINIMUM) {
      this.isVisible = true;
    }

    if (this.isVisible && offset <= MINIMUM) {
      this.isVisible = false;
    }

    // console.debug('offset', offset, this.isVisible);
  }

  mounted(el: any) {
    this.scroller = this.useBody ? window : this.$parent.$el;
    // console.debug("mounted", this.scroller);
    this.scroller.addEventListener("scroll", this.scrolled);
  }

  destroyed() {
    if (this.scroller) {
      // console.debug("destroyed");
      this.scroller.removeEventListener("scroll", this.scrolled);
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 45px;
  height: 45px;

  background-color: white;
  -webkit-mask: url(/icons/dropdown.svg) no-repeat center;
  mask: url(/icons/dropdown.svg) no-repeat center;

  transform: rotate(180deg);
}

.goTop {
  border-radius: 5px;
  background-color: rgb(1, 14, 27);
  background-color: rgba(1, 14, 27, 0.7);

  position: fixed;

  width: 45px;
  height: 45px;

  display: block;
  right: 15px;
  bottom: 15px;

  border: none;
  opacity: 0;
  z-index: -1;

  .fa {
    color: white;
    font-size: 22px;
  }

  &:hover {
    opacity: 1;
    background-color: rgb(1, 14, 27);
    background-color: rgba(1, 14, 27, 0.9);
  }
}

.isVisible {
  opacity: 0.5;
  z-index: 9999;
  transition: all 1s ease;
}
</style>
