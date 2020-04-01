<template>
  <div @click="set_active" v-bind:class="{selected: active}" class="tag">
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
    skill: String
  },
  methods: {
    set_active() {
      this.active = true
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

  &.active {
    background: $primary;

    span {
      color: #fff;
    }
  }
}
</style>
