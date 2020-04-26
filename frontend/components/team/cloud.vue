<template>
  <div class="tag-container">
    <div class="card">
      <layout :columns="false">
        <row :height="94" class="taglist-head">
          <div class="title">Eigenschaften bearbeiten</div>
          <div class="subtitle">{{ value.length }} Eigenschaften für das Team ausgewählt</div>
        </row>

        <row class="tags" :height="'calc(100% - 188px)'">
          <div class="group" v-for="group in groups" :key="group[0]">
            <div class="title">
              <h4>{{ group[0] }}</h4>
            </div>

            <div class="taglist">
              <tag
                class="tag"
                v-for="skill in group[1]"
                :key="skill.id"
                :name="skill.name"
                @input="toggleTag(skill.id)"
                clickable="true"
                :selected="skill.selected"
              />
            </div>
          </div>
        </row>

        <row :height="94" class="buttons">
          <button class="primary" @click.prevent="closeDialog">Schließen</button>
        </row>
      </layout>
    </div>
    <support :position="'tag'" />
  </div>
</template>

<script lang="ts">
import {
  Inject,
  Vue,
  Component,
  Prop,
  State,
  Provide,
  Emit,
  Watch
} from "nuxt-property-decorator";

import tag from "./skill.vue";
import { remove, find } from "lodash";

import layout from "@/components/layout/layout.vue";
import column from "@/components/layout/column.vue";
import row from "@/components/layout/row.vue";
import support from "@/components/support.vue";

import { groupBy, sortBy, toPairs } from "lodash";

type KeyValuePair = {
  id: string;
  name: string;
  group: string;
};

@Component({
  components: {
    tag,
    layout,
    column,
    row,
    support
  }
})
export default class extends Vue {
  @Prop({ type: Array, required: true, default: () => [] })
  skills!: KeyValuePair[];

  @Prop({ type: Array, required: true }) value!: string[];

  toggleTag(id: string) {
    if (!find(this.value, v => v == id)) {
      this.$track("registration", "team:edit:tags:toggle", "enable", id);
      this.value.push(id);
    } else {
      this.$track("registration", "team:edit:tags:toggle", "disable", id);

      // we must keep the array instance
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] == id) {
          this.value.splice(i, 1);
        }
      }
    }

    // console.debug("Toggle", id, "result", this.value);
    this.update();
  }

  get tagsWithSelection() {
    return this.skills.map(s => ({
      ...s,
      selected: this.value.find(v => v == s.id)
    }));
  }

  get groups() {
    return sortBy(
      toPairs(groupBy(this.tagsWithSelection, s => s.group)),
      p => p[0]
    );
  }

  @Emit("input")
  update() {
    return this.value;
  }

  @Emit("close-dialog")
  closeDialog() {
    this.$track("registration", "team:edit:tags:close");

    // console.debug("close dialog");
    window.document.body.style.overflow = this.saved || "";
  }

  saved?: string;

  mounted() {
    this.$track("registration", "team:edit:tags:start");

    // console.debug("mounted");
    this.saved = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
  }
}
</script>

<style lang="scss" scoped>
@import "assets/colors";
@import "@/assets/scales";

.tag-container {
  position: fixed;
  width: 100vw;
  height: 100vh;

  top: 0;
  left: 0;

  background: #00000080;
  z-index: 3;

  overflow: hidden;

  .card {
    overflow: hidden;

    max-width: calc(100vw - #{$gridsize});
    max-height: calc(100vh - #{$gridsize * 3});

    border: 1px solid $border;
    box-shadow: 0 10px 6px 0 rgba(#000000, 0.2);

    background: $background;
    position: relative;

    top: calc(50% - #{$gridsize}* 2);
    left: calc(50% - #{$gridsize});
    transform: translate(-50%, -50%);

    border-radius: 10px;
    margin: $gridsize;

    display: flex;
    flex: 1;

    .taglist-head {
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: flex-start;

      margin: 0 $gridsize/2;

      .title {
        width: calc(100vw - #{$gridsize * 3});
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $headercolor;
        font-size: $h2FontSize;
        font-weight: 500;
      }

      .subtitle {
        width: calc(100vw - #{$gridsize * 3});
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: $textcolor;
      }
    }

    .tags {
      overflow-y: scroll;
      padding: $gridsize/2;
      // padding-top: 0;

      width: 100%;
      background: white;

      .group {
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        justify-content: flex-start;

        margin-top: $gridsize/4;

        .title {
          padding-bottom: $gridsize/4;
        }
      }

      .taglist {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;

        .tag {
          margin-right: $gridsize/4;
          margin-bottom: $gridsize/4;
        }

        // margin-top: 22px;
      }
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}

@media only screen and (max-width: $breakpoint_sm) {
  .tag-container {
    .card {
      width: calc(100vw - #{$pageMarginMin});

      .taglist-head {
        .title {
          width: calc(100vw - #{$pageMarginMin + $gridsize * 2});
        }

        .subtitle {
          width: calc(100vw - #{$pageMarginMin + $gridsize * 2});
        }
      }
    }
  }
}
</style>
