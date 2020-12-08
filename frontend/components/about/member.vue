<template>
  <div class="m-outer">
    <img class="block-icon" :src="'/images/team/' + img" />
    <div class="name">
      <a v-if="href" :href="href" target="_blank">
      {{ name }}
      <img src="/icons/linkedin.svg" width="18px" height="18px" />
      </a>
      <span v-else>{{ name }}</span>
    </div>
    <div v-if="role">{{ role }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import {ComponentName} from "~/constants/componentName";

@Component({
  name: ComponentName.AboutMember,
})
export default class extends Vue {
  @Prop() img!: string;
  @Prop() name!: string;

  @Prop() href?: string;
  @Prop() role?: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.m-outer {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: $gridsize;
  flex-basis: 50%;

  div {
      text-align: center;
      vertical-align: middle;
  }

  img {
    vertical-align: middle;
    display: inline-block;
  }

  .name {
    white-space: nowrap;
  }
}

.block-icon {
  justify-self: center;
  width: $gridsize * 3;
  border-radius: 50%;

  margin-bottom: $gridsize / 4;
}

@media only screen and (max-width: $breakpoint_sm) {
  .m-outer {
    flex-basis: 100%;
  }
}

@media only screen and (min-width: $breakpoint_vl) {
  .m-outer {
    flex-basis: 33%;
  }
}


</style>
