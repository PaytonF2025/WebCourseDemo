<template>
  <div class="eigen-demo-container">
    <div class="controls">
      <h4>定义 2x2 变换矩阵</h4>
      <div class="matrix-grid">
        <div class="matrix-cell">
          <label>a: {{ matrix.a.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.a" />
        </div>
        <div class="matrix-cell">
          <label>b: {{ matrix.b.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.b" />
        </div>
        <div class="matrix-cell">
          <label>c: {{ matrix.c.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.c" />
        </div>
        <div class="matrix-cell">
          <label>d: {{ matrix.d.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.d" />
        </div>
      </div>
      <button @click="resetMatrix">重置矩阵</button>

      <div class="results-info" v-if="eigenData.real" ref="resultsRef">
        <div class="eigen-pair">
          <span>
            特征值 \(\lambda_1\): <strong>{{ eigenData.lambda1.toFixed(2) }}</strong>
          </span>
          <span>
            特征向量 \(v_1\): [{{ eigenData.v1.x.toFixed(2) }}, {{ eigenData.v1.y.toFixed(2) }}]
          </span>
        </div>
        <div class="eigen-pair">
          <span>
            特征值 \(\lambda_2\): <strong>{{ eigenData.lambda2.toFixed(2) }}</strong>
          </span>
          <span>
            特征向量 \(v_2\): [{{ eigenData.v2.x.toFixed(2) }}, {{ eigenData.v2.y.toFixed(2) }}]
          </span>
        </div>
      </div>
      <div class="results-info no-real" v-else>
        <p>该矩阵没有实数特征值/特征向量。它在进行旋转。</p>
      </div>
    </div>
    <div class="canvas-wrapper">
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script setup>
// 更改：导入 nextTick
import { ref, onMounted, watch, computed, nextTick } from 'vue'

const canvas = ref(null)
const matrix = ref({ a: 1, b: 0, c: 0, d: 1 })
let ctx = null
const resultsRef = ref(null) // 更改：为结果区域创建 ref

const scale = 50
const origin = { x: 200, y: 200 }
const colorV1 = '#27ae60'
const colorV2 = '#f39c12'

// 坐标转换
const toCanvasX = (x) => origin.x + x * scale
const toCanvasY = (y) => origin.y - y * scale

const resetMatrix = () => {
  matrix.value = { a: 1, b: 0, c: 0, d: 1 }
}

// 归一化向量
const normalize = (v) => {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y)
  if (mag === 0) return { x: 0, y: 0 }
  return { x: v.x / mag, y: v.y / mag }
}

// 核心计算逻辑 (不变)
const eigenData = computed(() => {
  const { a, b, c, d } = matrix.value
  const trace = a + d
  const det = a * d - b * c
  const discriminant = trace * trace - 4 * det

  if (discriminant < 0) {
    return { real: false }
  }

  const sqrtD = Math.sqrt(discriminant)
  const lambda1 = (trace + sqrtD) / 2
  const lambda2 = (trace - sqrtD) / 2

  let v1 = { x: b, y: lambda1 - a }
  if (b === 0 && lambda1 - a === 0) v1 = { x: lambda1 - d, y: c }
  v1 = normalize(v1)

  let v2 = { x: b, y: lambda2 - a }
  if (b === 0 && lambda2 - a === 0) v2 = { x: lambda2 - d, y: c }
  v2 = normalize(v2)

  const v1_transformed = {
    x: a * v1.x + b * v1.y,
    y: c * v1.x + d * v1.y,
  }
  const v2_transformed = {
    x: a * v2.x + b * v2.y,
    y: c * v2.x + d * v2.y,
  }

  return { real: true, lambda1, lambda2, v1, v2, v1_transformed, v2_transformed }
})

// 绘图函数 (不变)
const draw = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, 400, 400)

  drawTransformedGrid()
  drawGrid()
  drawAxes()

  if (eigenData.value.real) {
    const { v1, v2, v1_transformed, v2_transformed } = eigenData.value
    drawVector(v1.x, v1.y, colorV1, 3)
    drawVector(v2.x, v2.y, colorV2, 3)
    drawVector(v1_transformed.x, v1_transformed.y, colorV1, 5, true)
    drawVector(v2_transformed.x, v2_transformed.y, colorV2, 5, true)
  }
}
const drawGrid = () => {
  ctx.strokeStyle = '#f0f0f0'
  ctx.lineWidth = 1
  for (let i = -10; i <= 10; i++) {
    ctx.beginPath()
    ctx.moveTo(toCanvasX(i), 0)
    ctx.lineTo(toCanvasX(i), 400)
    ctx.moveTo(0, toCanvasY(i))
    ctx.lineTo(400, toCanvasY(i))
    ctx.stroke()
  }
}
const drawTransformedGrid = () => {
  const { a, b, c, d } = matrix.value
  ctx.strokeStyle = '#fcebec'
  ctx.lineWidth = 1
  for (let i = -10; i <= 10; i++) {
    ctx.beginPath()
    ctx.moveTo(toCanvasX(a * i - b * 10), toCanvasY(c * i - d * 10))
    ctx.lineTo(toCanvasX(a * i + b * 10), toCanvasY(c * i + d * 10))
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(toCanvasX(b * i - a * 10), toCanvasY(d * i - c * 10))
    ctx.lineTo(toCanvasX(b * i + a * 10), toCanvasY(d * i + c * 10))
    ctx.stroke()
  }
}
const drawAxes = () => {
  ctx.strokeStyle = '#888'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, origin.y)
  ctx.lineTo(400, origin.y)
  ctx.moveTo(origin.x, 0)
  ctx.lineTo(origin.x, 400)
  ctx.stroke()
}
const drawVector = (x, y, color, width, hasArrow = false) => {
  const startX = origin.x
  const startY = origin.y
  const endX = toCanvasX(x)
  const endY = toCanvasY(y)

  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.stroke()

  if (hasArrow) {
    const angle = Math.atan2(endY - startY, endX - startX)
    ctx.save()
    ctx.translate(endX, endY)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-10, 5)
    ctx.lineTo(-10, -5)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }
}

// 封装一个函数来调用 MathJax
const typesetMath = () => {
  // 检查 MathJax 是否已加载，并且我们的结果区域是否已渲染
  if (window.MathJax && resultsRef.value) {
    // 告诉 MathJax 只重新渲染这个特定区域
    window.MathJax.typesetPromise([resultsRef.value]).catch((err) =>
      console.log('MathJax typeset error:', err),
    )
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  draw()
  // 在组件挂载后，调用一次 MathJax
  nextTick(typesetMath)
})

watch(eigenData, async () => {
  // 当计算数据变化时，Vue 会更新 DOM
  // 我们等待 DOM 更新（nextTick）
  await nextTick()
  // DOM 更新后，我们再次调用 MathJax 来渲染新公式
  typesetMath()
})

// 保持对 matrix 的侦听，用于重绘画布
watch(matrix, draw, { deep: true })
</script>

<style scoped>
.eigen-demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--border-color);
}
.controls {
  flex: 1;
  min-width: 300px;
}
.controls h4 {
  margin-bottom: 15px;
}
.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}
.matrix-cell label {
  display: block;
  font-size: 0.9em;
  margin-bottom: 5px;
}
input[type='range'] {
  width: 100%;
}
.canvas-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
canvas {
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 8px;
}
button {
  padding: 8px 15px;
  border: none;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}
button:hover {
  background-color: #555;
}
.results-info {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
}
.eigen-pair {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
}
.eigen-pair:first-child {
  border-bottom: 1px dashed var(--border-color);
}
.eigen-pair span {
  font-size: 0.95rem;
}
.eigen-pair strong {
  color: var(--secondary-color);
}
.no-real {
  padding: 15px;
  background: #fff3f3;
  border-color: #f5c6cb;
  color: #721c24;
}
</style>
