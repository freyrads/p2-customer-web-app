import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import World from "../views/World.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/world",
      name: "world",
      component: World,
    }
  ]
})

export default router
