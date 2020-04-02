<template>
  <div @click="set_active" :class="{selected: active || selected}" class="tag">
    <span>{{ skill.name }}</span>
  </div>
</template>

<script>
export default {
  name: "tag",
  data() {
    return {
      active: false
    };
  },
  props: {
    skill: Object,
    selected: {
      type: Boolean,
      required: false
    }
  },
  created(){
    this.active = this.skill.active
  },
  methods: {
    set_active() {
      this.active = !this.active
      console.log("active",this.active)
      this.$emit('updateTag', this.active, this.skill)
    }
  }
};
</script>

<style scoped lang="scss">

</style>
