import Vue from 'vue';
import VueMq from 'vue-mq';

//@ts-ignore
// scales.scss
Vue.use(VueMq, {
  breakpoints: { // breakpoints
    sm: 768,
    md: 1024,
    lg: 1280,
    vl: Infinity,
  },

  defaultBreakpoint: 'md'
});

declare module "vue/types/vue" {
  interface Vue {
    $mq: 'sm' | 'md' | 'lg' | 'vl';
  }
}
