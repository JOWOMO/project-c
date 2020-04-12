<template>
  <div>
    <div>
      <img @click="show" width="37px" height="37px" src="/icons/burger.svg" />
    </div>
    <div ref="elbackground" @click="hide" class="background">
      <div ref="elmenu" class="menu">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  open = false;

  @Ref('elbackground')
  background!: HTMLElement;
  
  @Ref('elmenu')
  menu!: HTMLElement;

  show() {
    this.background.style.visibility = 'visible';
    this.menu.style.left = '0';
  }

  hide() {
    if (this.background) this.background.style.visibility = 'hidden';
    if (this.menu) this.menu.style.left = '-70vw';
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$radius: 68px;

.background {
  user-select: none;
  background-color: rgba(#000000, 0.4);

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  margin: 0;
  padding: 0;
  z-index: 9998;

  visibility: hidden;
  transition: visibility 0.5s linear;
}

.menu {
  user-select: none;

  top: 0;
  left: -70vw;
  width: 70vw;

  margin: 0;
  padding: 0;

  position: absolute;
  z-index: 9999;

  background-color: $background;
  transition: left 0.5s linear;

  height: 100vh;
  box-shadow: 0 10px 6px 0 rgba(#000000, 0.2);
}
</style>