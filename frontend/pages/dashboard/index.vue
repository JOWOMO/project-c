<template>
  <div>
    <div class="head">
      <h1>Finde Personal-Partner</h1>

      <div class="buttons">
        <button @click="grid = true">Liste</button>
        <button @click="grid = false">Karte</button>
      </div>
    </div>

    <div class="content">
      <grid v-if="grid"></grid>
      <Map v-else></Map>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

import grid from '@/components/dashboard/grid.vue'
import Map from '@/components/dashboard/map.vue'

@Component({
  components: { grid, Map }
})
export default class extends Vue {
  grid: Boolean = true
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;

  .buttons {
    button {
      border: 1px solid $border;
      border-radius: 0;
      height: 40px;
      min-width: 100px;

      &:nth-of-type(odd) {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      &:nth-of-type(even) {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
  }
}

.content {
  margin: 30px 30px 0 0;
}
</style>
