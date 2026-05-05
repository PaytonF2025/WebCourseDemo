<template>
  <div class="page-container">
    <header class="page-header">
      <h1>🧠 知识测验</h1>
      <p>是时候检验一下你的学习成果了！</p>
    </header>

    <div class="quiz-area">
      <div v-for="(q, i) in questions" :key="i" class="question-card">
        <p class="question-text">
          <strong>问题 {{ i + 1 }}:</strong> {{ q.question }}
        </p>
        <div class="options-group">
          <label
            v-for="(opt, j) in q.options"
            :key="j"
            class="option-label"
            :class="{
              selected: answers[i] === opt,
              correct: showResult && q.answer === opt,
              incorrect: showResult && answers[i] === opt && q.answer !== opt,
            }"
          >
            <input
              type="radio"
              :name="'q' + i"
              :value="opt"
              v-model="answers[i]"
              :disabled="showResult"
            />
            <span>{{ opt }}</span>
          </label>
        </div>
      </div>

      <div class="quiz-footer">
        <button @click="checkAnswers" v-if="!showResult">提交答案</button>
        <button @click="resetQuiz" v-if="showResult">再试一次</button>

        <div v-if="showResult" class="score-display">
          <h3>
            你的得分：<span class="score">{{ score }}</span> / {{ questions.length }}
          </h3>
          <p>{{ scoreMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questions from '../data/quiz.json'

export default {
  data() {
    return {
      questions,
      answers: [],
      score: null,
      showResult: false,
      scoreMessage: '',
    }
  },
  methods: {
    checkAnswers() {
      this.score = this.questions.filter((q, i) => q.answer === this.answers[i]).length
      this.showResult = true
      if (this.score === this.questions.length) this.scoreMessage = '太棒了，全部正确！'
      else if (this.score >= this.questions.length / 2) this.scoreMessage = '不错，继续努力！'
      else this.scoreMessage = '别灰心，基础还需巩固哦。'
    },
    resetQuiz() {
      this.answers = []
      this.score = null
      this.showResult = false
    },
  },
}
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: auto;
}
.page-header h1 {
  font-size: 2rem;
}
.page-header p {
  color: var(--text-color-light);
}

.quiz-area {
  margin-top: 30px;
}

.question-card {
  background: var(--card-bg);
  margin-bottom: 20px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}
.question-text {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.option-label {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.option-label:hover {
  background-color: #f8f9fa;
}
.option-label input {
  display: none;
}
.option-label.selected {
  border-color: var(--primary-color);
  background-color: #e8f5e9;
}
.option-label.correct {
  border-color: #27ae60;
  background-color: #e9f7ef;
  color: #27ae60;
  font-weight: bold;
}
.option-label.incorrect {
  border-color: #e74c3c;
  background-color: #fdeded;
  color: #e74c3c;
  font-weight: bold;
}

.quiz-footer {
  text-align: center;
  margin-top: 30px;
}
.quiz-footer button {
  padding: 12px 30px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}
.quiz-footer button:hover {
  background-color: #36a476;
}

.score-display {
  margin-top: 20px;
}
.score-display .score {
  color: var(--primary-color);
  font-size: 1.5em;
}
</style>
