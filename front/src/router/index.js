import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "@/views/Home";
import Login from "@/views/Login";
import ViewTheme from "@/views/ViewTheme";
import User from "@/views/User";
import EditComment from "@/views/EditComment";
import NewTheme from "@/views/NewTheme";
import Register from "@/views/Register";

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
  },
  {
    path: '/new/theme',
    name: 'new_theme',
    component: NewTheme
  },
  {
    path: '/reg',
    name: 'reg',
    component: Register
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
