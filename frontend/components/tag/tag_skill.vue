<template>
  <div @click="set_active" v-bind:class="{selected: active}" class="tag">
    <p>{{ skill }}</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "tag",
  data() {
    return {
      active: false
    };
  },
  methods: {
    set_active: function() {
      console.log("I am pressed");
      console.log(this.active);
      if (!this.active) {
        console.log("type: ", this.type);
        this.active = true;
        if (this.type === "skill") {
          this.$store.commit("add_tag", this.skill);
        } else {
          this.$store.commit("add_resource", this.skill);
        }
      } else {
        this.active = false;
        if (this.type === "skill") {
          this.$store.commit("delete_tag", this.skill);
        } else {
          this.$store.commit("delete_resource", this.skill);
        }
      }
    }
    // computed:{

    // },
  },
  props: {
    skill: String,
    type: String
  }
};
</script>

<style scoped lang="scss">
.tag {
  width: 200px;
  height: 70px;
  border: 2px solid deepskyblue;
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
