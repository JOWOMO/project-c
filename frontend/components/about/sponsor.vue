<template>
  <div class="sponsor">
    <div v-if="logo" class="logo">
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
  @Prop() person!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

$grid: 44px;

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

    img {
      height: 80px;
    }
  }

  .text {
    padding-top: $grid / 2;
    grid-column: 1 / span 2;
    grid-row: 2;
  }
}

.sponsor {
  padding-top: $grid * 1;
}

.sponsor + .sponsor {
  padding-top: $grid * 2.5;
}

@media only screen and (min-width: $breakpoint_md) {
  .sponsor {
    .person {
      img {
        height: 120px;
      }
    }

    .logo {
      img {
        height: 120px;
      }
    }
  }
}
</style>
