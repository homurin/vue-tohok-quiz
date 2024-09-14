<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import quizzes from "../../dev-data/quizzes.json";
import QuestionHeader from "@/components/QuestionHeader.vue";
import QuestionContent from "@/components/QuestionContent.vue";

const route = useRoute();
const selectedAnswers = ref<Array<{ questionId: string; answerId: string }>>([]);
const quiz = quizzes.find((e) => e.id == route.params.id);
const currQuestionIdx = ref<number>(0);

const currQuestion = computed(
  () => `Finished Question ${selectedAnswers.value.length}/${quiz?.questions.length}`
);

const barPercentage = computed((): string => {
  if (quiz) {
    return `${(selectedAnswers.value.length / quiz?.questions.length) * 100}%`;
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

function getSelectedAnswer(answerId: string): void {
  if (quiz) {
    const questionId = quiz.questions[currQuestionIdx.value].id;
    const isExist = selectedAnswers.value.find((e) => e.questionId === questionId);
    if (!isExist) {
      selectedAnswers.value.push({ questionId, answerId });
    } else {
      const answeredQuestionIdx = selectedAnswers.value.findIndex(
        (e) => e.questionId === questionId
      );
      selectedAnswers.value[answeredQuestionIdx].answerId = answerId;
    }
    if (currQuestionIdx.value < quiz?.questions.length - 1) {
      currQuestionIdx.value++;
    }
  }
  console.log(selectedAnswers.value);
}

function finishButton() {
  if (quiz) {
    return quiz.questions
      .flatMap((question) => {
        return question.answer.filter((e) => e.correct);
      })
      .map((e) => {
        return e.id;
      });
  }
}
</script>
<template>
  <QuestionHeader :curr-question="currQuestion" :bar-percentage />
  <section v-if="quiz?.questions">
    <QuestionContent
      :questions="quiz.questions[currQuestionIdx]"
      @selected-answer="getSelectedAnswer"
    />
    <div id="nav-btn-container">
      <button @click="prevQuestion" :disabled="currQuestionIdx <= 0">Prev</button>
      <button
        v-if="currQuestionIdx + 1 === quiz.questions.length"
        @click="
          () => {
            console.info(`done`);
          }
        "
        :disabled="selectedAnswers.length < quiz.questions.length"
      >
        Finish
      </button>
      <button v-if="currQuestionIdx + 1 < quiz.questions.length" @click="nextQuestion">Next</button>
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
