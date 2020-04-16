<template></template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { InjectReactive } from "vue-property-decorator";

@Component
export default class extends Vue {
  @InjectReactive("all-demands")
  dem!: { id: string }[];

  @InjectReactive("all-supplies")
  sup!: { id: string }[];

  created() {
    if (this.dem.length > 0) {
      this.$router.replace(`/dashboard/demand/${this.dem[0].id}`);
      return;
    } else {
      this.$track('dashboard', 'found no demands')
    }

    if (this.sup.length > 0) {
      this.$router.replace(`/dashboard/supply/${this.sup[0].id}`);
      return;
    } else {
      this.$track('dashboard', 'found no supplies')
    }

    this.$router.replace(`/register`);
    this.$track('dashboard', 'redirect to register')
  }
}
</script>
