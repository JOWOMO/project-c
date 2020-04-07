import Vue from 'vue';

declare module "vue/types/vue" {
  type SwalIcon = 'warning' | 'error' | 'success' | 'info' | 'question'; 

  interface SwalFunc {
    (title: string, subtitle?: string, icon?: SwalIcon): void;
  }

  interface Vue {
    $swal: SwalFunc;
  }
}
