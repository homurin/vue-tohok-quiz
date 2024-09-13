import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomeView.vue";
import AboutPage from "@/views/AboutView.vue";
import QuizzesView from "@/views/QuizzesView.vue";
import QuestionsView from "@/views/QuestionsView.vue";
import NotFoundView from "@/views/errors/NotFoundView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "/home",
    redirect: "/"
  },
  { path: "/about", name: "about", component: AboutPage },
  {
    path: "/quiz/:id",
    name: "quiz",
    component: QuizzesView,
    children: [
      {
        path: "question",
        name: "question",
        component: QuestionsView
      }
    ]
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
