import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";
import "./tailwind.css";
import "./assets/tailwind.css";

Vue.config.productionTip = false;
Vue.use(store); 

new Vue({
    render: (h) => h(App),
    store: store,
}).$mount("#app");
