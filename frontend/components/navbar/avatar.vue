<template>
  <!-- 
    element needs tabindex to receive focus/blur 
    context menu needs to be inside to be part of the focus group
  -->
  <div class="frame" ref="frame" tabindex="0" @click="show" @blur="hide">
    <div :style="cssVars" class="avatar">{{initials}}</div>
    <contextmenu v-if="menu" :options="menu" @click="click" :ref="'menuref'" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Emit } from "nuxt-property-decorator";
import initial from "initials";
import contextmenu from "./contextmenu.vue";

@Component({ components: { contextmenu } })
export default class extends Vue {
  @Prop() menu!: any[];
  @Prop() size!: number;
  @Prop() name!: string;

  @Ref("menuref") contextmenu!: contextmenu;
  @Ref("frame") avtr!: HTMLElement;

  get initials() {
    return initial(this.name);
  }

  get cssVars() {
    return {
      "--height": this.size + "px"
    };
  }

  @Emit("menu-click")
  click(target: any) {
    return target;
  }

  show(event: MouseEvent) {
    this.contextmenu.show(event, this.avtr);
  }

  hide() {
    this.contextmenu.hide();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/colors";

.avatar {
  user-select: none;
  outline: none;

  display: block;
  text-align: center;

  line-height: var(--height);
  height: var(--height);
  width: var(--height);

  background: lighten($primary, 20%);
  border: 1px solid $border;
  border-radius: var(--height);
  cursor: pointer;

  &:hover {
    background-color: darken($primary, 10%) !important;
    color: white;
  }
}

.frame {
  outline: none;

  &:focus {
    .avatar {
      background-color: darken($primary, 10%) !important;
      color: white;
    }
  }
}
</style>
