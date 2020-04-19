<template>
  <ul ref="menu" class="menu">
    <li
      v-for="(option, index) in options"
      :key="index"
      @click="optionClicked(option)"
      class="menu__item"
      :class="option.class"
    >{{option.name}}</li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Ref("menu") menuElement!: any;
  @Prop() options!: any;

  item!: any;
  menuWidth?: number;
  menuHeight?: number;

  show(event: MouseEvent, target?: Element) {
    this.item = target || event.target;
    const menu = this.menuElement;

    if (!this.menuWidth || !this.menuHeight) {
      menu.style.visibility = "hidden";
      menu.style.display = "block";

      this.menuWidth = menu.offsetWidth;
      this.menuHeight = menu.offsetHeight;

      menu.removeAttribute("style");
    }

    if (this.menuWidth! + event.pageX >= window.innerWidth) {
      menu.style.left = event.pageX - this.menuWidth! + 2 + "px";
    } else {
      menu.style.left = event.pageX - 2 + "px";
    }

    if (this.menuHeight! + event.pageY >= window.innerHeight) {
      menu.style.top = event.pageY - this.menuHeight! + 2 + "px";
    } else {
      menu.style.top = event.pageY - 2 + "px";
    }

    menu.classList.add("menu--active");
  }

  hide() {
    this.menuElement.classList.remove("menu--active");
  }

  optionClicked(option: any) {
    console.debug('click', option);
    this.$emit("click", option);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$radius: 68px;

ul, li {
    font-size: $textsize;
}

.menu {
  user-select: none;

  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  list-style: none;
  position: absolute;
  z-index: 9999;

  color: $textcolor;
  background-color: $uiComponent;
  border-bottom-width: 0px;
//   border-radius: $radius / 4;

  box-shadow: 0 3px 6px 0 rgba(#000000, 0.2);

  &--active {
    display: block;
  }

  &__item {
    display: flex;
    color: $textcolor;
    cursor: pointer;
    padding: 5px 15px;
    align-items: center;

    // border-radius: 0px 0px $radius/4 $radius/4;
    
    &:hover {
      background-color: $primary;
      color: #ffffff;
    }
  }

  // Have to use the element so we can make use of `first-of-type` and
  // `last-of-type`
//   li {
//     &:first-of-type {
//       margin-top: 4px;
//     }

//     &:last-of-type {
//       margin-bottom: 4px;
//     }
//   }
}
</style>