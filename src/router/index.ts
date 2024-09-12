import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomeView.vue";
import AboutPage from "@/views/AboutView.vue";
import QuizView from "@/views/QuizView.vue";
import QuestionView from "@/views/QuestionView.vue";
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
    component: QuizView,
    children: [
      {
        path: "question",
        name: "question",
        component: QuestionView
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
