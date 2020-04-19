import Vue from 'vue';
import VueMq from 'vue-mq';

//@ts-ignore
Vue.use(VueMq, {
  breakpoints: { // breakpoints
    sm: 600,
    md: 850,
    lg: 1150,
    vl: Infinity,
  },

  defaultBreakpoint: 'md'
});

declare module "vue/types/vue" {
  interface Vue {
    $mq: 'sm' | 'md' | 'lg' | 'vl';
  }
}
