<script setup lang="ts">
import { ref, watch } from "vue";
import QuizCard from "@/components/QuizCard.vue";
import questionsData from "../../dev-data/quiz.json";
import type { Quiz } from "@/types/quiz";

const questions = ref<Array<Quiz>>(questionsData);
const search = ref<string>("");

watch(search, () => {
  questions.value = questionsData.filter((e) => {
    return e.race.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>
<template>
  <section class="quiz">
    <header>
      <h1 id="title">Touhou Quiz</h1>
      <input type="text" id="search-input" v-model="search" />
    </header>
    <section id="quiz-container">
      <QuizCard :questions="questions" />
    </section>
  </section>
</template>
<style scoped>
header {
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

#title {
  font-weight: bold;
  margin-right: 1.2rem;
}

#search-input {
  border: none;
  background-color: #dfdfdf8c;
  padding: 10px;
  border-radius: 5%;
}
#quiz-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1em;
}
</style>
