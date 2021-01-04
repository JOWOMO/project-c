<template>
  <div class="members">
    <member
      v-for="t in team"
      v-bind:key="t.name"
      :img="t.img"
      :name="t.name"
      :href="t.href"
      :role="t.role"
    />
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import member from "@/components/about/member.vue";
import { shuffle } from "lodash";
import {ComponentName} from "@/constants/componentName";

const TEAM = [
  {
    name: "Markus Kling",
    img: "markus_kling.jpg",
    role: "Co-Lead der Initative",
    href: "https://www.linkedin.com/in/mskg"
  },
  {
    name: "Marie Boos",
    img: "marie_boos.jpg",
    role: "Co-Lead der Initative",
    href: "https://www.linkedin.com/in/marie-boos-0011/"
  },
  {
    name: "Baha Jamous",
    img: "baha_jamous.jpg",
    // role: "Kommunikation",
    href: "https://www.linkedin.com/in/bahajamous/"
  },
  {
    name: "Carolle Bellenger",
    img: "carolle_bellenger.jpg",
    // role: "Design",
    href: "https://www.linkedin.com/in/carolle-bellenger-58170914a/"
  },
  {
    name: "Vinzenz Sinapius",
    img: "vinzenz_sinapius.jpg",
    // role: "Entwicklung",
    href: "https://www.linkedin.com/in/vinzenzs/"
  },
  {
    name: "Jessica Castor",
    img: "jessica_castor.jpg",
    // role: "Design",
    href: "https://www.linkedin.com/in/jessica-castor-25457b147/"
  },
  {
    name: "Claudia Hillebrand",
    img: "claudia_hillebrand.jpg",
    // role: "Research & Vision",
    href: "https://www.linkedin.com/in/claudia-hillebrand-8099801a4/"
  },
  {
    name: "Miriam Beier",
    img: "miriam_beier.jpg",
    // role: "Research & Vision",
    href: "http://linkedin.com/in/miriam-b-123876b7"
  },
  {
    name: "Sarah Schulz",
    img: "sarah_schulz.jpg",
    // role: "Research & Vision",
    href: "https://www.linkedin.com/in/sarah-schultz-2081ab41/"
  },
  {
    name: "Felix Borgmann",
    img: "felix_borgmann.jpg",
    href: "https://www.linkedin.com/in/felix-borgmann-bb2b2311b/"
  },
  {
    name: "Sven Winkelmann",
    img: "sven_winkelmann.jpg",
    href: "https://www.linkedin.com/in/sven-reichel/"
  },
  {
    name: "Manuel Deil",
    img: "manuel_deil.jpg",
    href: "https://www.linkedin.com/in/manueldeil/"
  },
  {
    name: "Sascha Erben",
    img: "sascha_erben.jpg",
    href: "https://www.linkedin.com/in/sascha-erben/"
  }
];

@Component({
  name: ComponentName.AboutMembers,
  components: {
    member
  }
})
export default class extends Vue {
  get team() {
    return shuffle(TEAM);
  }
}
</script>


<style scoped lang="scss">
@import "@/assets/scales";

.members {
  display: flex;
  margin: 0 -22px;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media only screen and (max-width: $breakpoint_sm) {
  .members {
    justify-content: center;
  }
}
</style>

