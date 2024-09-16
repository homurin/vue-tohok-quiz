<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter, RouterView } from "vue-router";
import quizzes from "../../dev-data/quizzes.json";

const isShowQuestion = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const quizId = route.params.id;

const quiz = quizzes.find((e) => e.id === quizId);
function showQuestion(): void {
  if (isShowQuestion.value) router.go(-1);
  router.push({ name: "question", params: { id: quizId } });
  isShowQuestion.value = !isShowQuestion.value;
}
</script>
<template>
  <section v-if="quiz" id="quiz-container">
    <figure id="hero-img">
      <img class="hero-img__img" :src="quiz.img" :alt="quiz.race" />
      <figcaption>
        <h2 class="quiz-title">
          {{ quiz.race }}
        </h2>
      </figcaption>
    </figure>
    <button class="toggle-button" @click="showQuestion">
      {{ isShowQuestion ? "Hide Questions" : "Show Questions" }}
    </button>
    <RouterView />
  </section>
  <section v-else>
    <h1>Quiz Not Found</h1>
  </section>
</template>
<style>
.hero-img__img {
  width: 100%;
  height: 40dvh;
  object-fit: cover;
}
.quiz-title {
  margin: 1em 0;
}
.toggle-button {
  padding: 0.5em;
  border: 2px solid green;
  background-color: transparent;
  color: green;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  cursor: pointer;
}
</style>
