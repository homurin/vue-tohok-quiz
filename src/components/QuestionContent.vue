<script setup lang="ts">
import type { Question } from "@/types/quiz";
defineProps<{ questions: Question }>();
const emit = defineEmits<{ selectedAnswer: [answerId: string] }>();

function emitSelectedAnswer(answerId: string) {
  emit("selectedAnswer", answerId);
}
</script>
<template>
  <section id="questions-container">
    <h3 class="question-title">{{ questions.text }}</h3>
  </section>
  <section id="answers-container">
    <div
      class="answers-container__answer"
      v-for="answer in questions.answer"
      :key="answer.id"
      @click="emitSelectedAnswer(answer.id)"
    >
      <p class="answer-label">{{ answer.label }}</p>
      <div class="answer-value">{{ answer.text }}</div>
    </div>
  </section>
</template>
<style>
.question-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1.7rem;
}

.answers-container__answer {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  cursor: pointer;
}

.answer-label,
.answer-value {
  height: 1.5em;
  font-size: 1em;
  font-weight: bold;
  align-items: center;
  padding: 1.2em;
  display: flex;
}

.answer-label {
  justify-content: center;
  width: 1.5em;
  background-color: rgb(167, 167, 167);
}

.answer-value {
  width: 100%;
  background-color: #e5e5e5;
  padding-left: 0.3em;
}
</style>
