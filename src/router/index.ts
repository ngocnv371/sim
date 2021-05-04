import VueRouter, { RouteConfig } from "vue-router";

import Battle from "../views/Battle.vue";
import Home from "../views/Home.vue";
import Tavern from "../views/Tavern.vue";
import Vue from "vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/battle",
    name: "Battle",
    component: Battle,
  },
  {
    path: "/tavern",
    name: "Tavern",
    component: Tavern,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
