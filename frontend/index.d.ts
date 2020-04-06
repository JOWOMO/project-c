import Vue from 'vue';

declare module "*.vue" {
  import Vue from 'vue';
  import 'vue-router/types/vue';

  const _default: Vue;
  export default _default;
}

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     layout?: any;
//     middleware?: string | string[];
//   }
// }