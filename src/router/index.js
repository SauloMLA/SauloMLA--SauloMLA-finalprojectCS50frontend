import Vue from "vue";
import VueRouter from "vue-router";
import Land from '../components/Land.vue';
import Notes from '../components/Notes.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Land',
    component: Land
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
