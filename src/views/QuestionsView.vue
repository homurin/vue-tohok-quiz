<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import quizzes from "../../dev-data/quizzes.json";
import QuestionHeader from "@/components/QuestionHeader.vue";
import QuestionContent from "@/components/QuestionContent.vue";

const route = useRoute();
const currQuestionIdx = ref<number>(0);
const quiz = quizzes.find((e) => e.id == route.params.id);

const currQuestion = computed(
  () => `Question ${currQuestionIdx.value + 1}/${quiz?.questions.length}`
);

const barPercentage = computed((): string => {
  if (quiz) {
    return `${((currQuestionIdx.value + 1) / quiz?.questions.length) * 100}%`;
  }
  return "0%";
});

function nextQuestion() {
  if (quiz) {
    if (currQuestionIdx.value + 1 < quiz.questions.length) {
      currQuestionIdx.value += 1;
    }
  }
}
function prevQuestion() {
  if (quiz) {
    if (currQuestionIdx.value > 0) {
      currQuestionIdx.value -= 1;
    }
  }
}
</script>
<template>
  <QuestionHeader :curr-question="currQuestion" :bar-percentage />
  <section v-if="quiz?.questions">
    <QuestionContent :questions="quiz.questions[currQuestionIdx]" />
    <div id="nav-btn-container">
      <button @click="prevQuestion" :disabled="currQuestionIdx <= 0">Prev</button>
      <button @click="nextQuestion" :disabled="currQuestionIdx + 1 >= quiz.questions.length">
        Next
      </button>
    </div>
  </section>
  <div v-else>Question not found</div>
</template>
<style scoped>
section {
  margin-bottom: 5em;
}
#nav-btn-container {
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
}

#nav-btn-container button {
  cursor: pointer;
  border: 0.1em solid green;
  font-size: 1.1em;
  padding: 0.5em;
  color: green;
  width: 5em;
  font-family: Arial, Helvetica, sans-serif;
}

#nav-btn-container button:disabled {
  color: gray;
  border: 0.1em solid gray;
  cursor: default;
}
</style>
