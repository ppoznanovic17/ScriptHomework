import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "@/views/Home";
import Login from "@/views/Login";
import ViewTheme from "@/views/ViewTheme";
import User from "@/views/User";
import EditComment from "@/views/EditComment";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },{
    path: '/log',
    name: 'login',
    component: Login
  },
  {
    path: '/theme/:id',
    name: 'view_theme',
    component: ViewTheme
  },
  {
    path: '/user/:id',
    name: 'view_user',
    component: User
  },
  {
    path: '/comment/:id',
    name: 'edit_comment',
    component: EditComment
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
