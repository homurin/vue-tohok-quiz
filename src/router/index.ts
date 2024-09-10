import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomeView.vue";
import AboutPage from "@/views/AboutView.vue";
import QuestionView from "@/views/QuestionView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomePage
  },
  { path: "/about", component: AboutPage },
  { path: "/quiz/:id", component: QuestionView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
