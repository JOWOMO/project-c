<template>
  <div class="tag-container"> <!-- @click="setActive" -->
    <div class="card">
      <div class="head">
        <h3>Eigenschaften hinzufügen</h3>
        <button @click.prevent="setActive"><img src="/icons/add.svg"></button>
      </div>
      <span>{{ selectedTags.length }} für Team {{ id }} ausgewählt</span>

      <div class="selected-tags">
        <tag
          v-for="tag in selectedTags"
          :key="tag.id"
          :skill="tag"
          selected
          class="selected-tags"
        />
      </div>

      <div class="unselected-tags">
        <tag
          v-for="skill in skills"

          :key="skill.id"
          :skill="skill"
          @updateTag="updateTag"
          class="tags"
        />
      </div>

      <div class="button">
        <button class="primary" @click.prevent="emitTags">
          hinzufügen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import tag from '@/components/tag_skill.vue'

export default {
  name: 'tag-cloud',
  data() {
    return {
      selectedTags: [],
    }
  },
  async created(){
      //prove of concept comparing list
      this.selectedTags = this.selected
      console.log(this.selectedTags)
      await this.skills.forEach(skill=>{
        skill.active = false
        this.selectedTags.forEach(tag=>{
          if(skill.id == tag.id){
            skill.active = true
          }
        })
      })
    },
  methods: {
    setActive() {
      this.$emit('changeActive', false)
    },
    updateTag(active, value) {
      console.log(active, value)

      if(active == true) {
        this.selectedTags.push(
          value
        )
      } else {
        const index = this.selectedTags.indexOf(value);
        if (index > -1) {
          this.selectedTags.splice(index, 1);
        }
      }
    },
    emitTags() {
      this.$emit('selectedTags', this.selectedTags, false)
    }
  },
  components: {
    tag
  },
  props: {
    skills: Array,
    selected:Array,
    id: Number
  }
}
</script>

<style lang="scss" scoped>

</style>
