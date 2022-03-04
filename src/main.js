import Vue from "vue";
import App from "./App.vue";
import { store } from "./store/store";
import "./tailwind.css";
import "./assets/tailwind.css";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import router from './router'

Vue.config.productionTip = false;
Vue.use(store);
Vue.use(Antd);

new Vue({
    render: (h) => h(App),
    router,
    store: store
}).$mount("#app");
