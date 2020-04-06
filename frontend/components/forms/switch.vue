<template>
  <label class="switch">
    <input
      type="checkbox"
      :id="id"
      :name="id"
      :checked="value"
      :disabled="disabled"
      @input="update"
    />
    <span :class="['slider', round ? 'round': '']"></span>
  </label>
</template>

<script lang="ts">
import Component from "nuxt-class-component";
import { Vue, Prop, Emit } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  round!: string;

  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: Boolean, required: false })
  disabled!: boolean;

  @Prop({ required: true })
  value!: string;

  @Emit("input")
  update(event: any) {
    return event.target.checked;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $border;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $primary;
}

input:focus + .slider {
  box-shadow: 0 0 1px $primary;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
