<template>
  <div class="sponsor">
    <div v-if="logo" :class="{'logo': true, 'x': scalex, 'y': !scalex}">
      <img :src="'/images/sponsors/' + logo" />
    </div>

    <div v-if="person" class="person">
      <img :src="'/images/sponsors/' + person" />
    </div>

    <div class="text">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() logo!: string;
  @Prop({ default: false }) scalex!: boolean;
  @Prop() person!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.sponsor {
  display: grid;
  grid-auto-columns: 1fr 1fr;
  align-items: center;

  .person {
    grid-column: 1;
    grid-row: 1;
    text-align: left;

    img {
      height: 80px;
      border-radius: 50%;
    }
  }

  .logo {
    text-align: right;
    grid-column: 2;
    grid-row: 1;
  }

  .y {
    img {
      max-height: 80px;
    }
  }

  .x {
    img {
      width: 250px;
    }
  }

  .text {
    padding-top: $gridsize / 2;
    grid-column: 1 / span 2;
    grid-row: 2;
  }
}

.sponsor {
  padding-top: $gridsize * 1;
}

.sponsor + .sponsor {
  padding-top: $gridsize * 2.5;
}

@media only screen and (min-width: $breakpoint_md) {
  .sponsor {
    .y {
      img {
        max-height: 120px;
      }
    }

    .x {
      img {
        width: 300px;
      }
    }

    .person {
      img {
        height: 120px;
      }
    }
  }
}
</style>
