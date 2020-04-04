<template>
    <auth 
        v-bind:start_component="'register'" 
        v-bind:target_route="'/register/company'"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'nuxt-class-component';
import { Inject } from 'nuxt-property-decorator'

import auth from "@/components/auth/index.vue";

@Component({
  components: {
    auth
  },
  inject: ['setState'],
})
export default class extends Vue {
    @Inject('setState') setState!: (num: number) => void;

    created() {
        this.setState(0);
    }
}
</script>

<style scoped lang="scss">
</style>
