<template>
  <keep-alive>
    <div v-if="visible" class="footer">
      <div class="text">
        Diese Website verwendet Cookies für Analysen, personalisierte Inhalte und Werbung.
        Indem Sie diese Website nutzen, erklären Sie sich mit dieser Verwendung einverstanden.
        <nuxt-link to="/info/privacy">Weitere Informationen</nuxt-link>
      </div>
      <button class="primary" @click.prevent="accept">Verstanden</button>
    </div>
  </keep-alive>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Cookies from "universal-cookie";
import {ComponentName} from "@/constants/componentName";

@Component({
  name: ComponentName.Cookies,
})
export default class extends Vue {
  visible = false;

  accept() {
    const cookies = new Cookies();

    let date = new Date();
    date.setFullYear(date.getFullYear() + 10);

    cookies.set("tracking-consent", true, {
        path: "/",
        expires: date
    });

    this.visible = false;
  }

  created() {
    const cookies = new Cookies();
    if (!cookies.get("tracking-consent")) {
        this.visible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";
@import "@/assets/scales";

.footer {
  background-color: $border;
  padding: $gridsize/2;
  color: $textcolor;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 9999;

  display: flex;
  flex-direction: row;

  .text {
    font-size: 14px;
    margin-right: $gridsize/2;

    a {
      font-size: 14px;
      font-weight: 500;
    }
  }

  button {
      font-size: 14px;
      height: 40px;
      min-width: auto;
      padding-left: $gridsize/2;
      padding-right: $gridsize/2;
  }
}

@media only screen and (max-width: $breakpoint_sm) {
  .footer {
    flex-direction: column;
    align-items: center;

    .text {
      margin-bottom: $gridsize/2;
    }
  }
}
</style>
