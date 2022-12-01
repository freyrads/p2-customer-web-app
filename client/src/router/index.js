import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Favorites from "../views/Favorites.vue";
import Food from "../views/Food.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites,
    },
    {
      path: "/food/:id",
      name: "food",
      component: Food,
    }
  ]
});

export default router
