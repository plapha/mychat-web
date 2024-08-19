// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from "@/plugins/vuetify"; // 确保引入正确
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify, // 将 vuetify 实例传入
  render: h => h(App)
}).$mount('#app');