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
          v-for="skill in newskills"
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
      newskills : []
    }
  },
 
  mounted() {
      // Compare the selected tags with all available tags
      this.newskills = []
      this.compareList(this.skills, this.selected)  
  },
  methods: {

   async compareList(skills, selected){
        this.newskills = []
        await this.skills.forEach(async skill=>{
        skill.active = false
        if(selected != null){ 
          for(var tag = 0; tag < selected.length; tag++){
            if(skill.id === selected[tag].id){
              skill.active = true
              this.selectedTags.push(skill)
              break;
            }else{
              skill.active = false
            }
          }
        }else{
          skill.active = false
        }
        this.newskills.push(skill)
    })

    
      
    },
    setActive() {
      this.$emit('changeActive', false)
    },
    async updateTag(active, value) {
      if(active == true) {
        this.selectedTags.push(
          value
        )
      } else {
        
        const index = await this.selectedTags.indexOf(value);
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
    id: [String, Number],
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/global';

.tag-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #00000030;
  z-index: 3;

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
    overflow-y: scroll;

    .head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      button {
        background: none;
        width: 30px;
        height: 30px;

        img {
          transform: rotate(45deg);
        }
      }
    }

    span {
      display: block;
      color: lighten(#000, 20);
    }

    .unselected-tags, .selected-tags {
      margin-top: 10px;
    }

    .button {
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .primary {
        width: 200px;
      }
    }
  }
}

@media only screen and (max-width: 765px) {
  .card {
    width: 90%;
    height: 90%;
    left: 5%;

    .head {
      button {
        width: 30px !important;
      }
    }
  }
}
</style>
