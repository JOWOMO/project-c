<template>
  <div>
    <div>
      <img class="hover" @click="show" width="37px" height="37px" src="/icons/burger.svg" />
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
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.MenuBurger,
})
export default class extends Vue {
  open = false;
  saved?: string;

  @Ref("elbackground")
  background!: HTMLElement;

  @Ref("elmenu")
  menu!: HTMLElement;

  show() {
    this.background.style.visibility = "visible";
    this.menu.style.right = "0";

    this.saved = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
  }

  hide() {
    if (this.background) this.background.style.visibility = "hidden";
    if (this.menu) this.menu.style.right = "-80vw";

    window.document.body.style.overflow = this.saved || '';
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$radius: 68px;

.hover {
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }
}

.background {
  user-select: none;
  background-color: rgba(#000000, 0.4);

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;
  z-index: 9998;

  visibility: hidden;
  transition: visibility 0.5s linear;

  overflow: hidden;
}

.menu {
  user-select: none;

  top: 0;
  right: -80vw;
  width: 80vw;

  margin: 0;
  padding: 0;
  padding-bottom: 120px;

  position: fixed;
  z-index: 9999;

  background-color: $uiComponent;
  transition: right 0.5s linear;

  height: 100vh;
  box-shadow: 0 10px 6px 0 rgba(#000000, 0.2);

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
