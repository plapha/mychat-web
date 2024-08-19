// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import ChatInput from './components/ChatInput.vue';
import DataBaseConfig from "./components/DataBaseConfig.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ChatInput',
            component: ChatInput
        },
        {
            path: '/database-config',
            name: 'DatabaseConfig',
            component: DataBaseConfig
        }
    ]
});