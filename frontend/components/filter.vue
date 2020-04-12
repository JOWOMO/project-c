<template>
  <div class="filter">
    <div class="left">
      <div class="header">
        <h1>Finde Personal-Partner</h1>
      </div>
      <div class="subline">
        <div>{{ me.postalCode }} {{ me.city }}</div>
        <div class="km">
          <dropdown class="dropdown" :options="['+ 5 Kilometer', '+ 10 Kilometer', '+ 20 Kilometer', '+30 Kilometer', '+ 50 Kilometer', '+ 70 Kilometer', '+ 100 Kilometer']" />
        </div>
      </div>
    </div>
    <div class="right">
      <button class="third" @click.prevent="listview">Kacheln</button>
      <button class="third" @click.prevent="mapview">Karte</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import { Company } from "@/apollo/schema";
import { InjectReactive, Emit } from "vue-property-decorator";
import dropdown from "@/components/dropdown.vue";

@Component({ components: { dropdown } })
export default class extends Vue {
  @Prop({ required: true })
  me!: Pick<Company, "id" | "postalCode" | "city">;

  @Emit("viewtype")
  listview() {
    return "list";
  }

  @Emit("viewtype")
  mapview() {
    return "map";
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex: 1;
}

.left {
  flex: 1;

  .subline {
    padding-top: 16px !important;

    display: flex;
    flex-direction: row;
    align-items: center;

    h4 {
      font-size: 16px !important;
    }
  }

  .km {
    padding-left: 36px;

    .dropdown {
      min-width: 180px;
    }
  }
}

.right {
  padding-top: 4px;

  button {
    height: 34px;
    min-width: 90px;
    font-size: 14px;
    padding: 0;

    border-radius: 58px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button + button {
    margin-left: -5px;
    border-radius: 58px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>