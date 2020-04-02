<template>
  <div @click="set_active" :class="{selected: active || selected}" class="tag">
    <span>{{ skill }}</span>
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
    skill: String,
    selected: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    set_active() {
      this.active = true
      this.$emit('updateTag', this.active, this.skill)
    }
  }
};
</script>

<style scoped lang="scss">
@import 'assets/global';

.tag {
  border: 1px solid $primary;
  border-radius: 30px;
  display: inline-block;
  margin: 10px;
  padding: 3px 10px;

  &:hover {
    background: $uiComponentHighlighted;
  }

  &.selected {
    background: $primary;

    span {
      color: #fff;
    }
  }
}
</style>
