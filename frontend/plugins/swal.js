import Vue from 'vue';
import swal from 'sweetalert2';


function argsToMap(title, subtitle, icon) {
  return {
    title,
    html: subtitle,
    icon,
    customClass: {
      title:'swal-title',
      content: 'swal-subtitle',
      
      buttonsStyling: false,

      focusConfirm: false,
      focusCancel: false,

      closeButton: 'swal-button rimary',
      confirmButton: 'swal-button primary',
      cancelButton: 'swal-button secondary',
    }
  };
}

function plugin (Vue) {
  Vue.$swal = (...args) => swal.fire(argsToMap(...args));
  Vue.prototype.$swal = (...args) => swal.fire(argsToMap(...args));
}

Vue.use(plugin);
