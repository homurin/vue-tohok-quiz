<script setup lang="ts">
import { useRoute } from "vue-router";
import quizData from "../../dev-data/quiz.json";

const route = useRoute();
const quiz = quizData.filter((e) => e.id == route.params.id)[0];
</script>
<template>
  <section id="quiz-container">
    <figure id="hero-img">
      <img class="hero-img__img" :src="quiz.img" :alt="quiz.race" />
      <figcaption>
        <h2>
          {{ quiz.race }}
        </h2>
      </figcaption>
    </figure>
    <div v-for="(question, id) in quiz.questions" :key="question.id">
      <h3>{{ id + 1 }}. {{ question.text }}</h3>
      <p v-for="answer in question.answer" :key="answer.id">
        {{ answer.label + ". " + answer.text }}.
      </p>
    </div>
  </section>
</template>
<style>
.hero-img__img {
  width: 100%;
  height: 40dvh;
  object-fit: cover;
}
</style>
