<template>
  <div class="register-sidebar">
    <nuxt-link to="/">
      <img src="/images/logo.svg" />
    </nuxt-link>

    <div class="menu">
      <div v-for="(label, index) in labels" :key="label" class="sidebar-element-wrapper">
        <div :class="['sidebar-element', index === selectedElement ? 'selected': '']">
          <img v-if="index === selectedElement" src="/icons/arrow-left.svg" />          
          <p>{{ label }}</p>
          <img v-if="index < selectedElement" src="/icons/checkmark.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "nuxt-class-component";
import { Vue, Prop } from "nuxt-property-decorator";

@Component
export default class Sidebar extends Vue {
  @Prop({ type: Number, required: true }) readonly selectedElement!: Number;
  @Prop({ type: Array, required: true }) readonly labels!: string[];
}
</script>

<style lang="scss" scoped>
.register-sidebar {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  align-content: flex-start;

  height: 100vh;
  width: 330px;

  background: #fff;
}

a {
  z-index: 1000;
  padding-top: 40px;
  width: 100%;
  text-align: center;
}

p {
  margin-left: 20px;
  color: #7b7b7b;
  font-size: 18px;
  font-weight: normal;
}

.selected p {
  color: #484848;
  font-weight: 500;
}

.menu {
  padding-left: 58px;
  display: flex;
  flex-direction: column;
  // height: 100vh;
  justify-content: center;
  padding-top: 120px;

  // margin-top: -130px;
}

.sidebar-element {
  display: flex;
  flex-direction: row;
  margin: 16px 0;

  img {
    margin: 0 10px;
  }
}
</style>
