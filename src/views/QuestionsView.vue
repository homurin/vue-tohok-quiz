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
const result = ref<number>(0);
const showResult = ref<boolean>(false);

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
}

function finishButton(): void {
  if (quiz) {
    const getCorrectAnswerId = quiz.questions.flatMap((question) => {
      return question.answer
        .filter((answer) => answer.correct)
        .map((answer) => {
          return answer.id;
        });
    });

    const correctAnswerId = selectedAnswers.value
      .filter((e) => getCorrectAnswerId.includes(e.answerId))
      .flatMap((e) => e.answerId);

    result.value = Math.floor((correctAnswerId.length / quiz.questions.length) * 100);
    showResult.value = true;
  }
}
</script>
<template>
  <QuestionHeader :curr-question="currQuestion" :bar-percentage />
  <section v-if="quiz?.questions && !showResult">
    <QuestionContent
      :questions="quiz.questions[currQuestionIdx]"
      :selected-answers="
        selectedAnswers[currQuestionIdx] ? selectedAnswers[currQuestionIdx].answerId : ''
      "
      @get-selected-answer="getSelectedAnswer"
    />
    <div id="nav-btn-container">
      <button @click="prevQuestion" :disabled="currQuestionIdx <= 0">Prev</button>
      <button
        v-if="currQuestionIdx + 1 === quiz.questions.length"
        @click="finishButton"
        :disabled="selectedAnswers.length < quiz.questions.length"
      >
        Finish
      </button>
      <button v-if="currQuestionIdx + 1 < quiz.questions.length" @click="nextQuestion">Next</button>
    </div>
  </section>
  <section class="result-container" v-else-if="showResult">
    <img
      class="fumo-score-img"
      :src="
        result >= 80
          ? 'https://external-preview.redd.it/6KgYL5G7moUXrS8hbk-tV5V0sRT_qlpq_C5ZhpQvig0.png?auto=webp&s=62831eede0058c77a247b15e71fd868d0eb49205'
          : 'https://res.cloudinary.com/teepublic/image/private/s--maAdmUWp--/c_crop,x_10,y_10/c_fit,w_1109/c_crop,g_north_west,h_1260,w_1260,x_-76,y_-96/co_rgb:ede8ff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-76,y_-96/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1700572750/production/designs/53470816_0.jpg'
      "
      alt="fumo"
    />
    <strong class="score">Your Score: {{ result }}</strong>
  </section>
  <section v-else>Question not found</section>
</template>
<style scoped>
.result-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.fumo-score-img {
  width: 50%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.score {
  font-size: 1.5em;
}
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
