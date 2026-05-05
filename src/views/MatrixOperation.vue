<template>
  <div class="page-container">
    <header class="page-header">
      <h1>🧮 矩阵运算</h1>
      <p>输入矩阵并进行计算，或在下方探索矩阵的几何意义。</p>
    </header>

    <div class="matrix-playground">
      <h2>矩阵计算器</h2>
      <div class="input-area">
        <div class="matrix-input">
          <label>矩阵 A</label>
          <textarea v-model="A" placeholder="示例：&#10;1, 2&#10;3, 4"></textarea>
        </div>
        <div class="matrix-input">
          <label>矩阵 B</label>
          <textarea v-model="B" placeholder="示例：&#10;5, 6&#10;7, 8"></textarea>
        </div>
      </div>

      <div class="button-group">
        <button @click="addMatrix" :disabled="!isValidInput">A + B</button>
        <button @click="multiplyMatrix" :disabled="!isValidInput">A × B</button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="result.length" class="result-area">
        <h3>计算结果：</h3>
        <div class="matrix-display">
          <div v-for="(row, i) in result" :key="i" class="matrix-row">
            <span v-for="(val, j) in row" :key="j" class="matrix-val">{{ val }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="transform-demo">
      <h2 class="demo-title">几何变换演示</h2>
      <p class="demo-intro">
        矩阵不仅是数字的组合，它更是一种对空间的变换。 通过下面的滑块，改变一个 2x2
        矩阵的值，观察它如何实时扭曲、旋转和缩放整个2D平面。
      </p>
      <MatrixTransform />
    </div>
  </div>
</template>

<script>
import MatrixTransform from '@/components/MatrixTransform.vue'

export default {
  components: {
    MatrixTransform,
  },
  data() {
    return { A: '', B: '', result: [], error: null, isValidInput: false }
  },
  watch: {
    A() {
      this.validateInput()
    },
    B() {
      this.validateInput()
    },
  },
  methods: {
    validateInput() {
      this.error = null
      this.result = []
      try {
        this.parseMatrix(this.A)
        this.parseMatrix(this.B)
        this.isValidInput = true
      } catch (e) {
        this.isValidInput = false
      }
    },
    parseMatrix(str) {
      if (!str.trim()) return []
      const rows = str
        .trim()
        .split('\n')
        .map((r) => r.split(',').map(Number))
      const rowLengths = rows.map((r) => r.length)
      if (rows.some((row) => row.some(isNaN))) throw new Error('矩阵包含非数字元素。')
      if (new Set(rowLengths).size > 1) throw new Error('矩阵的行长度不一致。')
      return rows
    },
    addMatrix() {
      try {
        let a = this.parseMatrix(this.A)
        let b = this.parseMatrix(this.B)
        if (a.length !== b.length || a[0].length !== b[0].length) {
          throw new Error('矩阵相加要求维度相同。')
        }
        this.result = a.map((row, i) => row.map((v, j) => v + b[i][j]))
      } catch (e) {
        this.error = e.message
      }
    },
    multiplyMatrix() {
      try {
        let a = this.parseMatrix(this.A)
        let b = this.parseMatrix(this.B)
        if (a[0].length !== b.length) {
          throw new Error('矩阵A的列数必须等于矩阵B的行数。')
        }
        let res = Array(a.length)
          .fill(0)
          .map(() => Array(b[0].length).fill(0))
        for (let i = 0; i < a.length; i++)
          for (let j = 0; j < b[0].length; j++)
            for (let k = 0; k < a[0].length; k++) res[i][j] += a[i][k] * b[k][j]
        this.result = res
      } catch (e) {
        this.error = e.message
      }
    },
  },
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-container {
  animation: fadeInUp 0.5s ease-out forwards;
}
.page-header h1 {
  font-size: 2rem;
}
.page-header p {
  color: var(--text-color-light);
}

.matrix-playground {
  margin-top: 30px;
  background: var(--card-bg);
  padding: 30px;
  border-radius: 12px;
  box-shadow: var(--shadow);
}
.matrix-playground h2 {
  text-align: center;
  margin-bottom: 20px;
}
.input-area {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}
.matrix-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
.matrix-input textarea {
  width: 250px;
  height: 120px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  resize: none;
}
.matrix-input textarea:focus {
  outline: 2px solid var(--primary-color);
  border-color: var(--primary-color);
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}
.button-group button {
  padding: 10px 25px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}
.button-group button:hover:not(:disabled) {
  background-color: #36a476;
}
.button-group button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error-message {
  color: #e74c3c;
  text-align: center;
  margin-bottom: 20px;
}
.result-area {
  text-align: center;
}
.matrix-display {
  display: inline-block;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-top: 10px;
}
.matrix-row {
  display: flex;
}
.matrix-val {
  min-width: 50px;
  padding: 10px;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}

.transform-demo {
  margin-top: 40px;
}
.demo-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 10px;
}
.demo-intro {
  font-size: 1rem;
  color: var(--text-color-light);
  margin-bottom: 20px;
  max-width: 800px;
}
</style>
