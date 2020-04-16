import { Plugin } from '@nuxt/types'
import Swal, { SweetAlertResult, SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

const DEFAULT_OPTIONS: SweetAlertOptions = {
  cancelButtonText: 'Abbrechen',
  confirmButtonText: 'OK',

  focusCancel: true,
  focusConfirm: false,

  allowEnterKey: false,
  allowEscapeKey: true,
  allowOutsideClick: false,

  customClass: {
    title:'swal-title',
    content: 'swal-subtitle',
  
    closeButton: 'swal-button primary',
    confirmButton: 'swal-button primary',
    cancelButton: 'swal-button secondary',
  }
};

function alert(title: string, subtitle?: string, icon?: SweetAlertIcon): Promise<SweetAlertResult> {
  return Swal.fire({
    ...DEFAULT_OPTIONS,
    title,
    icon,
    html: subtitle,
  });
}

function confirm(title: string, subtitle?: string, destructive?: boolean): Promise<SweetAlertResult> {
  return Swal.fire({
    ...DEFAULT_OPTIONS,

    customClass: {
      ...DEFAULT_OPTIONS.customClass,
      confirmButton: destructive ? 'swal-button cta' : 'swal-button primary',
    },

    icon: 'question',
    title,
    html: subtitle,
    showCancelButton: true,
    confirmButtonText: 'Bestätigen',
  });
}

interface ISwal {
  alert: typeof alert;
  confirm: typeof confirm;
}

declare module "vue/types/vue" {
  interface Vue {
    $swal: ISwal;
  }
}

const plugin: Plugin  = (_, inject) => {
  inject('swal', {
    alert,
    confirm,
  });
}

export default plugin;
