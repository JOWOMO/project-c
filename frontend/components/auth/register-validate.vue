<template>
  <validate class="cnt" @change-state="handleStateChange" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
import validate from "./validate.vue";

@Component({
  components: {
    validate
  }
})
export default class extends Vue {
  @Emit("change-state")
  handleStateChange(event: string, value: any) {
    return value;
  }
}
</script>

<style lang="scss" scoped>
// we normally come from the register flow. we make the container
// the same size
.cnt {
  min-width: 800px;

  /deep/ .buttons {
    display: flex;
    justify-content: flex-end;

    button {
      max-width: 200px;
      width: auto;
    }
  }
}
</style>
