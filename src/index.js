import BasicDropdown from "./BasicDropdown.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("BasicDropdown", BasicDropdown);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

BasicDropdown.install = install;

export default BasicDropdown