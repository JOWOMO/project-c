<template>
<div>
  <navbar />
  <nuxt class="screen-top" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import navbar from '@/components/navbar.vue';

@Component({
  components: {
  },
  middleware: "loaduser"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/screen';
</style>
