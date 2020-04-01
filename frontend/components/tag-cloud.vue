<template>
  <div class="tag-container" @click="setActive">
    <div class="card">
      <h3>Eigenschaften hinzufügen</h3>
      <span>{{ skills.length }} für Team {{ team }} ausgewählt</span>
      <tag
        v-for="skill in skills"
        :key="skill.name"
        :skill="skill.name"
       />
    </div>
  </div>
</template>

<script>
import tag from '@/components/tag_skill.vue'

export default {
  name: 'tag-cloud',
  data() {
    return {
      skills: [],
      team: 1
    }
  },
  methods: {
    setActive() {
      this.$emit('changeActive', false)
    }
  },
  components: {
    tag
  },
  props: {
    skills: Array
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/global';

.tag-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #00000030;

  .card {
    max-width: 1000px;
    max-height: 700px;
    background: $background;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 20px;

    span {
      display: block;
      color: lighten(#000, 20);
    }
  }
}
</style>
