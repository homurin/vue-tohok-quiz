<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Quiz } from "@/types/quiz";

defineProps<{
  questions: Array<Quiz>;
}>();
</script>

<template>
  <div class="quiz-container__card" v-for="question in questions" :key="question.id">
    <RouterLink class="router-link" :to="`/quiz/${question.id}`">
      <img :src="question.img" :alt="question.race" />
      <div class="card__card-body">
        <h2>{{ question.race }}</h2>
        <p>{{ question.questions.length }} Questions</p>
      </div>
    </RouterLink>
  </div>
</template>
<style scoped>
.quiz-container__card {
  width: 18em;
  border-radius: 5%;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.router-link {
  text-decoration: none;
  color: black;
}

.card__card-body {
  padding: 1em;
}

.card__card-body h2 {
  font-weight: bold;
  margin-top: 0.5em;
}

.card__card-body p {
  margin-top: 1em;
  margin-bottom: 0.1em;
}

.quiz-container__card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin: 0;
}
</style>
