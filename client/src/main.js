import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import AuthService from "./AuthService";
import VModal from "vue-js-modal";

//Vue.config.productionTip = false
Vue.use(VModal);

async function init() {
  let user = await AuthService.Authenticate();
  if (user) {
    store.commit("setUser", user);
  } else {
    router.push({ name: "login" });
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
init();
