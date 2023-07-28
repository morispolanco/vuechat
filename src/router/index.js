// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import ChatPage from '../views/ChatPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/chat',
    name: 'ChatPage',
    component: ChatPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
