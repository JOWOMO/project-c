<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

@Component
export default class extends Vue {
  async asyncData({redirect}: Context) {
    redirect(302, 'https://weserberglandag.de/allgemeine-geschaeftsbedingungen-agb/');
  }
}
</script>
