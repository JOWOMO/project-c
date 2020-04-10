<template>
  <div class="register-sidebar">
    <nuxt-link to="/">
      <img width="234px" height="37px" src="/images/logo.svg" />
    </nuxt-link>

    <div class="menu">
      <div v-for="(label, index) in labels" :key="label" class="sidebar-element-wrapper">
        <div :class="['sidebar-element', index === selectedElement ? 'selected': '']">
          <img v-if="index === selectedElement" height="18" width="18" src="/icons/arrow-right.svg" />          
          <p>{{ label }}</p>
          <img v-if="index < selectedElement" height="18" width="18" src="/icons/checkmark.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class Sidebar extends Vue {
  @Prop({ type: Number, required: true }) readonly selectedElement!: Number;
  @Prop({ type: Array, required: true }) readonly labels!: string[];
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.register-sidebar {
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;

  min-width: 366px;
  background: $uiComponent;
}

a {
  z-index: 1000;
  padding-top: 40px;
  width: 100%;
  text-align: center;
}

p {
  margin-left: 20px;
}

.selected p {
  color: $inputtextcolor;
  font-weight: 500;
}

.menu {
  display: flex;
  width: 100%;
 
  flex-direction: column;
  justify-content: center;

  padding-top: 209px;
}

.sidebar-element {
  display: flex;
  flex-direction: row;
  margin: 16px 0;
  margin-left: 44px;

  img {
    margin: 4px 10px;
  }
}


@media only screen and (max-width: 890px) {
  .register-sidebar {
    height: 120px;
    width: 100vw;

    flex-shrink: 0;
  }

  a {
    width: auto;
    padding-left: 44px;
  }

  .menu {
    display: none;
  }
}
</style>
