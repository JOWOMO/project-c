<template>
  <div @click="set_active" v-bind:class="{selected: active}" class="tag">
    <p>{{ skill }}</p>
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
  }
};
</script>

<style scoped lang="scss">
@import 'assets/global';

.tag {
  width: 200px;
  height: 70px;
  border: 2px solid $primary;
  border-radius: 10px;
  text-align: center;
  margin: 20px;

  p {
    font-weight: bold;
    font-size: 20px;
    line-height: 70px;
    color: deepskyblue;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.selected {
  background: deepskyblue;

  p {
    color: #fff;
  }
}
</style>
