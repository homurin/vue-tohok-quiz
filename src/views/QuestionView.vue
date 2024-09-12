<script setup lang="ts">
import { useRoute } from "vue-router";
import quizzes from "../../dev-data/quizzes.json";

const route = useRoute();
const quiz = quizzes.find((e) => e.id == route.params.id);
</script>
<template>
  <section v-if="quiz">
    <div v-for="(question, id) in quiz?.questions" :key="question.id">
      <h3>{{ id + 1 }}. {{ question.text }}</h3>
      <p v-for="answer in question.answer" :key="answer.id">
        {{ answer.label + ". " + answer.text }}.
      </p>
    </div>
  </section>
  <section v-else>
    <h1>Question not found</h1>
  </section>
</template>
