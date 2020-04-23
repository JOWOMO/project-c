<script lang="ts">
import { CreateElement } from "vue";
import { Vue, Component } from "nuxt-property-decorator";
const LOGO = process.env.useBetaLogo
    ? "/images/logo-beta.svg"
    : "/images/logo.svg";

@Component
export default class extends Vue {
  render(h: CreateElement) {
    return h(
      "nuxt-link",
      {
        attrs: {
          to: "/"
        }
      },
      [
        h("img", {
          attrs: {
            width: "234px",
            height: "37px",
            src: LOGO
          }
        })
      ]
    );
  }
}
</script>
